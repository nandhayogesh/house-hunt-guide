import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Property, SearchFilters } from '@/types/property';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Generic API request function
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Property API functions
export async function fetchProperties(filters?: Partial<SearchFilters>): Promise<Property[]> {
  const queryParams = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });
  }

  const endpoint = `/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return apiRequest<Property[]>(endpoint);
}

export async function fetchProperty(id: string): Promise<Property> {
  return apiRequest<Property>(`/properties/${id}`);
}

export async function fetchFeaturedProperties(): Promise<Property[]> {
  return apiRequest<Property[]>('/properties/featured');
}

// React Query hooks
export function useProperties(filters?: Partial<SearchFilters>) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProperties() {
  return useQuery({
    queryKey: ['properties', 'featured'],
    queryFn: fetchFeaturedProperties,
    staleTime: 10 * 60 * 1000, // Featured properties change less frequently
  });
}

// Mutation hooks for authenticated operations
export function useCreateProperty() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) =>
      apiRequest<Property>('/properties', {
        method: 'POST',
        body: JSON.stringify(propertyData),
      }),
    onSuccess: () => {
      // Invalidate and refetch properties
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...propertyData }: Partial<Property> & { id: string }) =>
      apiRequest<Property>(`/properties/${id}`, {
        method: 'PUT',
        body: JSON.stringify(propertyData),
      }),
    onSuccess: (data) => {
      // Update the specific property in cache
      queryClient.setQueryData(['property', data.id], data);
      // Invalidate properties list
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}