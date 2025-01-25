import React from 'react';
import { Settings, Construction } from 'lucide-react';

function Config() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="h-8 w-8 text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-800">Configuration</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Construction className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Coming Soon</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            We're working hard to bring you advanced configuration options. This feature will be available in the next update.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Config;