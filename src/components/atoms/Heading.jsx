import React from 'react';
import { motion } from 'framer-motion';

const Heading = ({ level = 1, children, className = '', variants, initial, animate, transition, viewport }) => {
  const Tag = `h${level}`;
  
  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      transition={transition}
      viewport={viewport}
    >
      <Tag className={`font-heading font-bold ${className}`}>
        {children}
      </Tag>
    </motion.div>
  );
};

export default Heading;