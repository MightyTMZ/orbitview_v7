import { ApiResponse, PaginatedResponse, Event, Competition, Program, LoginCredentials, RegisterCredentials, User } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.orbitview.com';

async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // In a real implementation, we would get the token from localStorage or a cookie
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}

// Auth functions
export async function login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
  return fetchWithAuth('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function register(credentials: RegisterCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
  return fetchWithAuth('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function logout(): Promise<ApiResponse<null>> {
  return fetchWithAuth('/auth/logout', {
    method: 'POST',
  });
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  return fetchWithAuth('/auth/me');
}

// Resource functions
export async function getEvents(page = 1, limit = 10, filters?: Record<string, any>): Promise<PaginatedResponse<Event>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters || {}),
  });
  
  return fetchWithAuth(`/events?${queryParams.toString()}`);
}

export async function getEvent(id: string): Promise<ApiResponse<Event>> {
  return fetchWithAuth(`/events/${id}`);
}

export async function getCompetitions(page = 1, limit = 10, filters?: Record<string, any>): Promise<PaginatedResponse<Competition>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters || {}),
  });
  
  return fetchWithAuth(`/competitions?${queryParams.toString()}`);
}

export async function getCompetition(id: string): Promise<ApiResponse<Competition>> {
  return fetchWithAuth(`/competitions/${id}`);
}

export async function getPrograms(page = 1, limit = 10, filters?: Record<string, any>): Promise<PaginatedResponse<Program>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters || {}),
  });
  
  return fetchWithAuth(`/programs?${queryParams.toString()}`);
}

export async function getProgram(id: string): Promise<ApiResponse<Program>> {
  return fetchWithAuth(`/programs/${id}`);
}