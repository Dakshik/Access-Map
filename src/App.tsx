import React, { useState } from 'react';
import { MapPin, Clock, Navigation, Menu, X, Home, Info, Mail, Search } from 'lucide-react';
import './App.css';
import GoogleMap from './components/GoogleMap';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<null | {
    place: string;
    distance: string;
    time: string;
    accessibility: string;
    location: { lat: number; lng: number };
  }[]>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [mapZoom, setMapZoom] = useState(13);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') return;
    
    // Simulate API response with mock data including coordinates
    const mockResults = [
      {
        place: "Central Park",
        distance: "1.2 miles",
        time: "15 minutes",
        accessibility: "Fully accessible",
        location: { lat: 40.7812, lng: -73.9665 }
      },
      {
        place: "City Library",
        distance: "0.8 miles",
        time: "10 minutes",
        accessibility: "Partially accessible",
        location: { lat: 40.7527, lng: -73.9772 }
      },
      {
        place: "Downtown Mall",
        distance: "2.5 miles",
        time: "30 minutes",
        accessibility: "Fully accessible",
        location: { lat: 40.7112, lng: -74.0123 }
      }
    ];
    
    setSearchResults(mockResults);
    
    // Center map on first result
    if (mockResults.length > 0) {
      setMapCenter(mockResults[0].location);
      setMapZoom(14);
    }
  };

  const handleResultClick = (location: { lat: number; lng: number }) => {
    setMapCenter(location);
    setMapZoom(16);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6" />
              <span className="text-xl font-bold">AccessMap</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => setActivePage('home')}
                className={`flex items-center space-x-1 ${activePage === 'home' ? 'font-bold' : ''}`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button 
                onClick={() => setActivePage('about')}
                className={`flex items-center space-x-1 ${activePage === 'about' ? 'font-bold' : ''}`}
              >
                <Info className="h-4 w-4" />
                <span>About Us</span>
              </button>
              <button 
                onClick={() => setActivePage('contact')}
                className={`flex items-center space-x-1 ${activePage === 'contact' ? 'font-bold' : ''}`}
              >
                <Mail className="h-4 w-4" />
                <span>Contact</span>
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="focus:outline-none">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pb-3 space-y-2">
              <button 
                onClick={() => {
                  setActivePage('home');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-2 py-1 rounded ${activePage === 'home' ? 'bg-blue-700' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  setActivePage('about');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-2 py-1 rounded ${activePage === 'about' ? 'bg-blue-700' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span>About Us</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  setActivePage('contact');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-2 py-1 rounded ${activePage === 'contact' ? 'bg-blue-700' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {activePage === 'home' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-blue-700">Wheelchair-Friendly Navigation</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                AccessMap helps you find wheelchair-accessible routes and places, making navigation easier for everyone.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find Accessible Routes</h2>
                
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-6">
                  <div className="flex-grow relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search for a place or address"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    Search
                  </button>
                </form>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Map Section */}
                  <div className="lg:col-span-2">
                    <div className="h-[400px] rounded-lg overflow-hidden">
                      <GoogleMap 
                        center={mapCenter}
                        zoom={mapZoom}
                        markers={searchResults ? searchResults.map(result => ({
                          position: result.location,
                          title: result.place,
                          accessibility: result.accessibility
                        })) : []}
                      />
                    </div>
                  </div>
                  
                  {/* Results Section */}
                  <div className="lg:col-span-1">
                    {searchResults ? (
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Search Results</h3>
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                          {searchResults.map((result, index) => (
                            <div 
                              key={index} 
                              className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer hover-card"
                              onClick={() => handleResultClick(result.location)}
                            >
                              <h4 className="text-lg font-medium text-blue-600">{result.place}</h4>
                              <div className="mt-2 space-y-2">
                                <div className="flex items-center text-gray-600">
                                  <Navigation className="h-4 w-4 mr-2" />
                                  <span>{result.distance}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{result.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    result.accessibility.includes("Fully") 
                                      ? "bg-green-100 text-green-800" 
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}>
                                    {result.accessibility}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6 text-center">
                        <Search className="h-12 w-12 mb-3 opacity-50" />
                        <p>Search for a location to see wheelchair accessibility information</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 hover-card">
                <div className="text-blue-600 mb-3">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessible Routes</h3>
                <p className="text-gray-600">Find paths that are wheelchair-friendly with detailed information about slopes, curb cuts, and surface types.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover-card">
                <div className="text-blue-600 mb-3">
                  <Navigation className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Verified</h3>
                <p className="text-gray-600">Our data is verified by community members who use wheelchairs, ensuring accuracy and reliability.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover-card">
                <div className="text-blue-600 mb-3">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
                <p className="text-gray-600">Get notifications about construction, temporary obstacles, or elevator outages that might affect your route.</p>
              </div>
            </div>
          </div>
        )}
        
        {activePage === 'about' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Who We Are</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover-card">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Sarah Johnson" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">Sarah Johnson</h2>
                  <p className="text-gray-600">
                    After experiencing firsthand the challenges of navigating cities in a wheelchair following an accident in 2015, 
                    I was determined to create a solution. With my background in software development, I started AccessMap to ensure 
                    that everyone has equal access to information about accessible routes and places.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover-card">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Michael Chen" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">Michael Chen</h2>
                  <p className="text-gray-600">
                    As an urban planner with a focus on inclusive design, I've always been passionate about making cities more 
                    accessible. When I met Sarah and learned about her vision for AccessMap, I immediately wanted to contribute 
                    my expertise. Together, we're working to transform how people with mobility challenges navigate their communities.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At AccessMap, we believe that everyone deserves the freedom to navigate their world with confidence. 
                Our mission is to provide accurate, up-to-date information about wheelchair accessibility in public spaces, 
                helping people with mobility challenges make informed decisions about how to get where they need to go.
              </p>
              <p className="text-gray-600">
                We're committed to building a community-driven platform that continuously improves through user feedback 
                and contributions. By crowdsourcing accessibility information, we can create a more comprehensive and 
                reliable resource than any single organization could develop alone.
              </p>
            </div>
          </div>
        )}
        
        {activePage === 'contact' && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Contact Us</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-6">
                Have questions, suggestions, or want to contribute to AccessMap? We'd love to hear from you! 
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button 
                  type="button"
                  onClick={() => alert('Thank you for your message! We will get back to you soon.')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Other Ways to Reach Us</h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@accessmap.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">123 Accessibility Lane, Suite 101<br />Seattle, WA 98101</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <MapPin className="h-5 w-5" />
              <span className="text-lg font-bold">AccessMap</span>
            </div>
            
            <div className="flex space-x-6">
              <button onClick={() => setActivePage('home')} className="hover:text-blue-300 transition duration-300">Home</button>
              <button onClick={() => setActivePage('about')} className="hover:text-blue-300 transition duration-300">About Us</button>
              <button onClick={() => setActivePage('contact')} className="hover:text-blue-300 transition duration-300">Contact</button>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} AccessMap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;