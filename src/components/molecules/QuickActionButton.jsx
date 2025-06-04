import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root

const QuickActionButton = ({ onClick, icon, iconBgClass, iconClass, text, textClass }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center space-x-3 p-3 rounded-lg border border-surface-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${iconBgClass}`}>
        <ApperIcon name={icon} size={16} className={iconClass} />
      </div>
      <span className={`text-surface-700 group-hover:text-primary transition-colors ${textClass}`}>
        {text}
      </span>
    </button>
  );
};

export default QuickActionButton;