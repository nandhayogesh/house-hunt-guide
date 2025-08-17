import { useState } from 'react';
import Map from '@/components/Map';
import { MapErrorBoundary } from '@/components/MapErrorBoundary';
import { PropertyCard } from '@/components/PropertyCard';
import { useProperties } from '@/services/api';
import { Property } from '@/types/property';
import { Card } from '@/components/ui/card';
import { PropertyListSkeleton } from '@/components/ui/loading-skeleton';
import { ErrorMessage } from '@/components/ui/error-message';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MapView() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { data: properties = [], isLoading, isError, error, refetch } = useProperties();

  if (isLoading) {
    return (
      <div className="h-screen flex">
        <div className="flex-1 bg-neutral-200 animate-pulse" />
        <div className="w-96 bg-background border-l p-4">
          <PropertyListSkeleton count={3} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ErrorMessage
          title="Failed to load map data"
          message={error?.message || "Unable to load property locations."}
          onRetry={() => refetch()}
        />
      </div>
    );
  }
  return (
    <div className="h-screen flex">
      {/* Map Section */}
      <div className="flex-1 relative">
        <MapErrorBoundary>
          <Map
            properties={properties}
            selectedProperty={selectedProperty}
            onPropertySelect={setSelectedProperty}
          />
        </MapErrorBoundary>
      </div>

      {/* Property Details Sidebar */}
      {selectedProperty && (
        <div className="w-96 bg-background border-l overflow-y-auto">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-luxury">Property Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedProperty(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4">
            <PropertyCard property={selectedProperty} variant="featured" />
          </div>
        </div>
      )}

      {/* Properties List Overlay */}
      {!selectedProperty && (
        <div className="w-96 bg-background border-l overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-luxury">All Properties</h2>
            <p className="text-sm text-neutral-600">{properties.length} properties available</p>
          </div>
          <div className="p-4 space-y-4">
            {properties.map((property) => (
              <Card 
                key={property.id} 
                className="p-4 cursor-pointer hover:shadow-card transition-shadow"
                onClick={() => setSelectedProperty(property)}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-luxury text-sm line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-1">
                      {property.location.address}, {property.location.city}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-premium">
                        {property.status === 'For Rent' 
                          ? `$${property.price.toLocaleString()}/mo`
                          : `$${property.price.toLocaleString()}`
                        }
                      </span>
                      <span className="text-xs text-neutral-600">
                        {property.features.bedrooms}bd • {property.features.bathrooms}ba
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}