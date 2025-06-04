import React from 'react';
import AppNavigation from '../components/organisms/AppNavigation';
import HeroSection from '../components/organisms/HeroSection';
import FeaturesSection from '../components/organisms/FeaturesSection';
import TripPlannerMain from '../components/organisms/TripPlannerMain';
import AppFooter from '../components/organisms/AppFooter';

const HomePageTemplate = ({ isLoaded }) => {
  return (
    <div className="min-h-screen">
      <AppNavigation />
      <HeroSection isLoaded={isLoaded} />
      <FeaturesSection />
      <section id="planner" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <TripPlannerMain />
        </div>
      </section>
      <AppFooter />
    </div>
  );
};

export default HomePageTemplate;