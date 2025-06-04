import React from 'react';
import { motion } from 'framer-motion';
import NavLink from '../atoms/NavLink';
import Button from '../atoms/Button';

const NavLinks = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="hidden md:flex items-center space-x-8"
    >
      <NavLink href="#features">
        Features
      </NavLink>
      <NavLink href="#planner">
        Plan Trip
      </NavLink>
      <Button variant="primary" className="px-4 py-2">
        Get Started
      </Button>
    </motion.div>
  );
};

export default NavLinks;