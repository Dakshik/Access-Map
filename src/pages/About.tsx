import React from 'react';
import { Users } from 'lucide-react';

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Who We Are</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Meet the founders who are making navigation accessible for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800" 
            alt="Sarah Chen" 
            className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
          />
          <h2 className="text-2xl font-bold text-center mb-2">Sarah Chen</h2>
          <p className="text-blue-600 text-center mb-4">Co-Founder & CEO</p>
          <p className="text-gray-600">
            After experiencing firsthand the challenges of navigating cities in a wheelchair following a temporary injury, 
            Sarah was inspired to create a solution that would make mobility easier for everyone. With her background in 
            urban planning and technology, she founded AccessMap to ensure no one faces unnecessary barriers in their daily journeys.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800" 
            alt="David Rodriguez" 
            className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
          />
          <h2 className="text-2xl font-bold text-center mb-2">David Rodriguez</h2>
          <p className="text-blue-600 text-center mb-4">Co-Founder & CTO</p>
          <p className="text-gray-600">
            As an accessibility advocate and software engineer, David has always been passionate about using technology 
            to solve real-world problems. His experience developing mapping solutions, combined with his commitment to 
            inclusive design, drives AccessMap's technical innovation and user-centered approach.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-16">
        <div className="flex items-center justify-center mb-6">
          <Users className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
          At AccessMap, we believe that everyone deserves the freedom to navigate their world independently and confidently. 
          Our mission is to create a comprehensive platform that provides accurate, up-to-date information about 
          wheelchair-accessible routes and locations, empowering individuals to explore their communities without barriers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Our Values</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Accessibility for all</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Community-driven solutions</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Inclusive design principles</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Our Approach</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Crowdsourced accessibility data</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Real-time updates and alerts</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>User-verified information</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Our Impact</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>10,000+ accessible routes mapped</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>5,000+ active community members</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>25+ cities with detailed coverage</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;