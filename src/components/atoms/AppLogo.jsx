import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root

const AppLogo = ({ name, icon, size, iconClassName, textClassName }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2"
    >
      <div className="w-8 h-8 bg-gradient-travel rounded-lg flex items-center justify-center">
        <ApperIcon name={icon} size={size} className={iconClassName} />
      </div>
      <span className={`text-xl font-heading font-bold ${textClassName}`}>
        {name}
      </span>
    </motion.div>
  );
};

export default AppLogo;