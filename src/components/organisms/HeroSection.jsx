import React from 'react';
import { motion } from 'framer-motion';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Button from '../atoms/Button';
import FloatingElement from '../atoms/FloatingElement';

const HeroSection = ({ isLoaded }) => {
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading 
          level={1}
          variants={heroVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
className="text-center mb-16"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl"></div>
            <span className="relative text-4xl md:text-6xl lg:text-7xl text-surface-800 mb-6">
              Plan Your Perfect
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Adventure
              </span>
            </span>
          </div>
        </Heading>
        
        <Paragraph className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto mb-8 leading-relaxed text-center">
          Transform your travel dreams into reality with our intelligent trip planning platform. 
          Organize itineraries, collaborate with friends, and manage budgets—all in one beautiful interface.
        </Paragraph>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button variant="primary" icon="ArrowRight" iconClassName="group-hover:translate-x-1 transition-transform">
              Start Planning
            </Button>
            
<Button variant="outline" icon="Play">
              Watch Demo
            </Button>
          </motion.div>

        {/* Floating Elements */}
        <div className="relative">
          <FloatingElement className="top-10 left-10" style={{ animationDelay: '0s' }}>
            <div className="w-16 h-16 bg-gradient-sunset opacity-20"></div>
          </FloatingElement>
          <FloatingElement className="top-20 right-20" style={{ animationDelay: '1s' }}>
            <div className="w-12 h-12 bg-gradient-ocean opacity-30"></div>
          </FloatingElement>
          <FloatingElement className="bottom-10 left-1/4" style={{ animationDelay: '2s' }}>
            <div className="w-8 h-8 bg-accent opacity-25"></div>
          </FloatingElement>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;