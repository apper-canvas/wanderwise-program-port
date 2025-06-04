import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root

const SocialLink = ({ iconName }) => {
  return (
    <button className="w-10 h-10 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-surface-700 transition-colors">
      <ApperIcon name={iconName} size={18} />
    </button>
  );
};

export default SocialLink;