import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User, LogIn, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: t('header.home'), path: '/' },
    { name: t('header.destinations'), path: '/destinations' },
    { name: t('header.itinerary'), path: '/itinerary' },
    { name: t('header.marketplace'), path: '/marketplace' },
    { name: t('header.chatbot'), path: '/chatbot' },
    { name: t('header.dashboard'), path: '/dashboard' },
  ];



  return (
    <header className="bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg dark:shadow-black/50 fixed top-0 left-0 right-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
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
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('header.jharkhandTourism')}</h1>
              <p className="text-xs text-green-600 dark:text-green-400 animate-pulse">{t('header.ecoPortal')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 shadow-md'
                    : 'text-gray-700 dark:text-white hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Auth */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300 hover:rotate-12" />
              )}
            </button>
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-4 h-4 text-gray-600 dark:text-white" />
                <span className="text-sm font-medium text-gray-700 dark:text-white">
                  {language === 'en' ? 'हिंदी' : 'English'}
                </span>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-md">
                <LogIn className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Up</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 dark:border-gray-800 animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === item.path
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 shadow-md'
                      : 'text-gray-700 dark:text-white hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm font-medium">Login</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
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