import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Users, Search, Clock, Route } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const features = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Accessible Routes',
    description: 'Find wheelchair-friendly paths and routes optimized for accessibility.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Community Driven',
    description: 'Benefit from real experiences shared by our community members.'
  },
  {
    icon: <Navigation className="h-6 w-6" />,
    title: 'Real-time Updates',
    description: 'Get the latest information about accessibility changes in your area.'
  }
];

function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routeInfo, setRouteInfo] = useState<{distance: string; duration: string} | null>(null);
  const mapRef = useRef<any>(null);
  const originAutocompleteRef = useRef<any>(null);
  const destinationAutocompleteRef = useRef<any>(null);
  const directionsServiceRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);

  useEffect(() => {
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBvG2QwH1QJ9resTZsAgZN0oNBd1HpxwkI&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      // Initialize map
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 13,
      });
      mapRef.current = map;

      // Initialize services
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('directions-panel'),
      });

      // Initialize autocomplete
      originAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        document.getElementById('origin-input')
      );
      destinationAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        document.getElementById('destination-input')
      );
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const calculateRoute = () => {
    if (!origin || !destination) return;

    const request = {
      origin,
      destination,
      travelMode: 'WALKING',
      provideRouteAlternatives: true,
    };

    directionsServiceRef.current.route(request, (result: any, status: string) => {
      if (status === 'OK') {
        directionsRendererRef.current.setDirections(result);
        const route = result.routes[0];
        setRouteInfo({
          distance: route.legs[0].distance.text,
          duration: route.legs[0].duration.text,
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Navigate Your World Without Barriers
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          AccessMap helps you find wheelchair-accessible routes and places, making navigation easier and more inclusive for everyone.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="text-gray-400" />
              <input
                id="origin-input"
                type="text"
                placeholder="Starting point"
                className="w-full p-2 border rounded-md"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-400" />
              <input
                id="destination-input"
                type="text"
                placeholder="Where to?"
                className="w-full p-2 border rounded-md"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <button
              onClick={calculateRoute}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Find Accessible Route
            </button>
          </div>

          {routeInfo && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Route className="text-blue-600 mr-2" />
                  <span>Distance: {routeInfo.distance}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-blue-600 mr-2" />
                  <span>Time: {routeInfo.duration}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2">
          <div id="map" className="h-[500px] rounded-lg shadow-md"></div>
        </div>
        <div id="directions-panel" className="bg-white p-4 rounded-lg shadow-md overflow-y-auto h-[500px]"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Join Our Mission
        </h2>
        <p className="text-gray-600 mb-6">
          Help us create a more accessible world by contributing to our community-driven platform.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;