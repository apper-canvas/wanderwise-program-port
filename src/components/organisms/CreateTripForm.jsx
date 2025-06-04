import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ModalOverlay from '../atoms/ModalOverlay';
import ModalContent from '../atoms/ModalContent';
import ModalHeader from '../molecules/ModalHeader';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const CreateTripForm = ({ show, onClose, onSubmit }) => {
  const [tripForm, setTripForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tripForm);
  };

  return (
    <AnimatePresence>
      {show && (
        <ModalOverlay onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader title="Create New Trip" onClose={onClose} />

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Trip Name"
                name="name"
                value={tripForm.name}
                onChange={handleChange}
                placeholder="e.g., Summer Europe Adventure"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={tripForm.startDate}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={tripForm.endDate}
                  onChange={handleChange}
                  min={tripForm.startDate}
                  required
                />
              </div>

              <FormField
                label="Budget (USD)"
                type="number"
                name="budget"
                value={tripForm.budget}
                onChange={handleChange}
                placeholder="Enter your budget"
                min="0"
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="button" onClick={onClose} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Create Trip
                </Button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CreateTripForm;