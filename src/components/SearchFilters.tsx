import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { SearchFilters as SearchFiltersType } from '@/types/property';
import { Search, Filter, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
}

export function SearchFilters({ filters, onFiltersChange, onSearch }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 5000000],
      propertyType: [],
      bedrooms: null,
      bathrooms: null,
      minSqft: null,
      maxSqft: null,
      location: '',
      status: ['For Sale', 'For Rent']
    });
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Enter location (city, address, zip code)"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={onSearch} className="bg-premium hover:bg-premium-dark">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select
                value={filters.propertyType[0] || ''}
                onValueChange={(value) => handleFilterChange('propertyType', value ? [value] : [])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any type</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Condo">Condo</SelectItem>
                  <SelectItem value="Townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={filters.status[0] || ''}
                onValueChange={(value) => handleFilterChange('status', value ? [value] : ['For Sale', 'For Rent'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any status</SelectItem>
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="For Rent">For Rent</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Select
                value={filters.bedrooms?.toString() || ''}
                onValueChange={(value) => handleFilterChange('bedrooms', value ? parseInt(value) : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Bathrooms</Label>
              <Select
                value={filters.bathrooms?.toString() || ''}
                onValueChange={(value) => handleFilterChange('bathrooms', value ? parseInt(value) : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Price</Label>
              <Input
                type="number"
                placeholder="Min price"
                value={filters.priceRange[0] || ''}
                onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Price</Label>
              <Input
                type="number"
                placeholder="Max price"
                value={filters.priceRange[1] || ''}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 5000000])}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}