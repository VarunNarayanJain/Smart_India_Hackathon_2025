import { useState } from 'react';
import { BarChart3, MapPin, TrendingUp, CheckCircle, XCircle, User, Calendar, PhoneCall, AlertTriangle, Heart, Edit3, Navigation, Star, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const userProfile = {
    name: 'Rahul Sharma',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    verified: true,
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    preferences: ['Nature', 'Culture', 'Local Food']
  };

  const analyticsData = {
    totalItineraries: 1247,
    activeGuides: 68,
    verifiedArtisans: 145,
    satisfactionRate: 94
  };

  const topDestinations = [
    { name: 'Netarhat', visits: 89, growth: 12 },
    { name: 'Hundru Falls', visits: 76, growth: 8 },
    { name: 'Betla National Park', visits: 67, growth: 15 },
    { name: 'Deoghar', visits: 54, growth: 5 },
    { name: 'Hazaribagh', visits: 43, growth: 18 }
  ];

  // removed verification workflow state

  type Rateable = {
    id: number;
    name: string;
    category: 'Guide' | 'Homestay' | 'Artisan';
    location: string;
    image: string;
  };

  const rateables: Rateable[] = [
    { id: 11, name: 'Priya Kumari', category: 'Guide', location: 'Gumla', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    { id: 12, name: 'Forest Nest Homestay', category: 'Homestay', location: 'Netarhat', image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    { id: 13, name: 'Santosh Mahato', category: 'Artisan', location: 'Saraikela', image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
  ];

  type RatingState = {
    [key: number]: { stars: number; honest: boolean; badge: boolean; comment: string };
  };
  const [ratings, setRatings] = useState<RatingState>({});

  const updateRating = (id: number, partial: Partial<RatingState[number]>) => {
    setRatings((prev) => {
      const base = prev[id] || { stars: 0, honest: false, badge: false, comment: '' };
      return {
        ...prev,
        [id]: { ...base, ...partial },
      };
    });
  };

  const handleEditProfile = () => {
    try { navigate('/profile'); } catch (e) { /* no-op if routing not set */ }
  };

  const handleStartPlanning = () => {
    try { navigate('/plan'); } catch (e) { /* no-op if routing not set */ }
  };

  const savedItineraries = [
    { id: 101, title: 'Weekend at Netarhat', days: 2 },
    { id: 102, title: 'Wildlife at Betla', days: 3 },
  ];

  const culturalEvents = [
    { id: 1, name: 'Sarhul Festival', date: 'Apr 14', location: 'Ranchi' },
    { id: 2, name: 'Karma Puja', date: 'Aug 28', location: 'Hazaribagh' },
    { id: 3, name: 'Dokra Craft Fair', date: 'Dec 10', location: 'Saraikela' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-stone-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp">User Dashboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fadeInUp">Your profile, plans, safety and community tools</p>
        </div>

        {/* Profile and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 lg:col-span-1 hover:shadow-xl transition-all duration-500 animate-fadeInUp">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-green-500">
                <img src={userProfile.image} alt={userProfile.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h2>
                  {userProfile.verified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{userProfile.verified ? 'Verified' : 'Pending Verification'}</div>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"><User className="w-4 h-4" /><span>{userProfile.email}</span></div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"><PhoneCall className="w-4 h-4" /><span>{userProfile.phone}</span></div>
              <div className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Preferences: </span>
                <span>{userProfile.preferences.join(', ')}</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button onClick={handleEditProfile} className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button onClick={handleStartPlanning} className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Navigation className="w-4 h-4" />
                <span>Start Planning a Trip</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 lg:col-span-2 hover:shadow-xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <span>Saved Itineraries / Wishlist</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedItineraries.map((it) => (
                <div key={it.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{it.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{it.days} days</div>
                  </div>
                  <button className="text-green-600 dark:text-green-400 font-medium hover:underline transition-colors duration-300" onClick={handleStartPlanning}>Open</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Analytics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Key Metrics */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span>Platform Analytics</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 py-2 rounded-lg transition-all duration-300">
                  <span className="text-gray-600 dark:text-gray-300">Total Itineraries</span>
                  <span className="text-2xl font-bold text-green-600">{analyticsData.totalItineraries}</span>
                </div>
                <div className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 py-2 rounded-lg transition-all duration-300">
                  <span className="text-gray-600 dark:text-gray-300">Active Guides</span>
                  <span className="text-2xl font-bold text-orange-600">{analyticsData.activeGuides}</span>
                </div>
                <div className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 py-2 rounded-lg transition-all duration-300">
                  <span className="text-gray-600 dark:text-gray-300">Verified Artisans</span>
                  <span className="text-2xl font-bold text-amber-600">{analyticsData.verifiedArtisans}</span>
                </div>
                <div className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 py-2 rounded-lg transition-all duration-300">
                  <span className="text-gray-600 dark:text-gray-300">Satisfaction Rate</span>
                  <span className="text-2xl font-bold text-blue-600">{analyticsData.satisfactionRate}%</span>
                </div>
              </div>
            </div>

            {/* Top Destinations */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Top Destinations</span>
              </h3>
              
              <div className="space-y-3">
                {topDestinations.map((dest, index) => (
                  <div key={dest.name} className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 py-2 rounded-lg transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{dest.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{dest.visits}</div>
                      <div className="text-xs text-green-600 dark:text-green-400">+{dest.growth}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Events */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span>Cultural Events Calendar</span>
              </h3>
              <div className="space-y-3">
                {culturalEvents.map((ev) => (
                  <div key={ev.id} className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 py-2 rounded-lg transition-all duration-300">
                    <div className="space-y-0.5">
                      <div className="font-medium text-gray-900 dark:text-white">{ev.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{ev.date} • {ev.location}</div>
                    </div>
                    <button className="text-green-600 dark:text-green-400 text-sm font-medium hover:underline transition-colors duration-300" onClick={handleStartPlanning}>Add</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Guidelines */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '700ms' }}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span>Safety Guidelines (Jharkhand)</span>
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>Respect local customs and seek permission before photographs.</li>
                <li>Travel with registered guides in remote forest areas.</li>
                <li>Keep emergency numbers handy and share itinerary with family.</li>
                <li>Carry cash for rural regions; connectivity may be limited.</li>
              </ul>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <PhoneCall className="w-5 h-5 text-blue-600" />
                <span>Emergency Contacts</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <a href="tel:112" className="px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-all duration-300">Police: 112</a>
                <a href="tel:108" className="px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium hover:bg-green-100 dark:hover:bg-green-800/50 transition-all duration-300">Ambulance: 108</a>
                <a href="tel:1091" className="px-4 py-3 rounded-xl bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 font-medium hover:bg-pink-100 dark:hover:bg-pink-800/50 transition-all duration-300">Women Helpline: 1091</a>
              </div>
            </div>
          </div>

          {/* Right - Ratings & Badges */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '700ms' }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Rate Your Guides, Homestays, and Artisans</span>
              </h2>

              <div className="space-y-6">
                {rateables.map((item) => {
                  const r = ratings[item.id] || { stars: 0, honest: false, badge: false, comment: '' };
                  return (
                    <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                              <p className="text-green-600 dark:text-green-400 font-medium">{item.category}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="w-3 h-3" />
                              <span>{item.location}</span>
                          </div>
                        </div>
                        
                          {/* Stars */}
                          <div className="flex items-center space-x-2 mb-4">
                            {[1,2,3,4,5].map((s) => (
                              <button
                                key={s}
                                className={`p-2 rounded-full ${s <= r.stars ? 'text-yellow-500' : 'text-gray-300'}`}
                                onClick={() => updateRating(item.id, { stars: s })}
                                aria-label={`Rate ${s} star`}
                              >
                                <Star className="w-6 h-6" />
                              </button>
                            ))}
                            <span className="text-sm text-gray-600 dark:text-gray-400">{r.stars} / 5</span>
                          </div>

                          {/* Honesty toggle and badge */}
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <button
                              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${r.honest ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                              onClick={() => updateRating(item.id, { honest: !r.honest })}
                            >
                              {r.honest ? 'Marked Honest ✅' : 'Mark as Honest'}
                            </button>

                            <button
                              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${r.badge ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                              onClick={() => updateRating(item.id, { badge: !r.badge })}
                            >
                              <BadgeCheck className="w-4 h-4" />
                              <span>{r.badge ? 'Badge Granted' : 'Give Community Badge'}</span>
                            </button>
                        </div>
                        
                          {/* Comment */}
                          <div className="mb-4">
                            <textarea
                              value={r.comment}
                              onChange={(e) => updateRating(item.id, { comment: e.target.value })}
                              placeholder="Share your experience (optional)"
                              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                              rows={2}
                            />
                          </div>
                          
                          {/* Submit */}
                          <div className="flex justify-end">
                            <button 
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium"
                              onClick={() => alert('Thanks for your feedback!')}
                            >
                              Submit Rating
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Removed Verification Certificate Modal */}
      </div>
    </div>
  );
}