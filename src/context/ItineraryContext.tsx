import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ItineraryContextType {
  desiredPlaces: string[];
  addDesiredPlace: (place: string) => void;
  removeDesiredPlace: (place: string) => void;
  clearDesiredPlaces: () => void;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};

interface ItineraryProviderProps {
  children: ReactNode;
}

export const ItineraryProvider: React.FC<ItineraryProviderProps> = ({ children }) => {
  console.log('ItineraryProvider: Initializing context');
  
  const [desiredPlaces, setDesiredPlaces] = useState<string[]>(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem('desiredPlaces');
    const parsed = saved ? JSON.parse(saved) : [];
    console.log('ItineraryProvider: Loaded from localStorage:', parsed);
    return parsed;
  });

  // Save to localStorage whenever desiredPlaces changes
  useEffect(() => {
    console.log('ItineraryProvider: Saving to localStorage:', desiredPlaces);
    localStorage.setItem('desiredPlaces', JSON.stringify(desiredPlaces));
  }, [desiredPlaces]);

  const addDesiredPlace = (place: string) => {
    console.log('Context: Adding place:', place);
    console.log('Context: Current places:', desiredPlaces);
    if (!desiredPlaces.includes(place)) {
      setDesiredPlaces(prev => {
        console.log('Context: Updating places from', prev, 'to', [...prev, place]);
        return [...prev, place];
      });
    } else {
      console.log('Context: Place already exists:', place);
    }
  };

  const removeDesiredPlace = (place: string) => {
    setDesiredPlaces(prev => prev.filter(p => p !== place));
  };

  const clearDesiredPlaces = () => {
    setDesiredPlaces([]);
  };

  const value = {
    desiredPlaces,
    addDesiredPlace,
    removeDesiredPlace,
    clearDesiredPlaces,
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};
