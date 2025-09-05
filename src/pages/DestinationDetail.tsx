import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin,
  Clock,
  Star,
  Camera,
  Play,
  Heart,
  Share2,
  Navigation,
  Calendar,
  Thermometer,
  Droplets,
  Wind,
  ShoppingBag,
  ArrowLeft,
  Plus,
  Check,
  CheckCircle,
  XCircle,
  Clock as ClockIcon
} from 'lucide-react';
import { getDestinationById } from '../data/destinations';
import { useItinerary } from '../context/ItineraryContext';

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);
  const { addDesiredPlace, desiredPlaces } = useItinerary();
  const [showNotification, setShowNotification] = useState(false);

  // Get destination data based on ID
  const destination = getDestinationById(Number(id));

  // Check if this destination is already in the itinerary
  const isInItinerary = destination ? desiredPlaces.includes(destination.name) : false;

  const handleAddToItinerary = () => {
    if (destination) {
      addDesiredPlace(destination.name);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // Handle case when destination is not found
  if (!destination) {
    return (
      <div className="pt-20 min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
          <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'photos', label: 'Photos & Videos' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'guides', label: 'Local Guides' },
    { id: 'eateries', label: 'Local Eateries' },
    { id: 'transport', label: 'Transportation' },
    { id: 'products', label: 'Local Products' }
  ];

  return (
    <div className="pt-20 min-h-screen bg-stone-50">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-24 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 transform transition-all duration-300 ease-in-out">
          <Check className="w-5 h-5" />
          <span className="font-medium">{destination?.name} added to your itinerary!</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={destination.images[0]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isLiked ? 'bg-red-500/80 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Add to Itinerary Button */}
        <div className="absolute bottom-8 right-8 z-50" style={{ pointerEvents: 'auto' }}>
          <button
            onClick={handleAddToItinerary}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              isInItinerary 
                ? 'bg-green-600 text-white' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            {isInItinerary ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Itinerary</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add to Itinerary</span>
              </>
            )}
          </button>
          
          {isInItinerary && (
            <Link
              to="/itinerary"
              className="block mt-2 text-center text-sm text-white hover:text-green-300 transition-colors duration-200"
            >
              View Itinerary →
            </Link>
          )}
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
          <h1 className="text-5xl font-bold mb-2">{destination.name}</h1>
          <p className="text-xl text-green-300 mb-4">{destination.tagline}</p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Best Time: {destination.bestTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Weather Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Thermometer className="w-5 h-5 text-orange-500" />
            <span>Current Weather</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{destination.weather.temperature}°C</div>
              <div className="text-sm text-gray-600">{destination.weather.condition}</div>
            </div>
            <div className="text-center">
              <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <div className="text-sm text-gray-600">Humidity</div>
              <div className="font-semibold text-gray-900">{destination.weather.humidity}%</div>
            </div>
            <div className="text-center">
              <Wind className="w-6 h-6 text-gray-500 mx-auto mb-1" />
              <div className="text-sm text-gray-600">Wind Speed</div>
              <div className="font-semibold text-gray-900">{destination.weather.windSpeed} km/h</div>
            </div>
            <div className="text-center">
              <Calendar className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <div className="text-sm text-gray-600">Best Time</div>
              <div className="font-semibold text-gray-900">Oct-Mar</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{destination.description}</p>
                </div>

                {/* Map Section */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-green-600" />
                    <span>Location</span>
                  </h4>
                  <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive Map Coming Soon</p>
                      <p className="text-sm">Coordinates: {destination.coordinates.lat}, {destination.coordinates.lng}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Photos & Videos Tab */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destination.images.map((image, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={image}
                        alt={`${destination.name} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-xl flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Videos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.videos.map((_, index) => (
                      <div key={index} className="relative bg-gray-200 rounded-xl h-48 flex items-center justify-center">
                        <Play className="w-12 h-12 text-gray-600" />
                        <p className="absolute bottom-4 text-sm text-gray-600">Video {index + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">4.7</span>
                    <span className="text-gray-600">({destination.reviews.length} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {destination.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.user}</h4>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Guides Tab */}
            {activeTab === 'guides' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Local Guides</h3>
                  <p className="text-gray-600">Expert local guides to enhance your experience</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.localGuides.map((guide) => (
                    <div key={guide.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      <div className="p-6">
                        <div className="flex items-start space-x-4 mb-4">
                          <img
                            src={guide.avatar}
                            alt={guide.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">{guide.name}</h4>
                            <p className="text-sm text-gray-600">{guide.experience} experience</p>
                            <div className="mt-1">
                              {guide.verificationStatus === 'verified' && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                  <CheckCircle className="w-3 h-3 mr-1" /> Verified
                                </span>
                              )}
                              {guide.verificationStatus === 'unverified' && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                  <XCircle className="w-3 h-3 mr-1" /> Unverified
                                </span>
                              )}
                              {guide.verificationStatus === 'pending' && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                  <ClockIcon className="w-3 h-3 mr-1" /> Pending
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= guide.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm font-semibold text-gray-900 ml-1">{guide.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-4">{guide.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">Languages:</p>
                            <div className="flex flex-wrap gap-1">
                              {guide.languages.map((language, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                                >
                                  {language}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">Specialties:</p>
                            <div className="flex flex-wrap gap-1">
                              {guide.specialties.map((specialty, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div>
                              <p className="text-lg font-bold text-green-600">{guide.hourlyRate}</p>
                              <p className="text-xs text-gray-600">per hour</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors duration-200">
                                Book Now
                              </button>
                              <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200">
                                Contact
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Eateries Tab */}
            {activeTab === 'eateries' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Local Eateries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.localEateries.map((eatery, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      <img
                        src={eatery.image}
                        alt={eatery.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2">{eatery.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{eatery.cuisine}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= eatery.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm font-semibold text-gray-900">{eatery.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">{eatery.priceRange}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {eatery.specialties.map((specialty, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transportation Tab */}
            {activeTab === 'transport' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">How to Reach</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.transportation.map((transport, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <transport.icon className="w-8 h-8 text-green-600" />
                        <h4 className="font-bold text-gray-900">{transport.mode}</h4>
                      </div>
                      <p className="text-gray-700 mb-3">{transport.details}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold text-gray-900">{transport.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cost:</span>
                          <span className="font-semibold text-gray-900">{transport.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Famous Local Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.famousProducts.map((product, index) => (
                    <Link
                      key={index}
                      to={`/marketplace?product=${product.marketplaceId}`}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-600">{product.price}</span>
                          <div className="flex items-center space-x-2 text-green-600">
                            <ShoppingBag className="w-4 h-4" />
                            <span className="text-sm font-medium">View in Marketplace</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}