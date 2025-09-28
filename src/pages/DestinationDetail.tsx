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
      <div className="pt-20 min-h-screen bg-stone-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Destination Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The destination you're looking for doesn't exist.</p>
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
    <div className="pt-20 min-h-screen bg-stone-50 dark:bg-neutral-900 transition-colors duration-300">
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
           className="absolute top-6 left-6 bg-black/30 dark:bg-gray-900/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-110 hover:shadow-lg animate-fadeInUp"
         >
           <ArrowLeft className="w-6 h-6" />
         </Link>

                 {/* Action Buttons */}
         <div className="absolute top-6 right-6 flex space-x-3 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
           <button
             onClick={() => setIsLiked(!isLiked)}
             className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg ${
               isLiked ? 'bg-red-500/90 text-white' : 'bg-black/30 dark:bg-gray-900/80 text-white hover:bg-black/50 dark:hover:bg-gray-800/90'
             }`}
           >
             <Heart className={`w-6 h-6 transition-transform duration-300 ${isLiked ? 'fill-current scale-110' : ''}`} />
           </button>
           <button className="bg-black/30 dark:bg-gray-900/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-110 hover:shadow-lg">
             <Share2 className="w-6 h-6" />
           </button>
         </div>

         {/* Add to Itinerary Button */}
         <div className="absolute bottom-8 right-8 z-50 animate-fadeInUp" style={{ pointerEvents: 'auto', animationDelay: '400ms' }}>
           <button
             onClick={handleAddToItinerary}
             className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl ${
               isInItinerary 
                 ? 'bg-green-600 text-white hover:bg-green-700' 
                 : 'bg-black/40 dark:bg-gray-900/90 backdrop-blur-sm text-white hover:bg-black/60 dark:hover:bg-gray-800/95'
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
               className="block mt-2 text-center text-sm text-white hover:text-green-300 transition-all duration-300 hover:scale-105"
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 mb-8 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Thermometer className="w-5 h-5 text-orange-500" />
            <span>Current Weather</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{destination.weather.temperature}°C</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{destination.weather.condition}</div>
            </div>
            <div className="text-center">
              <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <div className="text-sm text-gray-600 dark:text-gray-300">Humidity</div>
              <div className="font-semibold text-gray-900 dark:text-white">{destination.weather.humidity}%</div>
            </div>
            <div className="text-center">
              <Wind className="w-6 h-6 text-gray-500 dark:text-gray-400 mx-auto mb-1" />
              <div className="text-sm text-gray-600 dark:text-gray-300">Wind Speed</div>
              <div className="font-semibold text-gray-900 dark:text-white">{destination.weather.windSpeed} km/h</div>
            </div>
            <div className="text-center">
              <Calendar className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <div className="text-sm text-gray-600 dark:text-gray-300">Best Time</div>
              <div className="font-semibold text-gray-900 dark:text-white">Oct-Mar</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-black/50 mb-8 border border-gray-100 dark:border-gray-800 animate-fadeInUp">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 hover:scale-105 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
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
                <div className="animate-fadeInUp">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {destination.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{destination.description}</p>
                </div>

                {/* Map Section */}
                <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-green-600" />
                    <span>Location</span>
                  </h4>
                  <div 
                    className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 overflow-hidden cursor-pointer hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300 relative group"
                    onClick={() => window.open(`https://www.google.com/maps/@${destination.coordinates.lat},${destination.coordinates.lng},15z`, '_blank')}
                  >
                    {/* Embedded Google Maps */}
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.123456789012!2d${destination.coordinates.lng}!3d${destination.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1609459200000!5m2!1sen!2sin`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${destination.name} Location`}
                    />
                    
                    {/* Overlay for click indication */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Open in Google Maps</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location details */}
                  <div className="mt-4 flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/50">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Coordinates</p>
                      <p className="font-mono text-sm text-gray-800 dark:text-white">{destination.coordinates.lat}, {destination.coordinates.lng}</p>
                    </div>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination.coordinates.lat},${destination.coordinates.lng}`, '_blank')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Get Directions</span>
                    </button>
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

                {/* <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Videos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.videos.map((_, index) => (
                      <div key={index} className="relative bg-gray-200 rounded-xl h-48 flex items-center justify-center">
                        <Play className="w-12 h-12 text-gray-600 dark:text-gray-400" />
                        <p className="absolute bottom-4 text-sm text-gray-600 dark:text-gray-400">Video {index + 1}</p>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">4.7</span>
                    <span className="text-gray-600 dark:text-gray-400">({destination.reviews.length} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {destination.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{review.user}</h4>
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
                          <p className="text-gray-700 dark:text-white mb-2">{review.comment}</p>
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
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Local Guides</h3>
                   <p className="text-gray-600 dark:text-gray-400">Expert local guides to enhance your experience</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {destination.localGuides.map((guide) => (
                     <div key={guide.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300 hover:scale-105">
                       <div className="p-6">
                         <div className="flex items-start space-x-4 mb-4">
                           <img
                             src={guide.avatar}
                             alt={guide.name}
                             className="w-16 h-16 rounded-full object-cover"
                           />
                           <div className="flex-1">
                             <h4 className="font-bold text-gray-900 dark:text-white text-lg">{guide.name}</h4>
                             <p className="text-sm text-gray-600 dark:text-gray-400">{guide.experience} experience</p>
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
                               <span className="text-sm font-semibold text-gray-900 dark:text-white ml-1">{guide.rating}</span>
                             </div>
                           </div>
                         </div>
                         
                         <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{guide.description}</p>
                         
                         <div className="space-y-3">
                           <div>
                             <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Languages:</p>
                             <div className="flex flex-wrap gap-1">
                               {guide.languages.map((language, idx) => (
                                 <span
                                   key={idx}
                                   className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full"
                                 >
                                   {language}
                                 </span>
                               ))}
                             </div>
                           </div>
                           
                           <div>
                             <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Specialties:</p>
                             <div className="flex flex-wrap gap-1">
                               {guide.specialties.map((specialty, idx) => (
                                 <span
                                   key={idx}
                                   className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full"
                                 >
                                   {specialty}
                                 </span>
                               ))}
                             </div>
                           </div>
                           
                           <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                             <div>
                               <p className="text-lg font-bold text-green-600 dark:text-green-400">{guide.hourlyRate}</p>
                               <p className="text-xs text-gray-600 dark:text-gray-400">per hour</p>
                             </div>
                             <div className="flex space-x-2">
                               <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors duration-200">
                                 Book Now
                               </button>
                               <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200">
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Local Eateries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.localEateries.map((eatery, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300 hover:scale-105">
                      <img
                        src={eatery.image}
                        alt={eatery.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{eatery.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{eatery.cuisine}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= eatery.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{eatery.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{eatery.priceRange}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {eatery.specialties.map((specialty, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full"
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">How to Reach</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.transportation.map((transport, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center space-x-3 mb-4">
                        <transport.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                        <h4 className="font-bold text-gray-900 dark:text-white">{transport.mode}</h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{transport.details}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{transport.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{transport.cost}</span>
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Famous Local Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.famousProducts.map((product, index) => (
                    <Link
                      key={index}
                      to={`/marketplace?product=${product.marketplaceId}`}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300 hover:scale-105"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{product.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">{product.price}</span>
                          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
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
