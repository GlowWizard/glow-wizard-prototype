import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get image data from request
    const data = await request.json();
    const { image } = data;
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }
    
    // Call Replicate API
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`
      },
      body: JSON.stringify({
        // Using a basic face analysis model
        version: "b8c079f5c5a3fd18b11261eb349ababb1e9a2f62ce86a99e9acb98fa81664241",
        input: {
          image: image,
        }
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Replicate API error: ${error.detail || response.statusText}`);
    }
    
    const prediction = await response.json();
    
    // For now, return mock skin analysis data
    // In production, you would process the model output
    return NextResponse.json({
      id: prediction.id,
      status: prediction.status,
      results: {
        redness: 0.67,
        wrinkles: 0.42,
        pores: 0.85,
        darkSpots: 0.38,
        hydration: 0.61
      }
    });
    
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image. Please try again.' },
      { status: 500 }
    );
  }
}
