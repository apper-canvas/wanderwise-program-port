import React from 'react';
import { motion } from 'framer-motion';
import Button from '../atoms/Button';

const TripSelector = ({ trips, activeTrip, onSelectTrip }) => {
  if (!trips || trips.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        {trips.map((trip) => (
          <Button
            key={trip.id}
            onClick={() => onSelectTrip(trip)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTrip?.id === trip.id
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-surface-700 border border-surface-200 hover:border-primary/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {trip.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TripSelector;