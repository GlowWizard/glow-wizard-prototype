import ImageUpload from '../components/ImageUpload';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-teal-700 mb-2">Glow Wizard</h1>
          <p className="text-gray-600">AI-powered skin analysis & personalized recommendations</p>
        </div>
        
        <ImageUpload />
        
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Glow Wizard. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
