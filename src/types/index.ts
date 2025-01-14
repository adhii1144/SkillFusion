export interface User {
  profilePhotoUrl: string;
  available: any;
  id: string;
  username: string;
  email: string;
  mobile: string;
  title: string;
  address: string;
  avatar: string;
  skills: string[];
  bio: string;
  connected: boolean;
  isOnline: boolean;
}

export interface SearchFilters {
  skill?: string;
  address?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}