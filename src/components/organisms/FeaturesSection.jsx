import React from 'react';
import { motion } from 'framer-motion';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import FeatureCard from '../molecules/FeatureCard';

const FeaturesSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: "Calendar",
      title: "Smart Itinerary Builder",
      description: "Create detailed day-by-day plans with our intuitive timeline interface"
    },
    {
      icon: "Users",
      title: "Collaborative Planning", 
      description: "Plan together with friends and family in real-time"
    },
    {
      icon: "PiggyBank",
      title: "Budget Tracking",
      description: "Keep your expenses organized and within budget"
    },
    {
      icon: "MapPin",
      title: "Interactive Maps",
      description: "Visualize your journey with integrated mapping"
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-surface-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heading level={2} className="text-3xl md:text-4xl text-surface-800 mb-4">
            Everything you need to plan amazing trips
          </Heading>
          <Paragraph className="text-lg text-surface-600 max-w-2xl mx-auto">
            From initial inspiration to final boarding pass, we've got every aspect of your journey covered
          </Paragraph>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              variants={cardVariants}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;