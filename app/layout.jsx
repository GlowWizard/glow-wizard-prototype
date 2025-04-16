import './globals.css';

export const metadata = {
  title: 'Glow Wizard - AI Skin Analysis',
  description: 'Get personalized skincare recommendations based on AI analysis of your skin.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
