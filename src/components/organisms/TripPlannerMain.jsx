import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, addDays, parseISO } from 'date-fns';

import tripService from '../../services/api/tripService';
import itineraryService from '../../services/api/itineraryService';
import activityService from '../../services/api/activityService';

import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Button from '../atoms/Button';
import Loader from '../atoms/Loader';

import CreateTripForm from './CreateTripForm';
import AddActivityForm from './AddActivityForm';
import TripSelector from './TripSelector';
import ItineraryTimeline from './ItineraryTimeline';
import TripOverviewSidebar from './TripOverviewSidebar';

const TripPlannerMain = () => {
  // Trip Management State
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Active Trip State
  const [activeTrip, setActiveTrip] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [activities, setActivities] = useState([]);
  
  // Form States
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [selectedActivityDate, setSelectedActivityDate] = useState(null);

  // Load initial data
  useEffect(() => {
    loadTrips();
  }, []);

  // Load activities when active trip or itineraries change
  useEffect(() => {
    if (activeTrip && itineraries.length > 0) {
      loadActivities();
    }
  }, [activeTrip, itineraries]);

  const loadTrips = async () => {
    setLoading(true);
    try {
      const result = await tripService.getAll();
      setTrips(result || []);
      if (result?.length > 0) {
        setActiveTrip(result[0]);
        await loadItineraries(result[0].id);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  const loadItineraries = async (tripId) => {
    try {
      const result = await itineraryService.getAll();
      const tripItineraries = result?.filter(itinerary => itinerary.tripId === tripId) || [];
      setItineraries(tripItineraries);
    } catch (err) {
      console.error("Failed to load itineraries:", err);
    }
  };

  const loadActivities = async () => {
    try {
      const result = await activityService.getAll();
      setActivities(result || []);
    } catch (err) {
      console.error("Failed to load activities:", err);
    }
  };

  const createDefaultItineraries = async (trip) => {
    try {
      const startDate = parseISO(trip.startDate);
      const endDate = parseISO(trip.endDate);
      const daysBetween = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      
      const newItineraries = [];
      for (let i = 0; i < daysBetween; i++) {
        const date = addDays(startDate, i);
        const itinerary = await itineraryService.create({
          tripId: trip.id,
          date: format(date, 'yyyy-MM-dd'),
          activities: [],
          notes: ''
        });
        newItineraries.push(itinerary);
      }
      
      setItineraries(newItineraries);
    } catch (err) {
      console.error("Failed to create itineraries:", err);
    }
  };

  const handleCreateTrip = async (tripForm) => {
    if (!tripForm.name || !tripForm.startDate || !tripForm.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const newTrip = {
        ...tripForm,
        destinations: tripForm.destinations.length > 0 ? tripForm.destinations : ['New Destination'],
        participants: [],
        budget: parseFloat(tripForm.budget) || 0,
        status: 'planning'
      };

      const createdTrip = await tripService.create(newTrip);
      setTrips(prev => [createdTrip, ...prev]);
      setActiveTrip(createdTrip);
      
      // Create default itineraries for each day
      await createDefaultItineraries(createdTrip);
      
      setShowCreateForm(false);
      toast.success("Trip created successfully!");
    } catch (err) {
      toast.error("Failed to create trip");
    }
  };

  const handleAddActivity = async (activityForm, date) => {
    if (!activityForm.name || !date) {
      toast.error("Please fill in activity name and select a date");
      return;
    }

    try {
      const newActivity = {
        ...activityForm,
        location: { name: activityForm.location || 'Location TBD' },
        cost: parseFloat(activityForm.cost) || 0
      };

      const createdActivity = await activityService.create(newActivity);
      setActivities(prev => [...prev, createdActivity]);
      
      // Update the corresponding itinerary
      const targetItinerary = itineraries.find(it => it.date === date);
      if (targetItinerary) {
        const updatedItinerary = {
          ...targetItinerary,
          activities: [...(targetItinerary.activities || []), createdActivity.id]
        };
        await itineraryService.update(targetItinerary.id, updatedItinerary);
        setItineraries(prev => prev.map(it => 
          it.id === targetItinerary.id ? updatedItinerary : it
        ));
      }
      
      setShowActivityForm(false);
      setSelectedActivityDate(null);
      toast.success("Activity added successfully!");
    } catch (err) {
      toast.error("Failed to add activity");
    }
  };

  const getActivitiesForDate = useCallback((date) => {
    const itinerary = itineraries.find(it => it.date === date);
    if (!itinerary?.activities) return [];
    
    return activities.filter(activity => 
      itinerary.activities.includes(activity.id)
    );
  }, [itineraries, activities]);

  const getTripDates = useCallback(() => {
    if (!activeTrip?.startDate || !activeTrip?.endDate) return [];
    
    const startDate = parseISO(activeTrip.startDate);
    const endDate = parseISO(activeTrip.endDate);
    const dates = [];
    
    for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
      dates.push(format(date, 'yyyy-MM-dd'));
    }
    
    return dates;
  }, [activeTrip]);

  const handleSelectTrip = async (trip) => {
    setActiveTrip(trip);
    await loadItineraries(trip.id);
  };

  const handleAddActivityClick = (date) => {
    setSelectedActivityDate(date);
    setShowActivityForm(true);
  };

  if (loading) {
    return <Loader message="Loading your trips..." />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Heading level={3} className="text-2xl text-surface-800 mb-2">
            Trip Planner
          </Heading>
          <Paragraph className="text-surface-600">
            {trips.length === 0 ? "Create your first trip to get started" : `Managing ${trips.length} trip${trips.length === 1 ? '' : 's'}`}
          </Paragraph>
        </div>
        
        <Button
          onClick={() => setShowCreateForm(true)}
          variant="primary"
          icon="Plus"
          className="px-6 py-3"
        >
          New Trip
        </Button>
      </div>

      <TripSelector trips={trips} activeTrip={activeTrip} onSelectTrip={handleSelectTrip} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ItineraryTimeline 
          activeTrip={activeTrip}
          getTripDates={getTripDates}
          getActivitiesForDate={getActivitiesForDate}
          onAddActivityClick={handleAddActivityClick}
        />

        <TripOverviewSidebar 
          activeTrip={activeTrip}
          activitiesCount={activities.length}
          getTripDates={getTripDates}
          onNewTripClick={() => setShowCreateForm(true)}
          onAddActivityClick={handleAddActivityClick}
        />
      </div>

      <CreateTripForm 
        show={showCreateForm} 
        onClose={() => setShowCreateForm(false)} 
        onSubmit={handleCreateTrip} 
      />
      <AddActivityForm 
        show={showActivityForm} 
        onClose={() => {
          setShowActivityForm(false);
          setSelectedActivityDate(null);
        }}
        onSubmit={handleAddActivity}
        tripDates={getTripDates()}
        initialDate={selectedActivityDate}
      />
    </div>
  );
};

export default TripPlannerMain;