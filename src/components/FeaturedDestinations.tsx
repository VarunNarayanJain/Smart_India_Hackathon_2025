import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedDestinations() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const destinations = [
    {
      id: 1,
      name: 'Netarhat',
      tagline: 'Queen of Chotanagpur Plateau',
      story: 'Famous for sunrise views and pine forests that create a magical morning mist',
      image: '/n1.jpg',
      bestSeason: 'Oct-Mar',
      distance: '156 km from Ranchi'
    },
    {
      id: 2,
      name: 'Hundru Falls',
      tagline: 'Thundering Beauty',
      story: 'Where Subarnarekha river creates a spectacular 98-meter waterfall',
      image: 'h1.jpg',
      bestSeason: 'Jul-Jan',
      distance: '45 km from Ranchi'
    },
    {
      id: 3,
      name: 'Betla National Park',
      tagline: 'Wildlife Paradise',
      story: 'Home to tigers, elephants and rich biodiversity in the Palamau region',
      image: 'b1.jpg',
      bestSeason: 'Nov-Apr',
      distance: '170 km from Ranchi'
    },
    {
      id: 4,
      name: 'Deoghar',
      tagline: 'Abode of Gods',
      story: 'Sacred temple town famous for Baba Baidyanath Dham and spiritual energy',
      image: 'deo1.jpeg',
      bestSeason: 'Oct-Mar',
      distance: '250 km from Ranchi'
    },
    {
      id: 5,
      name: 'Hazaribagh',
      tagline: 'Land of Thousand Gardens',
      story: 'Rolling hills, wildlife sanctuary and serene lakes create perfect retreat',
      image: 'haz1.jpg',
      bestSeason: 'Sep-Mar',
      distance: '91 km from Ranchi'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the most breathtaking and culturally rich destinations Jharkhand has to offer
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Destinations Carousel */}
          <div 
            ref={scrollContainer}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                to={`/destination/${destination.id}`}
                className="flex-none w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm text-green-300">{destination.tagline}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {destination.story}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{destination.bestSeason}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{destination.distance}</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-medium transition-colors duration-200 text-center">
                    Explore More
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}