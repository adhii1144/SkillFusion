import { SkillDTO } from '../types/skill';

const BASE_URL = 'http://localhost:8080/api';

export const skillService = {
  async getUserSkills(): Promise<SkillDTO[]> {
    const token = localStorage.getItem('jwt');
    const response = await fetch(`${BASE_URL}/skills`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch skills');
    return response.json();
  },

  async addSkill(skill: string, level: string): Promise<SkillDTO> {
    const token = localStorage.getItem('jwt');
    const response = await fetch(`${BASE_URL}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ skill, level })
    });
    if (!response.ok) throw new Error('Failed to add skill');
    return response.json();
  },

  async deleteSkill(skillName: string): Promise<void> {
    const token = localStorage.getItem('jwt');
    const response = await fetch(`${BASE_URL}/skills/${encodeURIComponent(skillName)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete skill');
  },

  async updateSkillLevel(skillName: string, newLevel: string): Promise<void> {
    const token = localStorage.getItem('jwt');
    const response = await fetch(`${BASE_URL}/skills/${encodeURIComponent(skillName)}/level`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newLevel)
    });
    if (!response.ok) throw new Error('Failed to update skill level');
  }
};