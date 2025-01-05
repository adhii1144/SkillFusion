import React from 'react';
import { X } from 'lucide-react';

interface SkillTagProps {
  name: string;
  level: string;
  onDelete: () => void;
}

const SkillTag = ({ name, level, onDelete }: SkillTagProps) => {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'beginner':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors">
      <div>
        <h3 className="font-medium text-gray-900">{name}</h3>
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getLevelColor(level)}`}>
          {level}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Remove skill"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
};

export default SkillTag;