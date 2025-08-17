import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from '@/services/auth';
import { PropertyCardSkeleton } from '@/components/ui/loading-skeleton';
import { ErrorMessage } from '@/components/ui/error-message';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'agent' | 'user';
}

export function ProtectedRoute({ children, requiredRole = 'user' }: ProtectedRouteProps) {
  const location = useLocation();
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <PropertyCardSkeleton />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Check role permissions
  const hasPermission = user.role === 'admin' || user.role === requiredRole;
  
  if (!hasPermission) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <ErrorMessage
          title="Access Denied"
          message="You don't have permission to access this page."
          showRetry={false}
        />
      </div>
    );
  }

  return <>{children}</>;
}