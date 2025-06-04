import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center space-x-3">
        <div className="animate-spin w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full"></div>
        <span className="text-surface-600">{message}</span>
      </div>
    </div>
  );
};

export default Loader;