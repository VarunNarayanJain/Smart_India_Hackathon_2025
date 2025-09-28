import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Clock, Users, Download, Sparkles, Plus, X } from 'lucide-react';
import { useItinerary } from '../context/ItineraryContext';
import { useLanguage } from '../context/LanguageContext';

export default function ItineraryPlanner() {
  const { t } = useLanguage();
  const location = useLocation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
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

  // Auto-populate from QuickSearchBar data
  useEffect(() => {
    if (location.state) {
      const { tripType, duration } = location.state;
      setFormData(prev => ({
        ...prev,
        duration: duration || '',
        groupType: tripType || '',
      }));
      
      // If we have data from quick search, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.state]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Log the form data including desired places for debugging
    console.log('Form data submitted:', formData);
    
    try {
      // Call the backend API to generate itinerary
      const response = await fetch('http://localhost:5000/api/itinerary/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startCity: formData.startCity,
          dates: formData.dates,
          duration: formData.duration,
          interests: formData.interests,
          groupType: formData.groupType,
          desiredPlaces: formData.desiredPlaces
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Itinerary generated successfully:', data);
        // Store the AI-generated itinerary
        setGeneratedItinerary(data.itinerary);
        setShowResults(true);
      } else {
        throw new Error(data.message || 'Failed to generate itinerary');
      }
    } catch (error) {
      console.error('❌ Error generating itinerary:', error);
      alert(`Failed to generate itinerary: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsGenerating(false);
    }
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
    <div className="pt-20 min-h-screen bg-stone-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp">{t('itinerary.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fadeInUp">
            {t('itinerary.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-green-600" />
              <span>{t('itinerary.planJourney')}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t('itinerary.startingCity')}
                </label>
                <input
                  type="text"
                  value={formData.startCity}
                  onChange={(e) => setFormData({...formData, startCity: e.target.value})}
                  placeholder={t('itinerary.startingCityPlaceholder')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('itinerary.travelDates')}
                  </label>
                  <input
                    type="date"
                    value={formData.dates}
                    onChange={(e) => setFormData({...formData, dates: e.target.value})}
                    className="w-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('itinerary.duration')}
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  >
                    <option value="">{t('itinerary.selectDuration')}</option>
                    <option value="1">{t('itinerary.1day')}</option>
                    <option value="2-3">{t('itinerary.2to3days')}</option>
                    <option value="4-5">{t('itinerary.4to5days')}</option>
                    <option value="6-7">{t('itinerary.6to7days')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('itinerary.interests')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <label key={interest} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
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
                        className="w-4 h-4 text-green-600 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('itinerary.desiredPlaces')} <span className="text-gray-500 dark:text-gray-400 text-xs">{t('itinerary.optional')}</span>
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {t('itinerary.desiredPlacesDesc')}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {t('itinerary.popularPlaces')}
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={newPlace}
                    onChange={(e) => setNewPlace(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('itinerary.addPlace')}
                    className="flex-grow text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  />
                  <button
                    type="button"
                    onClick={addPlace}
                    className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {desiredPlaces.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    {desiredPlaces.map((place, index) => (
                      <span key={index} className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-2.5 py-0.5 rounded-full">
                        {place}
                        <button
                          type="button"
                          onClick={() => removePlace(place)}
                          className="ml-1 text-green-800 dark:text-green-200 hover:text-green-900 dark:hover:text-green-100 focus:outline-none"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('itinerary.groupType')}
                </label>
                <select
                  value={formData.groupType}
                  onChange={(e) => setFormData({...formData, groupType: e.target.value})}
                  className="w-full p-3 border text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                >
                  <option value="">{t('itinerary.selectGroupType')}</option>
                  <option value="solo">{t('itinerary.solo')}</option>
                  <option value="couple">{t('itinerary.couple')}</option>
                  <option value="family">{t('itinerary.family')}</option>
                  <option value="friends">{t('itinerary.friends')}</option>
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
                    <span>{t('itinerary.generating')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{t('itinerary.generatePlan')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            {!showResults ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">{t('itinerary.willAppear')}</h3>
                  <p>{t('itinerary.fillForm')}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('itinerary.yourJourney')}</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105">
                    <Download className="w-4 h-4" />
                    <span>{t('itinerary.downloadPDF')}</span>
                  </button>
                </div>

                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {generatedItinerary ? (
                    <>
                      {/* AI Generated Content */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800 mb-6">
                        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center space-x-2">
                          <Sparkles className="w-5 h-5" />
                          <span>{t('itinerary.aiGenerated')}</span>
                        </h3>
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans">
                            {generatedItinerary.rawContent}
                          </pre>
                        </div>
                      </div>

                      {/* Structured Days */}
                      {generatedItinerary.structuredDays && generatedItinerary.structuredDays.length > 0 && (
                        generatedItinerary.structuredDays.map((day: any) => (
                          <div key={day.day} className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800">
                            <div className="flex items-start space-x-4 mb-4">
                              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                <img
                                  src={day.image}
                                  alt={day.location}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('itinerary.day')} {day.day}</h3>
                                <p className="text-green-600 dark:text-green-400 font-medium">{day.location}</p>
                              </div>
                            </div>

                            <div className="space-y-3 mb-4">
                              {day.activities.map((activity: any, index: number) => (
                                <div key={index} className="flex items-center space-x-3">
                                  <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  <span className="text-sm font-medium text-green-700 dark:text-green-300">{activity.time}</span>
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{activity.activity}</span>
                                </div>
                              ))}
                            </div>

                            <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border-l-4 border-green-600 dark:border-green-400">
                              <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                <strong>Why we recommended this:</strong> {day.recommendation}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  ) : (
                    sampleItinerary.map((day) => (
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
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('itinerary.day')} {day.day}</h3>
                          <p className="text-green-600 dark:text-green-400 font-medium">{day.location}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {day.activities.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <activity.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">{activity.time}</span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{activity.activity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border-l-4 border-green-600 dark:border-green-400">
                        <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                          <strong>{t('itinerary.whyRecommended')}</strong> {day.recommendation}
                        </p>
                      </div>
                    </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}