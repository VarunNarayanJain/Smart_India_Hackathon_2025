import React, { useState } from 'react';
import { MapPin, Star, Clock, Camera, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DestinationExplorer() {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    {
      id: 1,
      name: 'Netarhat',
      tagline: 'Queen of Chotanagpur Plateau',
      image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      rating: 4.8,
      bestSeason: 'October - March',
      distance: '156 km from Ranchi',
      activities: ['Sunrise Views', 'Pine Forest Walk', 'Photography'],
      description: 'Famous for its sunrise views and cool climate, Netarhat is a perfect hill station escape.',
      coordinates: { lat: 23.4676, lng: 84.2534 }
    },
    {
      id: 2,
      name: 'Hundru Falls',
      tagline: 'Thundering Beauty',
      image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      rating: 4.6,
      bestSeason: 'July - January',
      distance: '45 km from Ranchi',
      activities: ['Waterfall Photography', 'Trekking', 'Rock Climbing'],
      description: 'A spectacular 98-meter waterfall where Subarnarekha river creates nature\'s masterpiece.',
      coordinates: { lat: 23.4333, lng: 85.6167 }
    },
    {
      id: 3,
      name: 'Betla National Park',
      tagline: 'Wildlife Paradise',
      image: 'https://images.pexels.com/photos/1059823/pexels-photo-1059823.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      rating: 4.7,
      bestSeason: 'November - April',
      distance: '170 km from Ranchi',
      activities: ['Safari', 'Bird Watching', 'Nature Photography'],
      description: 'Home to tigers, elephants and diverse wildlife in the Palamau Tiger Reserve.',
      coordinates: { lat: 23.9167, lng: 84.1833 }
    },
    {
      id: 4,
      name: 'Deoghar',
      tagline: 'Abode of Gods',
      image: 'https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      rating: 4.5,
      bestSeason: 'October - March',
      distance: '250 km from Ranchi',
      activities: ['Temple Visits', 'Spiritual Walk', 'Cultural Tours'],
      description: 'Sacred temple town famous for Baba Baidyanath Dham, one of the twelve Jyotirlingas.',
      coordinates: { lat: 24.4833, lng: 86.7 }
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Destination Explorer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing places across Jharkhand with interactive maps and detailed guides
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Interactive Map */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Interactive Map</h2>
              <div className="text-sm text-gray-600">Click pins to explore</div>
            </div>
            
            <div className="h-96 bg-green-100 rounded-2xl relative overflow-hidden">
              {/* Simplified map representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300">
                <div className="absolute inset-0 opacity-">
                  <img 
                    src="./Maps.png"
                    alt="Jharkhand Map"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Map Pins */}
                {destinations.map((dest) => (
                  <Link
                    key={dest.id}
                    to={`/destination/${dest.id}`}
                    className="absolute bg-black hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm transition-all duration-200 hover:scale-110 shadow-lg"
                    style={{
                      top: `${20 + (dest.id * 14)}%`,
                      left: `${25 + (dest.id * 9)}%`
                    }}
                    onClick={() => setSelectedDestination(dest)}
                  >
                    {dest.id}
                  </Link>
                ))}
              </div>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="text-xs text-gray-600">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <span>Tourist Destinations</span>
                  </div>
                  <div className="text-green-600 font-medium">Jharkhand Tourism</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Destination List */}
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                to={`/destination/${destination.id}`}
                className={`block bg-white rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                  selectedDestination?.id === destination.id ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-100'
                }`}
                onClick={() => setSelectedDestination(destination)}
              >
                <div className="flex space-x-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{destination.name}</h3>
                        <p className="text-green-600 text-sm font-medium">{destination.tagline}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{destination.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm">{destination.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{destination.bestSeason}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{destination.distance}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex space-x-1">
                        {destination.activities.slice(0, 2).map((activity) => (
                          <span key={activity} className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                            {activity}
                          </span>
                        ))}
                      </div>
                      <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
                        <Plus className="w-4 h-4" />
                        <span>Explore</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}