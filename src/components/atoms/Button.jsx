import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  icon, 
  iconSize = 20, 
  iconClassName = '',
  type = 'button',
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  ...props 
}) => {
  const baseClasses = "px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-dark text-white",
    secondary: "bg-secondary text-white",
    outline: "bg-white/80 backdrop-blur-sm text-surface-700 border border-surface-200 hover:border-primary/30 hover:bg-white",
    ghost: "text-primary hover:text-primary-dark",
    footer: "w-10 h-10 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-surface-700 transition-colors"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {icon && <ApperIcon name={icon} size={iconSize} className={iconClassName} />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;