import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property';
import { Bed, Bath, Square, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'featured';
}

export function PropertyCard({ property, variant = 'default' }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (property.status === 'For Rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-card group ${
      variant === 'featured' ? 'shadow-premium' : ''
    }`}>
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant={property.status === 'For Sale' ? 'default' : 'secondary'}>
            {property.status}
          </Badge>
          {property.featured && (
            <Badge className="bg-gold text-luxury-foreground">Featured</Badge>
          )}
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="bg-luxury/90 text-luxury-foreground px-3 py-1 rounded-lg text-sm font-semibold">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-luxury line-clamp-2">{property.title}</h3>
        </div>
        
        <div className="flex items-center text-neutral-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location.address}, {property.location.city}</span>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{property.description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.features.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.features.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.features.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium text-luxury">{property.agent.name}</p>
              <div className="flex items-center gap-3 text-neutral-600 mt-1">
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  <span className="text-xs">{property.agent.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  <span className="text-xs">{property.agent.email}</span>
                </div>
              </div>
            </div>
            <Link to={`/property/${property.id}`}>
              <Button variant="outline" size="sm" className="hover:bg-premium hover:text-primary-foreground">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}