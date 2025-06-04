import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-full flex items-center justify-center">
              <div className="relative">
                <ApperIcon name="MapPin" size={80} className="text-primary/30" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-bounce">
                  <ApperIcon name="AlertTriangle" size={16} className="text-white m-1" />
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-10 left-1/4 animate-float">
              <div className="w-4 h-4 bg-secondary/30 rounded-full"></div>
            </div>
            <div className="absolute bottom-16 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-3 h-3 bg-accent/40 rounded-full"></div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-surface-800 mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-surface-700 mb-4">
              Oops! You've wandered off the path
            </h2>
            <p className="text-lg text-surface-600 mb-8 leading-relaxed">
              The page you're looking for seems to have gotten lost on its own adventure. 
              Let's get you back on track!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <ApperIcon name="Home" size={20} />
              <span>Return Home</span>
            </Link>
            
            <div className="text-surface-500">
              <p>or</p>
            </div>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-surface-700 px-8 py-4 rounded-xl font-semibold border border-surface-200 hover:border-primary/30 hover:bg-white transition-all duration-300"
            >
              <ApperIcon name="ArrowLeft" size={20} />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-surface-200"
          >
            <p className="text-sm text-surface-500 mb-4">Need help? Try these popular destinations:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/" className="text-sm text-primary hover:text-primary-dark transition-colors">
                Home
              </Link>
              <span className="text-surface-300">•</span>
              <Link to="/#features" className="text-sm text-primary hover:text-primary-dark transition-colors">
                Features
              </Link>
              <span className="text-surface-300">•</span>
              <Link to="/#planner" className="text-sm text-primary hover:text-primary-dark transition-colors">
                Trip Planner
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound