import { useState, useMemo } from 'react';
import { SearchFilters } from '@/components/SearchFilters';
import { PropertyCard } from '@/components/PropertyCard';
import { useProperties } from '@/services/api';
import { SearchFilters as SearchFiltersType } from '@/types/property';
import { Button } from '@/components/ui/button';
import { PropertyListSkeleton } from '@/components/ui/loading-skeleton';
import { ErrorMessage } from '@/components/ui/error-message';
import { LayoutGrid, List, Search } from 'lucide-react';

export default function Properties() {
  const [filters, setFilters] = useState<SearchFiltersType>({
    priceRange: [0, 5000000],
    propertyType: [],
    bedrooms: null,
    bathrooms: null,
    minSqft: null,
    maxSqft: null,
    location: '',
    status: ['For Sale', 'For Rent']
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Fetch properties using React Query
  const { data: properties = [], isLoading, isError, error, refetch } = useProperties(filters);

  // Client-side filtering (you may want to move this to the backend)
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Price filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Property type filter
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.features.propertyType)) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms && property.features.bedrooms < filters.bedrooms) {
        return false;
      }

      // Bathrooms filter
      if (filters.bathrooms && property.features.bathrooms < filters.bathrooms) {
        return false;
      }

      // Square footage filter
      if (filters.minSqft && property.features.sqft < filters.minSqft) {
        return false;
      }
      if (filters.maxSqft && property.features.sqft > filters.maxSqft) {
        return false;
      }

      // Location filter
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase();
        const locationMatch = 
          property.location.address.toLowerCase().includes(searchTerm) ||
          property.location.city.toLowerCase().includes(searchTerm) ||
          property.location.state.toLowerCase().includes(searchTerm) ||
          property.location.zipCode.includes(searchTerm);
        if (!locationMatch) return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(property.status)) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  const handleSearch = () => {
    // Refetch data with new filters
    refetch();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-luxury mb-4">Property Listings</h1>
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onSearch={handleSearch}
            />
          </div>
          <PropertyListSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-luxury mb-4">Property Listings</h1>
          </div>
          <ErrorMessage
            title="Failed to load properties"
            message={error?.message || "Unable to fetch property listings. Please try again."}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-luxury mb-4">Property Listings</h1>
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-neutral-600">
            <span className="font-semibold text-luxury">{filteredProperties.length}</span> properties found
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-premium hover:bg-premium-dark' : ''}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-premium hover:bg-premium-dark' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property}
              variant={property.featured ? 'featured' : 'default'}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral-600 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
              <h3 className="text-lg font-medium text-luxury mb-2">No properties found</h3>
              <p>Try adjusting your search filters to find more properties.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}