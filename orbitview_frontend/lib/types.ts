export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface Category {
  id: number;
  title: string;
}

export interface Host {
  id: number;
  name: string;
  slogan: string | null;
  bio: string;
  cover_image: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  host: Host;
  url: string;
  location: string;
  start_time: string;
  end_time: string;
  category: Category[];
  cover_image: string | null;
}

export interface Program {
  id: number;
  title: string;
  description: string;
  host: Host;
  url: string;
  duration_description: string;
  cover_image: string | null;
  category: Category[];
}

export interface Competition {
  id: number;
  title: string;
  description: string;
  host: Host;
  url: string;
  tags: Tag[];
  difficulty_level: string;
  category: Category[];
  start_date: string;
  end_date: string;
  created_at: string;
  cover_image: string | null;
}