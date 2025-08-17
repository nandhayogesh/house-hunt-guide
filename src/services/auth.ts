import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'user';
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Auth API functions
async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
}

async function logout(): Promise<void> {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    }
  }

  // Clear local storage regardless of API call success
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}

async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    throw new Error('Failed to get user information');
  }

  return response.json();
}

// React Query hooks
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Store auth data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update query cache
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Auth utility functions
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('authToken');
}

export function hasRole(requiredRole: User['role']): boolean {
  const userStr = localStorage.getItem('user');
  if (!userStr) return false;
  
  try {
    const user: User = JSON.parse(userStr);
    return user.role === requiredRole || user.role === 'admin';
  } catch {
    return false;
  }
}