import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';

const ModalHeader = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Heading level={3} className="text-xl text-surface-800">
        {title}
      </Heading>
      <Button 
        variant="ghost" 
        onClick={onClose} 
        className="text-surface-400 hover:text-surface-600 p-0 shadow-none hover:shadow-none"
        icon="X"
        iconSize={24}
      />
    </div>
  );
};

export default ModalHeader;