import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import SkillTag from '../components/SkillTag';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    title: '',
    bio: '',
    address: '',
    website: '',
    skills: [], // List of skills as an array of objects
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [skill, setSkill] = useState({ name: '', level: 'Beginner' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setIsLoading(false);
      return;
    }

    if (!formData.address) {
      setErrors({ address: 'Please enter your address' });
      setIsLoading(false);
      return;
    }

    try {
      // Send data to the backend
      const response = await fetch('http://localhost:8080/skill-fusion/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send formData, including skills as an array
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error('Failed to create account');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddSkill = () => {
    if (skill.name) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill], // Add new skill to the skills array
      }));
      setSkill({ name: '', level: 'Beginner' }); // Reset skill input
    }
  };

  const handleDeleteSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index), // Remove skill from the list by index
    }));
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join our community of skilled professionals"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Input
          label="Full name"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <Input
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <Input
          label="Mobile number"
          type="string"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
          required
        />

        <Input
          label="Professional title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="e.g., Full Stack Developer"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Tell us about yourself..."
          />
        </div>

        <Input
          label="Address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          required
        />

        <Input
          label="Website"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          error={errors.website}
        />

        <div>
          <h4 className="font-medium text-gray-700">Skills</h4>
          <div className="flex items-center gap-2 mt-2">
            <Input
              label="Skill"
              type="text"
              name="skillName"
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              placeholder="e.g., JavaScript"
            />
            <select
              value={skill.level}
              onChange={(e) => setSkill({ ...skill, level: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
            <Button type="button" onClick={handleAddSkill}>
              Add Skill
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            {formData.skills.map((skill, index) => (
              <SkillTag
                key={index}
                name={skill.name}
                level={skill.level}
                onDelete={() => handleDeleteSkill(index)}
              />
            ))}
          </div>
        </div>

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <Input
          label="Confirm password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <Button type="submit" isLoading={isLoading}>
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
