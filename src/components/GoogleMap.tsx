import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
    accessibility?: string;
  }>;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 40.7128, lng: -74.0060 }, // Default to New York City
  zoom = 13,
  markers = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    // Initialize the map
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });
    }

    // Update map center and zoom if they change
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(center);
      mapInstanceRef.current.setZoom(zoom);
    }

    return () => {
      // Clean up markers when component unmounts
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        map: mapInstanceRef.current,
        title: markerData.title,
        icon: markerData.accessibility === 'Fully accessible' 
          ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' 
          : 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      });

      // Add info window with accessibility information
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; font-weight: bold;">${markerData.title}</h3>
            <p style="margin: 0; color: ${markerData.accessibility === 'Fully accessible' ? 'green' : 'orange'};">
              ${markerData.accessibility || 'Accessibility information not available'}
            </p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  }, [markers]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg shadow-md"
      style={{ minHeight: '400px' }}
    />
  );
};

export default GoogleMap;