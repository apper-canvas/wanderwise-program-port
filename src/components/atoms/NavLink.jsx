import React from 'react';
import { motion } from 'framer-motion';

const NavLink = ({ href, children, className = '' }) => {
  return (
    <motion.a 
      href={href} 
      className={`text-surface-600 hover:text-primary transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

export default NavLink;