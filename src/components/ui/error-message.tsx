import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorMessage({ 
  title = "Something went wrong", 
  message, 
  onRetry, 
  showRetry = true 
}: ErrorMessageProps) {
  return (
    <Card className="p-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground max-w-md">{message}</p>
        </div>
        {showRetry && onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}