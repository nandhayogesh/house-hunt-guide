import { z } from 'zod';

// Property validation schema
export const PropertySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  location: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State is required').max(2, 'State must be 2 characters'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code format'),
    lat: z.number().min(-90).max(90, 'Invalid latitude'),
    lng: z.number().min(-180).max(180, 'Invalid longitude'),
  }),
  features: z.object({
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().min(0),
    sqft: z.number().positive(),
    yearBuilt: z.number().int().min(1800).max(new Date().getFullYear() + 1),
    propertyType: z.enum(['House', 'Apartment', 'Condo', 'Townhouse']),
    parking: z.number().int().min(0),
  }),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  agent_id: z.string().uuid(),
  virtualTour: z.string().url().optional(),
  featured: z.boolean(),
  status: z.enum(['For Sale', 'For Rent', 'Sold', 'Pending']),
  listingDate: z.string().datetime(),
});

export const CreatePropertySchema = PropertySchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdatePropertySchema = PropertySchema.partial().extend({
  id: z.string().uuid(),
});

// Search filters validation
export const SearchFiltersSchema = z.object({
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  propertyType: z.array(z.string()).optional(),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  minSqft: z.number().positive().optional(),
  maxSqft: z.number().positive().optional(),
  location: z.string().optional(),
  status: z.array(z.string()).optional(),
});

// Validation helper function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Validation failed: ${errorMessages.join(', ')}`);
    }
    throw error;
  }
}