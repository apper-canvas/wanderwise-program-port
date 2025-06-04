import React from 'react';
import AppLogo from '../atoms/AppLogo';
import NavLinks from '../molecules/NavLinks';

const AppNavigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <AppLogo 
            name="Wanderwise" 
            icon="Compass" 
            size={20} 
            iconClassName="text-white" 
            textClassName="text-surface-800" 
          />
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default AppNavigation;