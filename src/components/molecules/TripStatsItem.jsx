import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root

const TripStatsItem = ({ icon, label, value, isLast = false }) => {
  return (
    <div className={`flex items-center justify-between py-3 ${!isLast ? 'border-b border-surface-100' : ''}`}>
      <div className="flex items-center space-x-2">
        <ApperIcon name={icon} size={16} className="text-surface-500" />
        <span className="text-surface-600">{label}</span>
      </div>
      <span className="font-medium text-surface-800">
        {value}
      </span>
    </div>
  );
};

export default TripStatsItem;