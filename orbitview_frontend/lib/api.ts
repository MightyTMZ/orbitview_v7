import { ApiResponse, PaginatedResponse, Event, Competition, Program, LoginCredentials, RegisterCredentials, User, Category } from './types';
import { BACKEND } from './constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || `${BACKEND}/api`;

export async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('orbitview_access_token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `JWT ${token}` } : {}),
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

export async function getEvents(page = 1, pageSize = 10, categories?: number[]): Promise<PaginatedResponse<Event>> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  });

  if (categories && categories.length > 0) {
    categories.forEach(id => params.append('category', id.toString()));
  }

  return fetchWithAuth(`/resources/events/?${params.toString()}`);
}

export async function getPrograms(page = 1, pageSize = 10, categories?: number[]): Promise<PaginatedResponse<Program>> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  });

  if (categories && categories.length > 0) {
    categories.forEach(id => params.append('category', id.toString()));
  }

  return fetchWithAuth(`/resources/programs/?${params.toString()}`);
}

export async function getCompetitions(page = 1, pageSize = 10, categories?: number[]): Promise<PaginatedResponse<Competition>> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  });

  if (categories && categories.length > 0) {
    categories.forEach(id => params.append('category', id.toString()));
  }

  return fetchWithAuth(`/resources/competitions/?${params.toString()}`);
}

export async function getCategories(): Promise<Category[]> {
  return fetchWithAuth('/resources/categories/');
}