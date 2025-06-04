import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root
import Paragraph from '../atoms/Paragraph';

const ActivityCard = ({ activity, categoryIcons }) => {
  return (
    <div
      key={activity.id}
      className="bg-surface-50 rounded-lg p-4 border border-surface-100"
    >
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
          <ApperIcon 
            name={categoryIcons[activity.category] || 'MapPin'} 
            size={16} 
            className="text-primary" 
          />
        </div>
        <div className="flex-1">
          <h6 className="font-medium text-surface-800 mb-1">
            {activity.name}
          </h6>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-surface-600">
            {activity.startTime && (
              <span className="flex items-center space-x-1">
                <ApperIcon name="Clock" size={14} />
                <span>{activity.startTime}</span>
              </span>
            )}
            {activity.location?.name && (
              <span className="flex items-center space-x-1">
                <ApperIcon name="MapPin" size={14} />
                <span>{activity.location.name}</span>
              </span>
            )}
            {activity.cost > 0 && (
              <span className="flex items-center space-x-1">
                <ApperIcon name="DollarSign" size={14} />
                <span>${activity.cost}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;