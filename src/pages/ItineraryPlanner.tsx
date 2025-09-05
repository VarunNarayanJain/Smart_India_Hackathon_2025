import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, DollarSign, Download, Sparkles, Plus, X } from 'lucide-react';
import { useItinerary } from '../context/ItineraryContext';

export default function ItineraryPlanner() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    startCity: '',
    dates: '',
    duration: '',
    interests: [] as string[],
    groupType: '',
    desiredPlaces: [] as string[]
  });
  const [newPlace, setNewPlace] = useState('');
  const { desiredPlaces, addDesiredPlace, removeDesiredPlace } = useItinerary();

  // Debug logging
  console.log('ItineraryPlanner: Component rendered');
  console.log('ItineraryPlanner: Current desiredPlaces from context:', desiredPlaces);

  // Sync local form data with global context
  useEffect(() => {
    console.log('ItineraryPlanner: Syncing form data with context');
    setFormData(prev => ({
      ...prev,
      desiredPlaces: desiredPlaces
    }));
  }, [desiredPlaces]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Log the form data including desired places for debugging
    console.log('Form data submitted:', formData);
    
    // Example of how this data would be sent to LLM:
    // const prompt = `
    //   Create a personalized itinerary for:
    //   - Starting from: ${formData.startCity}
    //   - Dates: ${formData.dates}
    //   - Duration: ${formData.duration} days
    //   - Interests: ${formData.interests.join(', ')}
    //   - Group type: ${formData.groupType}
    //   - Desired places to include: ${formData.desiredPlaces.length > 0 ? formData.desiredPlaces.join(', ') : 'No specific places mentioned'}
    //   
    //   ${formData.desiredPlaces.length > 0 ? 
    //     'Please prioritize including the mentioned places in the itinerary while ensuring a logical route and good time management.' : 
    //     'Please suggest popular and interesting places based on the interests and group type.'
    //   }
    // `;
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 3000);
  };

  const addPlace = () => {
    if (newPlace.trim() && !desiredPlaces.includes(newPlace.trim())) {
      addDesiredPlace(newPlace.trim());
      setNewPlace('');
    }
  };

  const removePlace = (placeToRemove: string) => {
    removeDesiredPlace(placeToRemove);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPlace();
    }
  };

  const sampleItinerary = [
    {
      day: 1,
      location: 'Ranchi to Netarhat',
      image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      activities: [
        { time: '6:00 AM', activity: 'Departure from Ranchi', icon: MapPin },
        { time: '10:30 AM', activity: 'Reach Netarhat, check-in hotel', icon: MapPin },
        { time: '2:00 PM', activity: 'Lunch at local dhaba', icon: Users },
        { time: '4:00 PM', activity: 'Explore Netarhat Hills', icon: MapPin },
        { time: '6:30 PM', activity: 'Watch sunset at sunset point', icon: Clock }
      ],
      recommendation: 'Netarhat offers the best sunrise views in Jharkhand. The cool climate and pine forests make it perfect for nature lovers.'
    },
    {
      day: 2,
      location: 'Netarhat Exploration',
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      activities: [
        { time: '5:00 AM', activity: 'Sunrise viewing at Magnolia Point', icon: Clock },
        { time: '8:00 AM', activity: 'Breakfast at hotel', icon: Users },
        { time: '10:00 AM', activity: 'Visit Netarhat Dam', icon: MapPin },
        { time: '1:00 PM', activity: 'Local tribal village tour', icon: Users },
        { time: '5:00 PM', activity: 'Pine forest walk', icon: MapPin }
      ],
      recommendation: 'Interact with local Oraon tribe members to learn about their sustainable farming practices and traditional crafts.'
    },
    {
      day: 3,
      location: 'Netarhat to Hundru Falls',
      image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      activities: [
        { time: '8:00 AM', activity: 'Check-out and departure', icon: MapPin },
        { time: '11:00 AM', activity: 'Arrive at Hundru Falls', icon: MapPin },
        { time: '12:00 PM', activity: 'Waterfall photography session', icon: Clock },
        { time: '2:00 PM', activity: 'Picnic lunch by the falls', icon: Users },
        { time: '5:00 PM', activity: 'Return to Ranchi', icon: MapPin }
      ],
      recommendation: 'Visit during monsoon season for the most spectacular water flow, but be cautious near the rocky areas.'
    }
  ];

  const interests = ['Nature', 'Adventure', 'Culture', 'Photography', 'Wildlife', 'Spirituality'];

  return (
    <div className="pt-20 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Itinerary Planner</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let our AI create a personalized travel experience just for you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-green-600" />
              <span>Plan Your Journey</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Starting City
                </label>
                <input
                  type="text"
                  value={formData.startCity}
                  onChange={(e) => setFormData({...formData, startCity: e.target.value})}
                  placeholder="e.g., Ranchi, Jamshedpur"
                  className="w-full p-3 border  border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Dates
                  </label>
                  <input
                    type="date"
                    value={formData.dates}
                    onChange={(e) => setFormData({...formData, dates: e.target.value})}
                    className="w-full text-gray-900 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full text-gray-900 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select duration</option>
                    <option value="1">1 Day</option>
                    <option value="2-3">2-3 Days</option>
                    <option value="4-5">4-5 Days</option>
                    <option value="6-7">6-7 Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Interests
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, interests: [...formData.interests, interest]});
                          } else {
                            setFormData({...formData, interests: formData.interests.filter(i => i !== interest)});
                          }
                        }}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Desired Places to Visit <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Know specific places you want to visit? Add them here for a more personalized itinerary.
                </p>
                <div className="text-xs text-gray-500 mb-3">
                  💡 Popular places in Jharkhand: Hundru Falls, Netarhat, Betla National Park, Ranchi Zoo, Dassam Falls, Patratu Valley
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={newPlace}
                    onChange={(e) => setNewPlace(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a desired place (e.g., Hundru Falls, Ranchi Zoo)"
                    className="flex-grow text-gray-900 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={addPlace}
                    className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {desiredPlaces.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    {desiredPlaces.map((place, index) => (
                      <span key={index} className="flex items-center bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                        {place}
                        <button
                          type="button"
                          onClick={() => removePlace(place)}
                          className="ml-1 text-green-800 hover:text-green-900 focus:outline-none"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Type
                </label>
                <select
                  value={formData.groupType}
                  onChange={(e) => setFormData({...formData, groupType: e.target.value})}
                  className="w-full p-3 border text-gray-900 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select group type</option>
                  <option value="solo">Solo Travel</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family with Kids</option>
                  <option value="friends">Friends Group</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating Your Perfect Trip...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Plan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            {!showResults ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-2">Your Itinerary Will Appear Here</h3>
                  <p>Fill out the form and click "Generate Plan" to see your personalized journey</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Your Jharkhand Journey</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-colors duration-200">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>

                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {sampleItinerary.map((day) => (
                    <div key={day.day} className="bg-green-50 rounded-2xl p-6 border border-green-100">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={day.image}
                            alt={day.location}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Day {day.day}</h3>
                          <p className="text-green-600 font-medium">{day.location}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {day.activities.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <activity.icon className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">{activity.time}</span>
                            <span className="text-sm text-gray-700">{activity.activity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white/70 rounded-xl p-4 border-l-4 border-green-600">
                        <p className="text-sm text-gray-700 italic">
                          <strong>Why we recommended this:</strong> {day.recommendation}
                        </p>
                      </div>
                    </div>
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