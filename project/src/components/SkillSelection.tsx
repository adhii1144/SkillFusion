import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SkillDTO } from '../types/skill';
import { skillService } from '../services/skillService';
import SkillTag from './SkillTag';
import Button from './Button';

interface SkillSectionProps {
  skills: SkillDTO[];
  onSkillsUpdate: (skills: SkillDTO[]) => void;
}

const SkillSection: React.FC<SkillSectionProps> = ({ skills, onSkillsUpdate }) => {
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      toast.error('Please enter a valid skill!');
      return;
    }

    try {
      const addedSkill = await skillService.addSkill(newSkill, skillLevel);
      onSkillsUpdate([...skills, addedSkill]);
      setNewSkill('');
      setSkillLevel('Beginner');
      toast.success('Skill added successfully!');
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (skillName: string) => {
    try {
      await skillService.deleteSkill(skillName);
      onSkillsUpdate(skills.filter(skill => skill.skill !== skillName));
      toast.success('Skill removed successfully!');
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-3/4"
            placeholder="Enter new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="border border-gray-300 p-2 rounded-md ml-2"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <Button onClick={handleAddSkill} className="!w-auto mt-4">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.skill}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <SkillTag
              name={skill.skill}
              level={skill.level}
              onDelete={() => handleDeleteSkill(skill.skill)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillSection;