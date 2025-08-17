import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, Map, Phone } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-luxury">EliteRealty</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={isActive('/') ? 'default' : 'ghost'}
              className={isActive('/') ? 'bg-premium hover:bg-premium-dark' : ''}
            >
              Home
            </Button>
          </Link>
          <Link to="/properties">
            <Button 
              variant={isActive('/properties') ? 'default' : 'ghost'}
              className={isActive('/properties') ? 'bg-premium hover:bg-premium-dark' : ''}
            >
              <Search className="w-4 h-4 mr-2" />
              Properties
            </Button>
          </Link>
          <Link to="/map">
            <Button 
              variant={isActive('/map') ? 'default' : 'ghost'}
              className={isActive('/map') ? 'bg-premium hover:bg-premium-dark' : ''}
            >
              <Map className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </Link>
          <Link to="/contact">
            <Button 
              variant={isActive('/contact') ? 'default' : 'ghost'}
              className={isActive('/contact') ? 'bg-premium hover:bg-premium-dark' : ''}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-premium hover:bg-premium-dark">
            List Property
          </Button>
        </div>
      </div>
    </header>
  );
}