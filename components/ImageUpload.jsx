'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset states
    setResults(null);
    setError('');
    
    // Read the file as data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle image analysis
  const analyzeImage = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setError('');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to analyze your skin. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label 
          htmlFor="image-upload" 
          className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50"
        >
          {imageUrl ? (
            <div className="relative w-full aspect-square mx-auto overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="text-gray-500">
              <p className="text-lg font-medium">Upload your skin photo</p>
              <p className="text-sm mt-1">Click or drag and drop</p>
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      
      {image && !results && (
        <button
          onClick={analyzeImage}
          disabled={isAnalyzing}
          className="w-full py-3 px-4 bg-teal-600 text-white rounded-md disabled:bg-gray-400 transition-colors"
        >
          {isAnalyzing ? 'Analyzing your skin...' : 'Analyze My Skin'}
        </button>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Your Skin Analysis Results</h3>
          
          {Object.entries(results).map(([key, value]) => {
            const percentage = Math.round(value * 100);
            const getColor = (pct) => {
              if (pct < 40) return 'bg-green-500';
              if (pct < 70) return 'bg-yellow-500';
              return 'bg-red-500';
            };
            
            return (
              <div key={key} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="capitalize">{key}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${getColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
          
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-md">
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Use a gentle cleanser twice daily</li>
              <li>Apply SPF 30+ sunscreen every morning</li>
              <li>Consider adding hyaluronic acid for hydration</li>
              <li>Use vitamin C serum to address dark spots</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
