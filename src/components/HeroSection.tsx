import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="dark:bg-neutral-800 relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="dark:bg-neutral-800 absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/Landing.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fadeInUp">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Discover Jharkhand:
          <span className="block text-green-400">Nature, Culture & Stories</span>
          <span className="block text-lg md:text-2xl font-normal mt-2 text-gray-200">
            Personalized for You
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Experience the untouched beauty and rich tribal heritage of Jharkhand through AI-powered personalized itineraries
        </p>
        
        <Link
          to="/itinerary"
          className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
        >
          <span>Plan My Trip</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

    </section>
  );
}