import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon remains at components root
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import Paragraph from '../atoms/Paragraph';
import ActivityCard from '../molecules/ActivityCard';

const ItineraryTimeline = ({ activeTrip, getTripDates, getActivitiesForDate, onAddActivityClick }) => {
  const categoryIcons = {
    sightseeing: 'Camera',
    food: 'UtensilsCrossed',
    transport: 'Car',
    accommodation: 'Bed',
    activity: 'Zap',
    shopping: 'ShoppingBag'
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-card border border-surface-100 overflow-hidden">
        <div className="p-6 border-b border-surface-100">
          <div className="flex justify-between items-center">
            <Heading level={4} className="text-xl text-surface-800">
              {activeTrip ? `${activeTrip.name} Itinerary` : 'Daily Itinerary'}
            </Heading>
            {activeTrip && (
              <Button
                onClick={() => onAddActivityClick(null)}
                variant="secondary"
                icon="Plus"
                iconSize={16}
                className="px-4 py-2"
              >
                Add Activity
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {activeTrip ? (
            <div className="space-y-6">
              {getTripDates().map((date, index) => {
                const dayActivities = getActivitiesForDate(date);
                const isToday = date === format(new Date(), 'yyyy-MM-dd');
                
                return (
                  <motion.div
                    key={date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`border-l-4 pl-6 pb-6 ${
                      isToday ? 'border-primary' : 'border-surface-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Heading level={5} className="font-semibold text-surface-800 flex items-center space-x-2">
                          <span>Day {index + 1}</span>
                          {isToday && (
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                              Today
                            </span>
                          )}
                        </Heading>
                        <Paragraph className="text-surface-600 text-sm">
                          {format(parseISO(date), 'EEEE, MMMM d')}
                        </Paragraph>
                      </div>
                      <Button
                        onClick={() => onAddActivityClick(date)}
                        variant="ghost"
                        icon="Plus"
                        iconSize={20}
                        className="p-0 shadow-none hover:shadow-none"
                      />
                    </div>
                    
                    {dayActivities.length > 0 ? (
                      <div className="space-y-3">
                        {dayActivities.map((activity) => (
                          <ActivityCard 
                            key={activity.id} 
                            activity={activity} 
                            categoryIcons={categoryIcons} 
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-surface-500">
                        <ApperIcon name="Calendar" size={32} className="mx-auto mb-2 opacity-50" />
                        <Paragraph>No activities planned for this day</Paragraph>
                        <Button
                          onClick={() => onAddActivityClick(date)}
                          variant="ghost"
                          className="text-sm mt-1 p-0 shadow-none hover:shadow-none"
                        >
                          Add your first activity
                        </Button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="MapPin" size={32} className="text-primary/50" />
              </div>
              <Heading level={5} className="font-semibold text-surface-800 mb-2">
                No trips yet
              </Heading>
              <Paragraph className="text-surface-600 mb-4">
                Create your first trip to start planning your adventure
              </Paragraph>
              <Button onClick={() => onAddActivityClick(null)} variant="primary">
                Create Trip
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryTimeline;