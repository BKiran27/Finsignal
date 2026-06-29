import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface-1 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand mb-4">404</h1>
        <p className="text-xl text-t1 mb-8">Page not found</p>
        <Link to="/" className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}