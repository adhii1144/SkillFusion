export interface User {
    id: string;
    name: string;
    bio: string;
    location: string;
    profilePhotoUrl: string;
    connected: boolean;
  }
  
  export interface SearchFilters {
    bio?: string;
    location?: string;
  }
  