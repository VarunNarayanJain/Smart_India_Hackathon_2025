import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Menu, X, Globe, User, LogIn } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Itinerary Planner', path: '/itinerary' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Chatbot', path: '/chatbot' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'local', name: 'स्थानीय' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/Logoo.png"
              alt="Jharkhand Tourism logo"
              className="w-15 h-12 object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Jharkhand Tourism</h1>
              <p className="text-xs text-green-600">Eco & Cultural Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Auth */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {languages.find(lang => lang.code === language)?.name}
                </span>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-green-600 hover:bg-green-50 transition-colors duration-200">
                <LogIn className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Up</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <button className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-green-600 hover:bg-green-50 transition-colors duration-200">
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm font-medium">Login</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors duration-200">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Up</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}