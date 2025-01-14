import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:8080/api';

interface LoginResponse {
  token: string;
  user: any;
}

interface TokenPayload {
  sub: string;
  exp: number;
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {
    this.token = localStorage.getItem('token');
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    this.setToken(data.token);
    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    if (!this.token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(this.token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getAuthHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }
}

export const authService = AuthService.getInstance();