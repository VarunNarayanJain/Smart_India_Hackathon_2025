import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, DollarSign, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function QuickSearchBar() {
  const { t } = useLanguage();
  const [tripType, setTripType] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const handleGenerateItinerary = () => {
    navigate('/itinerary', { state: { tripType, duration, budget } });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-black/50 p-8 border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 animate-fadeInUp">
            {t('quickSearch.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Trip Type */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-white">
                <Users className="w-4 h-4 text-green-600" />
                <span>{t('quickSearch.tripType')}</span>
              </label>
              <select 
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:shadow-md"
              >
                <option value="">{t('quickSearch.selectType')}</option>
                <option value="adventure">{t('quickSearch.adventure')}</option>
                <option value="nature">{t('quickSearch.nature')}</option>
                <option value="culture">{t('quickSearch.culture')}</option>
                <option value="relax">{t('quickSearch.relax')}</option>
              </select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-white">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>{t('quickSearch.duration')}</span>
              </label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:shadow-md"
              >
                <option value="">{t('quickSearch.selectDays')}</option>
                <option value="1">1 {t('quickSearch.duration')}</option>
                <option value="2-3">2-3 {t('quickSearch.duration')}</option>
                <option value="4-5">4-5 {t('quickSearch.duration')}</option>
                <option value="6-7">6-7 {t('quickSearch.duration')}</option>
              </select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-white">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>{t('quickSearch.budget')}</span>
              </label>
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:shadow-md"
              >
                <option value="">{t('quickSearch.selectBudget')}</option>
                <option value="low">{t('quickSearch.budgetLow')}</option>
                <option value="medium">{t('quickSearch.budgetMedium')}</option>
                <option value="high">{t('quickSearch.budgetHigh')}</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <button 
                onClick={handleGenerateItinerary}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-2 group"
              >
                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>{t('quickSearch.generate')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}