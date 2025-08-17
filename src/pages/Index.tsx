import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { useFeaturedProperties } from '@/services/api';
import { Card } from '@/components/ui/card';
import { PropertyListSkeleton } from '@/components/ui/loading-skeleton';
import { ErrorMessage } from '@/components/ui/error-message';
import { Search, MapPin, Eye, Users, Award, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-property.jpg';

export default function Index() {
  const { data: featuredProperties = [], isLoading, isError, error, refetch } = useFeaturedProperties();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-overlay"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream
            <span className="block text-gold">Property Today</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover luxury homes, premium apartments, and exclusive properties in prime locations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties">
              <Button size="lg" className="bg-premium hover:bg-premium-dark text-white px-8 py-3">
                <Search className="w-5 h-5 mr-2" />
                Browse Properties
              </Button>
            </Link>
            <Link to="/map">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-luxury px-8 py-3"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Explore Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-premium mb-2">500+</div>
              <div className="text-neutral-600">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-premium mb-2">98%</div>
              <div className="text-neutral-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-premium mb-2">15+</div>
              <div className="text-neutral-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-premium mb-2">50+</div>
              <div className="text-neutral-600">Expert Agents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-luxury mb-4">Featured Properties</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties in the most desirable locations
            </p>
          </div>
          
          {isLoading ? (
            <PropertyListSkeleton count={3} />
          ) : isError ? (
            <ErrorMessage
              title="Failed to load featured properties"
              message={error?.message || "Unable to fetch featured properties."}
              onRetry={() => refetch()}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} variant="featured" />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link to="/properties">
              <Button size="lg" className="bg-premium hover:bg-premium-dark">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-luxury mb-4">Our Services</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-card transition-shadow">
              <div className="w-16 h-16 bg-premium/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-premium" />
              </div>
              <h3 className="text-xl font-semibold text-luxury mb-3">Property Search</h3>
              <p className="text-neutral-600">
                Advanced search tools to help you find the perfect property that matches your criteria
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-card transition-shadow">
              <div className="w-16 h-16 bg-premium/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-premium" />
              </div>
              <h3 className="text-xl font-semibold text-luxury mb-3">Virtual Tours</h3>
              <p className="text-neutral-600">
                Immersive 3D virtual tours allowing you to explore properties from anywhere
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-card transition-shadow">
              <div className="w-16 h-16 bg-premium/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-premium" />
              </div>
              <h3 className="text-xl font-semibold text-luxury mb-3">Expert Consultation</h3>
              <p className="text-neutral-600">
                Professional guidance from experienced agents throughout your property journey
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-card transition-shadow">
              <div className="w-16 h-16 bg-premium/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-premium" />
              </div>
              <h3 className="text-xl font-semibold text-luxury mb-3">Premium Listings</h3>
              <p className="text-neutral-600">
                Exclusive access to luxury properties and off-market opportunities
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-card transition-shadow">
              <div className="w-16 h-16 bg-premium/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-premium" />
              </div>
              <h3 className="text-xl font-semibold text-luxury mb-3">Market Analysis</h3>
              <p className="text-neutral-600">
                Comprehensive market insights and valuation services for informed decisions
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-card transition-shadow">
              <div className="w-16 h-16 bg-premium/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-premium" />
              </div>
              <h3 className="text-xl font-semibold text-luxury mb-3">Location Intelligence</h3>
              <p className="text-neutral-600">
                Interactive maps and neighborhood insights to help you choose the perfect location
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who found their dream homes with EliteRealty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-luxury hover:bg-neutral-100 px-8 py-3">
                Get Started Today
              </Button>
            </Link>
            <Link to="/properties">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-luxury px-8 py-3"
              >
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}