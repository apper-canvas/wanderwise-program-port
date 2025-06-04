import React from 'react';
import { motion } from 'framer-motion';

const ModalOverlay = ({ children, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default ModalOverlay;