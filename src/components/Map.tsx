import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/types/property';

interface MapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertySelect?: (property: Property) => void;
}

const Map: React.FC<MapProps> = ({ properties, selectedProperty, onPropertySelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with environment variable
    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    
    if (!mapboxToken) {
      console.error('Mapbox access token is not configured. Please set VITE_MAPBOX_ACCESS_TOKEN in your environment variables.');
      return;
    }
    
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-118.2437, 34.0522], // Los Angeles center
      zoom: 10,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Cleanup function
    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for each property
    properties.forEach((property) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.cssText = `
        background-color: ${selectedProperty?.id === property.id ? '#F59E0B' : '#3B82F6'};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        transition: all 0.3s ease;
      `;
      el.textContent = property.status === 'For Rent' ? 'R' : 'S';

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([property.location.lng, property.location.lat])
        .addTo(map.current!);

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3">
          <h3 class="font-semibold text-sm mb-1">${property.title}</h3>
          <p class="text-xs text-gray-600 mb-2">${property.location.address}</p>
          <p class="font-bold text-blue-600">
            ${property.status === 'For Rent' ? `$${property.price.toLocaleString()}/mo` : `$${property.price.toLocaleString()}`}
          </p>
        </div>
      `);

      marker.setPopup(popup);

      el.addEventListener('click', () => {
        if (onPropertySelect) {
          onPropertySelect(property);
        }
      });

      markers.current.push(marker);
    });

    // Fit map to show all properties
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach(property => {
        bounds.extend([property.location.lng, property.location.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [properties, selectedProperty, onPropertySelect]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-card">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <span>For Sale</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gold rounded-full"></div>
            <span>For Rent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;