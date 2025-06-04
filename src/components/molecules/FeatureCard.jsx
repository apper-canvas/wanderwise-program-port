import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

const FeatureCard = ({ icon, title, description, index, variants, viewport }) => {
  return (
    <motion.div
      key={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={viewport}
      className="group"
    >
      <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 transform group-hover:-translate-y-2 border border-surface-100">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <ApperIcon name={icon} size={24} className="text-primary" />
        </div>
        <Heading level={3} className="text-xl text-surface-800 mb-2">
          {title}
        </Heading>
        <Paragraph className="text-surface-600 leading-relaxed">
          {description}
        </Paragraph>
      </div>
    </motion.div>
  );
};

export default FeatureCard;