import { toast } from '@/hooks/use-toast';

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export function handleApiError(error: unknown, context?: string): void {
  console.error(`API Error${context ? ` in ${context}` : ''}:`, error);

  let message = 'An unexpected error occurred';
  let title = 'Error';

  if (error instanceof Error) {
    message = error.message;
    
    // Handle specific error types
    if ('status' in error) {
      const apiError = error as ApiError;
      
      switch (apiError.status) {
        case 400:
          title = 'Invalid Request';
          break;
        case 401:
          title = 'Authentication Required';
          message = 'Please log in to continue';
          break;
        case 403:
          title = 'Access Denied';
          message = 'You don\'t have permission to perform this action';
          break;
        case 404:
          title = 'Not Found';
          message = 'The requested resource was not found';
          break;
        case 429:
          title = 'Too Many Requests';
          message = 'Please wait a moment before trying again';
          break;
        case 500:
          title = 'Server Error';
          message = 'Something went wrong on our end. Please try again later';
          break;
        default:
          title = 'Request Failed';
      }
    }
  }

  // Show toast notification
  toast({
    title,
    description: message,
    variant: 'destructive',
  });
}

export function createErrorBoundary(context: string) {
  return (error: unknown) => {
    handleApiError(error, context);
  };
}

// Network error detection
export function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError && error.message.includes('fetch');
}

// Retry logic for failed requests
export async function retryRequest<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (error instanceof Error && 'status' in error) {
        const status = (error as ApiError).status;
        if (status && status >= 400 && status < 500) {
          throw error;
        }
      }

      // Wait before retrying (exponential backoff)
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
}