import React from 'react';
import { Briefcase } from 'lucide-react';

const Opportunities = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <Briefcase className="w-16 h-16 text-indigo-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
        <p className="text-gray-600">
          Find opportunities to share your skills or learn from others.
          This feature is coming soon!
        </p>
      </div>
    </div>
  );
};

export default Opportunities;