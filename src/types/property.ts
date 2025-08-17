export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    yearBuilt: number;
    propertyType: 'House' | 'Apartment' | 'Condo' | 'Townhouse';
    parking: number;
  };
  images: string[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  virtualTour?: string;
  featured: boolean;
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
  listingDate: string;
}

export interface SearchFilters {
  priceRange: [number, number];
  propertyType: string[];
  bedrooms: number | null;
  bathrooms: number | null;
  minSqft: number | null;
  maxSqft: number | null;
  location: string;
  status: string[];
}