import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root
import AppLogo from '../atoms/AppLogo';
import SocialLink from '../molecules/SocialLink';
import FooterNavLink from '../molecules/FooterNavLink';

const AppFooter = () => {
  return (
    <footer className="bg-surface-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <AppLogo 
              name="Wanderwise" 
              icon="Compass" 
              size={20} 
              iconClassName="text-white" 
              textClassName="text-white" 
            />
            <p className="text-surface-300 mb-4 max-w-md">
              Making travel planning effortless and enjoyable. Turn your wanderlust into well-organized adventures.
            </p>
            <div className="flex space-x-4">
              <SocialLink iconName="Twitter" />
              <SocialLink iconName="Instagram" />
              <SocialLink iconName="Facebook" />
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-surface-300">
              <FooterNavLink>Features</FooterNavLink>
              <FooterNavLink>Pricing</FooterNavLink>
              <FooterNavLink>Mobile App</FooterNavLink>
              <FooterNavLink>Integrations</FooterNavLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-surface-300">
              <FooterNavLink>Help Center</FooterNavLink>
              <FooterNavLink>Contact Us</FooterNavLink>
              <FooterNavLink>Privacy Policy</FooterNavLink>
              <FooterNavLink>Terms of Service</FooterNavLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-surface-800 mt-8 pt-8 text-center text-surface-400">
          <p>&copy; 2024 Wanderwise. All rights reserved. Built with ❤️ for travelers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;