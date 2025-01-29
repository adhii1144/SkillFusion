import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { Coordinates } from '../types';

interface MapPickerProps {
  onLocationSelect: (location: { address: string; coordinates: Coordinates }) => void;
}

const MapPicker = ({ onLocationSelect }: MapPickerProps) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Provide a default coordinate for demonstration
    // In a real app, you might want to use a geocoding service
    onLocationSelect({
      address,
      coordinates: {
        lat: 0,
        lng: 0
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </form>
  );
};

export default MapPicker;