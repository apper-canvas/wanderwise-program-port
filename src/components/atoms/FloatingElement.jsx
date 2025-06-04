import React from 'react';

const FloatingElement = ({ className, style }) => {
  return (
    <div 
      className={`absolute animate-float ${className}`} 
      style={style}
    >
      {/* Actual floating element content */}
      <div className="w-full h-full rounded-full"></div>
    </div>
  );
};

export default FloatingElement;