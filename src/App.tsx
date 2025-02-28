import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Navigation className="h-8 w-8" />
                <span className="ml-2 text-xl font-semibold">AccessMap</span>
              </div>
              <div className="flex space-x-4">
                <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md">Home</Link>
                <Link to="/about" className="hover:bg-blue-700 px-3 py-2 rounded-md">About Us</Link>
                <Link to="/contact" className="hover:bg-blue-700 px-3 py-2 rounded-md">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center">© 2024 AccessMap. Making navigation accessible for everyone.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;