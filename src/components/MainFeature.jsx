import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, addDays, parseISO } from 'date-fns'
import ApperIcon from './ApperIcon'
import tripService from '../services/api/tripService'
import itineraryService from '../services/api/itineraryService'
import activityService from '../services/api/activityService'

const MainFeature = () => {
  // Trip Management State
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Active Trip State
  const [activeTrip, setActiveTrip] = useState(null)
  const [itineraries, setItineraries] = useState([])
  const [activities, setActivities] = useState([])
  
  // Form States
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  
  // Form Data
  const [tripForm, setTripForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    destinations: [],
    budget: ''
  })
  
  const [activityForm, setActivityForm] = useState({
    name: '',
    location: '',
    startTime: '',
    duration: 60,
    cost: '',
    category: 'sightseeing'
  })

  // Load initial data
  useEffect(() => {
    loadTrips()
  }, [])

  // Load activities when active trip or itineraries change
  useEffect(() => {
    if (activeTrip && itineraries.length > 0) {
      loadActivities()
    }
  }, [activeTrip, itineraries])

  const loadTrips = async () => {
    setLoading(true)
    try {
      const result = await tripService.getAll()
      setTrips(result || [])
      if (result?.length > 0) {
        setActiveTrip(result[0])
        await loadItineraries(result[0].id)
      }
    } catch (err) {
      setError(err.message)
      toast.error("Failed to load trips")
    } finally {
      setLoading(false)
    }
  }

  const loadItineraries = async (tripId) => {
    try {
      const result = await itineraryService.getAll()
      const tripItineraries = result?.filter(itinerary => itinerary.tripId === tripId) || []
      setItineraries(tripItineraries)
    } catch (err) {
      console.error("Failed to load itineraries:", err)
    }
  }

  const loadActivities = async () => {
    try {
      const result = await activityService.getAll()
      setActivities(result || [])
    } catch (err) {
      console.error("Failed to load activities:", err)
    }
  }

  const handleCreateTrip = async (e) => {
    e.preventDefault()
    if (!tripForm.name || !tripForm.startDate || !tripForm.endDate) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const newTrip = {
        ...tripForm,
        destinations: tripForm.destinations.length > 0 ? tripForm.destinations : ['New Destination'],
        participants: [],
        budget: parseFloat(tripForm.budget) || 0,
        status: 'planning'
      }

      const createdTrip = await tripService.create(newTrip)
      setTrips(prev => [createdTrip, ...prev])
      setActiveTrip(createdTrip)
      
      // Create default itineraries for each day
      await createDefaultItineraries(createdTrip)
      
      setTripForm({ name: '', startDate: '', endDate: '', destinations: [], budget: '' })
      setShowCreateForm(false)
      toast.success("Trip created successfully!")
    } catch (err) {
      toast.error("Failed to create trip")
    }
  }

  const createDefaultItineraries = async (trip) => {
    try {
      const startDate = parseISO(trip.startDate)
      const endDate = parseISO(trip.endDate)
      const daysBetween = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
      
      const newItineraries = []
      for (let i = 0; i < daysBetween; i++) {
        const date = addDays(startDate, i)
        const itinerary = await itineraryService.create({
          tripId: trip.id,
          date: format(date, 'yyyy-MM-dd'),
          activities: [],
          notes: ''
        })
        newItineraries.push(itinerary)
      }
      
      setItineraries(newItineraries)
    } catch (err) {
      console.error("Failed to create itineraries:", err)
    }
  }

  const handleAddActivity = async (e) => {
    e.preventDefault()
    if (!activityForm.name || !selectedDate) {
      toast.error("Please fill in activity name and select a date")
      return
    }

    try {
      const newActivity = {
        ...activityForm,
        location: { name: activityForm.location || 'Location TBD' },
        cost: parseFloat(activityForm.cost) || 0
      }

      const createdActivity = await activityService.create(newActivity)
      setActivities(prev => [...prev, createdActivity])
      
      // Update the corresponding itinerary
      const targetItinerary = itineraries.find(it => it.date === selectedDate)
      if (targetItinerary) {
        const updatedItinerary = {
          ...targetItinerary,
          activities: [...(targetItinerary.activities || []), createdActivity.id]
        }
        await itineraryService.update(targetItinerary.id, updatedItinerary)
        setItineraries(prev => prev.map(it => 
          it.id === targetItinerary.id ? updatedItinerary : it
        ))
      }
      
      setActivityForm({
        name: '',
        location: '',
        startTime: '',
        duration: 60,
        cost: '',
        category: 'sightseeing'
      })
      setShowActivityForm(false)
      setSelectedDate(null)
      toast.success("Activity added successfully!")
    } catch (err) {
      toast.error("Failed to add activity")
    }
  }

  const getActivitiesForDate = (date) => {
    const itinerary = itineraries.find(it => it.date === date)
    if (!itinerary?.activities) return []
    
    return activities.filter(activity => 
      itinerary.activities.includes(activity.id)
    )
  }

  const getTripDates = () => {
    if (!activeTrip?.startDate || !activeTrip?.endDate) return []
    
    const startDate = parseISO(activeTrip.startDate)
    const endDate = parseISO(activeTrip.endDate)
    const dates = []
    
    for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
      dates.push(format(date, 'yyyy-MM-dd'))
    }
    
    return dates
  }

  const categoryIcons = {
    sightseeing: 'Camera',
    food: 'UtensilsCrossed',
    transport: 'Car',
    accommodation: 'Bed',
    activity: 'Zap',
    shopping: 'ShoppingBag'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center space-x-3">
          <div className="animate-spin w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full"></div>
          <span className="text-surface-600">Loading your trips...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-heading font-bold text-surface-800 mb-2">
            Trip Planner
          </h3>
          <p className="text-surface-600">
            {trips.length === 0 ? "Create your first trip to get started" : `Managing ${trips.length} trip${trips.length === 1 ? '' : 's'}`}
          </p>
        </div>
        
        <motion.button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="Plus" size={20} />
          <span>New Trip</span>
        </motion.button>
      </div>

      {/* Trip Selector */}
      {trips.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {trips.map((trip) => (
              <motion.button
                key={trip.id}
                onClick={() => {
                  setActiveTrip(trip)
                  loadItineraries(trip.id)
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTrip?.id === trip.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-surface-700 border border-surface-200 hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {trip.name}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Itinerary Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card border border-surface-100 overflow-hidden">
            <div className="p-6 border-b border-surface-100">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-heading font-semibold text-surface-800">
                  {activeTrip ? `${activeTrip.name} Itinerary` : 'Daily Itinerary'}
                </h4>
                {activeTrip && (
                  <button
                    onClick={() => setShowActivityForm(true)}
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors flex items-center space-x-2"
                  >
                    <ApperIcon name="Plus" size={16} />
                    <span>Add Activity</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {activeTrip ? (
                <div className="space-y-6">
                  {getTripDates().map((date, index) => {
                    const dayActivities = getActivitiesForDate(date)
                    const isToday = date === format(new Date(), 'yyyy-MM-dd')
                    
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
                            <h5 className="font-heading font-semibold text-surface-800 flex items-center space-x-2">
                              <span>Day {index + 1}</span>
                              {isToday && (
                                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                                  Today
                                </span>
                              )}
                            </h5>
                            <p className="text-surface-600 text-sm">
                              {format(parseISO(date), 'EEEE, MMMM d')}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedDate(date)
                              setShowActivityForm(true)
                            }}
                            className="text-primary hover:text-primary-dark transition-colors"
                          >
                            <ApperIcon name="Plus" size={20} />
                          </button>
                        </div>
                        
                        {dayActivities.length > 0 ? (
                          <div className="space-y-3">
                            {dayActivities.map((activity) => (
                              <div
                                key={activity.id}
                                className="bg-surface-50 rounded-lg p-4 border border-surface-100"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <ApperIcon 
                                      name={categoryIcons[activity.category] || 'MapPin'} 
                                      size={16} 
                                      className="text-primary" 
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h6 className="font-medium text-surface-800 mb-1">
                                      {activity.name}
                                    </h6>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-surface-600">
                                      {activity.startTime && (
                                        <span className="flex items-center space-x-1">
                                          <ApperIcon name="Clock" size={14} />
                                          <span>{activity.startTime}</span>
                                        </span>
                                      )}
                                      {activity.location?.name && (
                                        <span className="flex items-center space-x-1">
                                          <ApperIcon name="MapPin" size={14} />
                                          <span>{activity.location.name}</span>
                                        </span>
                                      )}
                                      {activity.cost > 0 && (
                                        <span className="flex items-center space-x-1">
                                          <ApperIcon name="DollarSign" size={14} />
                                          <span>${activity.cost}</span>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-surface-500">
                            <ApperIcon name="Calendar" size={32} className="mx-auto mb-2 opacity-50" />
                            <p>No activities planned for this day</p>
                            <button
                              onClick={() => {
                                setSelectedDate(date)
                                setShowActivityForm(true)
                              }}
                              className="text-primary hover:text-primary-dark text-sm mt-1"
                            >
                              Add your first activity
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="MapPin" size={32} className="text-primary/50" />
                  </div>
                  <h5 className="font-heading font-semibold text-surface-800 mb-2">
                    No trips yet
                  </h5>
                  <p className="text-surface-600 mb-4">
                    Create your first trip to start planning your adventure
                  </p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Create Trip
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trip Overview Sidebar */}
        <div className="space-y-6">
          {/* Trip Stats */}
          {activeTrip && (
            <div className="bg-white rounded-2xl shadow-card border border-surface-100 p-6">
              <h4 className="font-heading font-semibold text-surface-800 mb-4">
                Trip Overview
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-surface-100">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Calendar" size={16} className="text-surface-500" />
                    <span className="text-surface-600">Duration</span>
                  </div>
                  <span className="font-medium text-surface-800">
                    {getTripDates().length} days
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-surface-100">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="MapPin" size={16} className="text-surface-500" />
                    <span className="text-surface-600">Destinations</span>
                  </div>
                  <span className="font-medium text-surface-800">
                    {activeTrip.destinations?.length || 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-surface-100">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Zap" size={16} className="text-surface-500" />
                    <span className="text-surface-600">Activities</span>
                  </div>
                  <span className="font-medium text-surface-800">
                    {activities.length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="DollarSign" size={16} className="text-surface-500" />
                    <span className="text-surface-600">Budget</span>
                  </div>
                  <span className="font-medium text-surface-800">
                    ${activeTrip.budget || 0}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-card border border-surface-100 p-6">
            <h4 className="font-heading font-semibold text-surface-800 mb-4">
              Quick Actions
            </h4>
            
            <div className="space-y-3">
              <button 
                onClick={() => setShowCreateForm(true)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg border border-surface-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ApperIcon name="Plus" size={16} className="text-primary" />
                </div>
                <span className="text-surface-700 group-hover:text-primary transition-colors">
                  Create New Trip
                </span>
              </button>
              
              {activeTrip && (
                <button 
                  onClick={() => setShowActivityForm(true)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-surface-200 hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <ApperIcon name="Zap" size={16} className="text-secondary" />
                  </div>
                  <span className="text-surface-700 group-hover:text-secondary transition-colors">
                    Add Activity
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Trip Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-surface-200 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-semibold text-surface-800">
                  Create New Trip
                </h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-surface-400 hover:text-surface-600 transition-colors"
                >
                  <ApperIcon name="X" size={24} />
                </button>
              </div>

              <form onSubmit={handleCreateTrip} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Trip Name *
                  </label>
                  <input
                    type="text"
                    value={tripForm.name}
                    onChange={(e) => setTripForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="e.g., Summer Europe Adventure"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={tripForm.startDate}
                      onChange={(e) => setTripForm(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={tripForm.endDate}
                      onChange={(e) => setTripForm(prev => ({ ...prev, endDate: e.target.value }))}
                      min={tripForm.startDate}
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Budget (USD)
                  </label>
                  <input
                    type="number"
                    value={tripForm.budget}
                    onChange={(e) => setTripForm(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="Enter your budget"
                    min="0"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-6 py-3 border border-surface-200 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Create Trip
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Activity Modal */}
      <AnimatePresence>
        {showActivityForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowActivityForm(false)
              setSelectedDate(null)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-surface-200 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-semibold text-surface-800">
                  Add Activity
                </h3>
                <button
                  onClick={() => {
                    setShowActivityForm(false)
                    setSelectedDate(null)
                  }}
                  className="text-surface-400 hover:text-surface-600 transition-colors"
                >
                  <ApperIcon name="X" size={24} />
                </button>
              </div>

              <form onSubmit={handleAddActivity} className="space-y-4">
                {!selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Select Date *
                    </label>
                    <select
                      value={selectedDate || ''}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      required
                    >
                      <option value="">Choose a date</option>
                      {getTripDates().map((date) => (
                        <option key={date} value={date}>
                          {format(parseISO(date), 'EEEE, MMMM d')}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Activity Name *
                  </label>
                  <input
                    type="text"
                    value={activityForm.name}
                    onChange={(e) => setActivityForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="e.g., Visit Eiffel Tower"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={activityForm.location}
                    onChange={(e) => setActivityForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="e.g., Paris, France"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={activityForm.startTime}
                      onChange={(e) => setActivityForm(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Cost ($)
                    </label>
                    <input
                      type="number"
                      value={activityForm.cost}
                      onChange={(e) => setActivityForm(prev => ({ ...prev, cost: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Category
                  </label>
                  <select
                    value={activityForm.category}
                    onChange={(e) => setActivityForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                  >
                    <option value="sightseeing">Sightseeing</option>
                    <option value="food">Food & Dining</option>
                    <option value="transport">Transportation</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="activity">Activity</option>
                    <option value="shopping">Shopping</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowActivityForm(false)
                      setSelectedDate(null)
                    }}
                    className="flex-1 px-6 py-3 border border-surface-200 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Add Activity
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature