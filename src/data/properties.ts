import { Property } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Residence',
    description: 'Stunning contemporary home with panoramic city views, premium finishes throughout, and smart home technology. Features an open-concept design perfect for entertaining.',
    price: 1250000,
    location: {
      address: '123 Skyline Drive',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      lat: 34.0901,
      lng: -118.4065
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      yearBuilt: 2020,
      propertyType: 'House',
      parking: 2
    },
    images: ['/src/assets/hero-property.jpg'],
    agent: {
      id: 'agent1',
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@realty.com'
    },
    virtualTour: 'https://example.com/virtual-tour-1',
    featured: true,
    status: 'For Sale',
    listingDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Downtown Luxury Apartment',
    description: 'Elegant high-rise apartment in the heart of downtown with floor-to-ceiling windows, modern amenities, and concierge service.',
    price: 3500,
    location: {
      address: '456 Metropolitan Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90013',
      lat: 34.0522,
      lng: -118.2437
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1400,
      yearBuilt: 2018,
      propertyType: 'Apartment',
      parking: 1
    },
    images: ['/src/assets/property-1.jpg'],
    agent: {
      id: 'agent2',
      name: 'Michael Chen',
      phone: '(555) 987-6543',
      email: 'michael.chen@realty.com'
    },
    featured: true,
    status: 'For Rent',
    listingDate: '2024-02-01'
  },
  {
    id: '3',
    title: 'Charming Family Home',
    description: 'Beautiful traditional home in a quiet neighborhood with mature trees, updated kitchen, and spacious backyard perfect for families.',
    price: 750000,
    location: {
      address: '789 Oak Street',
      city: 'Pasadena',
      state: 'CA',
      zipCode: '91101',
      lat: 34.1478,
      lng: -118.1445
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2100,
      yearBuilt: 1995,
      propertyType: 'House',
      parking: 2
    },
    images: ['/src/assets/property-2.jpg'],
    agent: {
      id: 'agent3',
      name: 'Emily Rodriguez',
      phone: '(555) 456-7890',
      email: 'emily.rodriguez@realty.com'
    },
    featured: false,
    status: 'For Sale',
    listingDate: '2024-01-20'
  },
  {
    id: '4',
    title: 'Luxury Penthouse Suite',
    description: 'Exclusive penthouse with breathtaking views, private elevator access, rooftop terrace, and premium amenities throughout.',
    price: 2800000,
    location: {
      address: '321 Sunset Boulevard',
      city: 'West Hollywood',
      state: 'CA',
      zipCode: '90069',
      lat: 34.0900,
      lng: -118.3617
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2800,
      yearBuilt: 2021,
      propertyType: 'Condo',
      parking: 2
    },
    images: ['/src/assets/property-3.jpg'],
    agent: {
      id: 'agent1',
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@realty.com'
    },
    virtualTour: 'https://example.com/virtual-tour-4',
    featured: true,
    status: 'For Sale',
    listingDate: '2024-02-10'
  },
  {
    id: '5',
    title: 'Cozy Townhouse',
    description: 'Modern townhouse with private patio, attached garage, and close proximity to shopping and dining. Perfect for first-time buyers.',
    price: 525000,
    location: {
      address: '654 Maple Lane',
      city: 'Glendale',
      state: 'CA',
      zipCode: '91201',
      lat: 34.1425,
      lng: -118.2551
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1250,
      yearBuilt: 2010,
      propertyType: 'Townhouse',
      parking: 1
    },
    images: ['/src/assets/property-1.jpg'],
    agent: {
      id: 'agent2',
      name: 'Michael Chen',
      phone: '(555) 987-6543',
      email: 'michael.chen@realty.com'
    },
    featured: false,
    status: 'For Sale',
    listingDate: '2024-02-05'
  },
  {
    id: '6',
    title: 'Executive Rental',
    description: 'Fully furnished executive rental in prime location. Perfect for professionals seeking luxury and convenience.',
    price: 4200,
    location: {
      address: '987 Executive Plaza',
      city: 'Santa Monica',
      state: 'CA',
      zipCode: '90401',
      lat: 34.0195,
      lng: -118.4912
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1600,
      yearBuilt: 2019,
      propertyType: 'Apartment',
      parking: 1
    },
    images: ['/src/assets/property-2.jpg'],
    agent: {
      id: 'agent3',
      name: 'Emily Rodriguez',
      phone: '(555) 456-7890',
      email: 'emily.rodriguez@realty.com'
    },
    featured: false,
    status: 'For Rent',
    listingDate: '2024-02-12'
  }
];