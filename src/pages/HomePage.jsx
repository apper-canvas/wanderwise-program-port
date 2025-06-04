import React, { useState, useEffect } from 'react';
import HomePageTemplate from '../components/templates/HomePageTemplate';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return <HomePageTemplate isLoaded={isLoaded} />;
};

export default HomePage;