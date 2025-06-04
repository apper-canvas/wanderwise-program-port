import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage'; // Renamed to follow page naming convention
import NotFound from './pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="bg-white shadow-soft border border-surface-200 rounded-xl"
        bodyClassName="font-sans text-surface-700"
progressClassName="bg-gradient-to-r from-primary to-secondary"
      />
    </div>
  );
}

export default App