import HeroSection from '../components/HeroSection';
import QuickSearchBar from '../components/QuickSearchBar';
import FeaturedDestinations from '../components/FeaturedDestinations';
import FeatureHighlights from '../components/FeatureHighlights';

export default function HomePage() {
  return (
    <div className="pt-20 bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <HeroSection />
      <QuickSearchBar />
      <FeaturedDestinations />
      <FeatureHighlights />
    </div>
  );
}