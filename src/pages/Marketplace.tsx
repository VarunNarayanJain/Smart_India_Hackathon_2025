import { useState } from 'react';
import { ShoppingBag, Star, Heart, MapPin, Shield } from 'lucide-react';

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', count: 28 },
    { id: 'handicrafts', name: 'Handicrafts', count: 12 },
    { id: 'homestays', name: 'Homestays', count: 8 },
    { id: 'guides', name: 'Guides', count: 6 },
    { id: 'events', name: 'Cultural Events', count: 2 }
  ];

  const items = [
    {
      id: 1,
      title: 'Handwoven Bamboo Baskets',
      artisan: 'Mina Devi',
      location: 'Khunti Village',
      price: '₹850',
      image: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      story: 'Traditional baskets made using ancient weaving techniques passed down through generations',
      rating: 4.8,
      category: 'handicrafts',
      verified: true,
      badge: 'Community Endorsed'
    },
    {
      id: 2,
      title: 'Authentic Tribal Homestay',
      artisan: 'Rajesh Oraon',
      location: 'Netarhat Hills',
      price: '₹1,200/night',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      story: 'Experience traditional tribal lifestyle with organic meals and cultural activities',
      rating: 4.9,
      category: 'homestays',
      verified: true,
      badge: 'Verified'
    },
    {
      id: 3,
      title: 'Certified Nature Guide',
      artisan: 'Amit Kumar Singh',
      location: 'Betla National Park',
      price: '₹2,500/day',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      story: '15+ years experience in wildlife tracking and tribal culture storytelling',
      rating: 4.7,
      category: 'guides',
      verified: true,
      badge: 'Expert Guide'
    },
    {
      id: 4,
      title: 'Santhal Tribal Art Paintings',
      artisan: 'Geeta Murmu',
      location: 'Dumka District',
      price: '₹1,500',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      story: 'Vibrant paintings depicting Santhal folklore and nature-based stories',
      rating: 4.6,
      category: 'handicrafts',
      verified: true,
      badge: 'Authentic'
    },
    {
      id: 5,
      title: 'Karma Festival Experience',
      artisan: 'Cultural Heritage Society',
      location: 'Multiple Locations',
      price: 'Free',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      story: 'Join the traditional harvest festival with music, dance and community celebration',
      rating: 4.9,
      category: 'events',
      verified: true,
      badge: 'Cultural Event'
    },
    {
      id: 6,
      title: 'Dokra Metal Crafts',
      artisan: 'Ramesh Mahato',
      location: 'Saraikela',
      price: '₹3,200',
      image: 'https://images.pexels.com/photos/6128070/pexels-photo-6128070.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      story: 'Ancient lost-wax casting technique creating beautiful brass figurines and decorative items',
      rating: 4.8,
      category: 'handicrafts',
      verified: true,
      badge: 'Master Craftsman'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-20 min-h-screen bg-stone-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp">Tribal Marketplace</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fadeInUp">
            Support local artisans and experience authentic Jharkhand culture
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-black/50 hover:shadow-xl dark:hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-4 hover:scale-105 overflow-hidden group border border-gray-100 dark:border-gray-800 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <button className="w-10 h-10 bg-white/90 dark:bg-gray-900/90 hover:bg-white/95 dark:hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.verified 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">by {item.artisan}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {item.story}
                </p>

                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                  {item.verified && (
                    <>
                      <Shield className="w-3 h-3 text-green-600" />
                      <span className="text-green-600">Verified</span>
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.price}
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 group-hover:animate-pulse">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Reserve & Collect</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}