import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, DollarSign, Users } from 'lucide-react';

export default function QuickSearchBar() {
  const [tripType, setTripType] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const handleGenerateItinerary = () => {
    navigate('/itinerary', { state: { tripType, duration, budget } });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Start Your Jharkhand Adventure
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Trip Type */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 text-green-600" />
                <span>Type of Trip</span>
              </label>
              <select 
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="">Select type</option>
                <option value="adventure">Adventure</option>
                <option value="nature">Nature</option>
                <option value="culture">Culture</option>
                <option value="relax">Relax</option>
              </select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>Duration</span>
              </label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="">Select days</option>
                <option value="1">1 Day</option>
                <option value="2-3">2-3 Days</option>
                <option value="4-5">4-5 Days</option>
                <option value="6-7">6-7 Days</option>
              </select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>Budget</span>
              </label>
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="">Select budget</option>
                <option value="low">Low (₹5,000 - ₹15,000)</option>
                <option value="medium">Medium (₹15,000 - ₹30,000)</option>
                <option value="high">High (₹30,000+)</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <button 
                onClick={handleGenerateItinerary}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Generate Itinerary</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}