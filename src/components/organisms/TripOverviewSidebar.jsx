import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Button from '../atoms/Button';
import TripStatsItem from '../molecules/TripStatsItem';
import QuickActionButton from '../molecules/QuickActionButton';

const TripOverviewSidebar = ({ activeTrip, activitiesCount, getTripDates, onNewTripClick, onAddActivityClick }) => {
  return (
    <div className="space-y-6">
      {/* Trip Stats */}
      {activeTrip && (
        <div className="bg-white rounded-2xl shadow-card border border-surface-100 p-6">
          <Heading level={4} className="font-semibold text-surface-800 mb-4">
            Trip Overview
          </Heading>
          
          <div className="space-y-4">
            <TripStatsItem icon="Calendar" label="Duration" value={`${getTripDates().length} days`} />
            <TripStatsItem icon="MapPin" label="Destinations" value={activeTrip.destinations?.length || 0} />
            <TripStatsItem icon="Zap" label="Activities" value={activitiesCount} />
            <TripStatsItem icon="DollarSign" label="Budget" value={`$${activeTrip.budget || 0}`} isLast={true} />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-card border border-surface-100 p-6">
        <Heading level={4} className="font-semibold text-surface-800 mb-4">
          Quick Actions
        </Heading>
        
        <div className="space-y-3">
          <QuickActionButton
            onClick={onNewTripClick}
            icon="Plus"
            iconBgClass="bg-primary/10"
            iconClass="text-primary"
            text="Create New Trip"
            textClass="group-hover:text-primary"
          />
          
          {activeTrip && (
            <QuickActionButton
              onClick={() => onAddActivityClick(null)}
              icon="Zap"
              iconBgClass="bg-secondary/10"
              iconClass="text-secondary"
              text="Add Activity"
              textClass="group-hover:text-secondary"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TripOverviewSidebar;