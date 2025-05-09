export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
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

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  imageUrl?: string;
  tags: string[];
  organizerName: string;
  url?: string;
  categories?: Category[];
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prizes?: string[];
  eligibility?: string;
  imageUrl?: string;
  tags: string[];
  organizerName: string;
  url?: string;
  categories?: Category[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  startDate?: string;
  location?: string;
  format?: string;
  imageUrl?: string;
  tags: string[];
  organizerName: string;
  url?: string;
  categories?: Category[];
}