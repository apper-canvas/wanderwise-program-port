import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

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
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-travel rounded-lg flex items-center justify-center">
                <ApperIcon name="Compass" size={20} className="text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-surface-800">
                Wanderwise
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center space-x-8"
            >
              <a href="#features" className="text-surface-600 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#planner" className="text-surface-600 hover:text-primary transition-colors">
                Plan Trip
              </a>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={heroVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl"></div>
              <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-surface-800 mb-6">
                Plan Your Perfect
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Adventure
                </span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform your travel dreams into reality with our intelligent trip planning platform. 
              Organize itineraries, collaborate with friends, and manage budgets—all in one beautiful interface.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="group bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
                <span>Start Planning</span>
                <ApperIcon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-white/80 backdrop-blur-sm text-surface-700 px-8 py-4 rounded-xl font-semibold border border-surface-200 hover:border-primary/30 hover:bg-white transition-all duration-300 flex items-center space-x-2">
                <ApperIcon name="Play" size={20} />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className="relative">
            <div className="absolute top-10 left-10 animate-float">
              <div className="w-16 h-16 bg-gradient-sunset rounded-full opacity-20"></div>
            </div>
            <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-12 h-12 bg-gradient-ocean rounded-full opacity-30"></div>
            </div>
            <div className="absolute bottom-10 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
              <div className="w-8 h-8 bg-accent rounded-full opacity-25"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-surface-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-surface-800 mb-4">
              Everything you need to plan amazing trips
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              From initial inspiration to final boarding pass, we've got every aspect of your journey covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 transform group-hover:-translate-y-2 border border-surface-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ApperIcon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-surface-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-surface-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section id="planner" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-surface-800 mb-4">
              Start Planning Your Next Adventure
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Create your first trip itinerary and experience the power of intelligent travel planning
            </p>
          </motion.div>
          
          <MainFeature />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-travel rounded-lg flex items-center justify-center">
                  <ApperIcon name="Compass" size={20} className="text-white" />
                </div>
                <span className="text-xl font-heading font-bold">Wanderwise</span>
              </div>
              <p className="text-surface-300 mb-4 max-w-md">
                Making travel planning effortless and enjoyable. Turn your wanderlust into well-organized adventures.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-surface-700 transition-colors">
                  <ApperIcon name="Twitter" size={18} />
                </button>
                <button className="w-10 h-10 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-surface-700 transition-colors">
                  <ApperIcon name="Instagram" size={18} />
                </button>
                <button className="w-10 h-10 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-surface-700 transition-colors">
                  <ApperIcon name="Facebook" size={18} />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-8 pt-8 text-center text-surface-400">
            <p>&copy; 2024 Wanderwise. All rights reserved. Built with ❤️ for travelers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home