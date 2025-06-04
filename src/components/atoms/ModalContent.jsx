import React from 'react';
import { motion } from 'framer-motion';

const ModalContent = ({ children, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-2xl border border-surface-200 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
    >
      {children}
    </motion.div>
  );
};

export default ModalContent;