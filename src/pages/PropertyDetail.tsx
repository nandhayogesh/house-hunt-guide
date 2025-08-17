import { useParams, useNavigate } from 'react-router-dom';
import { mockProperties } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  Play,
  Share,
  Heart
} from 'lucide-react';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-luxury mb-4">Property Not Found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (property.status === 'For Rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={property.status === 'For Sale' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-gold text-luxury-foreground">Featured</Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Share className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                {property.virtualTour && (
                  <div className="absolute bottom-4 right-4">
                    <Button size="sm" className="bg-premium hover:bg-premium-dark">
                      <Play className="w-4 h-4 mr-2" />
                      Virtual Tour
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Property Details */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-luxury mb-2">{property.title}</h1>
                  <div className="flex items-center text-neutral-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-premium">{formatPrice(property.price)}</div>
                  <div className="text-sm text-neutral-600">Listed on {new Date(property.listingDate).toLocaleDateString()}</div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Property Features */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-4 bg-neutral-100 rounded-lg">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-premium" />
                  <div className="font-semibold">{property.features.bedrooms}</div>
                  <div className="text-sm text-neutral-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-neutral-100 rounded-lg">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-premium" />
                  <div className="font-semibold">{property.features.bathrooms}</div>
                  <div className="text-sm text-neutral-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-neutral-100 rounded-lg">
                  <Square className="w-6 h-6 mx-auto mb-2 text-premium" />
                  <div className="font-semibold">{property.features.sqft.toLocaleString()}</div>
                  <div className="text-sm text-neutral-600">Sq Ft</div>
                </div>
                <div className="text-center p-4 bg-neutral-100 rounded-lg">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-premium" />
                  <div className="font-semibold">{property.features.yearBuilt}</div>
                  <div className="text-sm text-neutral-600">Year Built</div>
                </div>
                <div className="text-center p-4 bg-neutral-100 rounded-lg">
                  <Car className="w-6 h-6 mx-auto mb-2 text-premium" />
                  <div className="font-semibold">{property.features.parking}</div>
                  <div className="text-sm text-neutral-600">Parking</div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-luxury mb-3">Description</h3>
                <p className="text-neutral-600 leading-relaxed">{property.description}</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-luxury mb-4">Contact Agent</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-premium rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {property.agent.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-luxury">{property.agent.name}</div>
                    <div className="text-sm text-neutral-600">Licensed Agent</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-premium" />
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-premium" />
                    <span>{property.agent.email}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Button className="w-full bg-premium hover:bg-premium-dark">
                    Schedule Showing
                  </Button>
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </div>
              </div>
            </Card>

            {/* Property Type Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-luxury mb-4">Property Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Property Type</span>
                  <span className="font-medium">{property.features.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Status</span>
                  <span className="font-medium">{property.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Year Built</span>
                  <span className="font-medium">{property.features.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Parking Spaces</span>
                  <span className="font-medium">{property.features.parking}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}