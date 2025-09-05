import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItineraryPlanner from './pages/ItineraryPlanner';
import DestinationExplorer from './pages/DestinationExplorer';
import DestinationDetail from './pages/DestinationDetail';
import Chatbot from './pages/Chatbot';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import { ItineraryProvider } from './context/ItineraryContext';

function App() {
  return (
    <ItineraryProvider>
      <Router>
        <div className="min-h-screen bg-neutral-900 text-neutral-100">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/itinerary" element={<ItineraryPlanner />} />
              <Route path="/destinations" element={<DestinationExplorer />} />
              <Route path="/destination/:id" element={<DestinationDetail />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ItineraryProvider>
  );
}

export default App;