import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorMessage } from '@/components/ui/error-message';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class MapErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Map component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-neutral-100">
          <ErrorMessage
            title="Map Loading Error"
            message="Unable to load the map. Please check your internet connection and try again."
            onRetry={() => this.setState({ hasError: false, error: undefined })}
          />
        </div>
      );
    }

    return this.props.children;
  }
}