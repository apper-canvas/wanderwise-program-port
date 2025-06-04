import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import ModalOverlay from '../atoms/ModalOverlay';
import ModalContent from '../atoms/ModalContent';
import ModalHeader from '../molecules/ModalHeader';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const AddActivityForm = ({ show, onClose, onSubmit, tripDates, initialDate }) => {
  const [activityForm, setActivityForm] = useState({
    name: '',
    location: '',
    startTime: '',
    duration: 60,
    cost: '',
    category: 'sightseeing'
  });
  const [selectedDate, setSelectedDate] = useState(initialDate || '');

  useEffect(() => {
    setSelectedDate(initialDate || '');
  }, [initialDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(activityForm, selectedDate);
    setActivityForm({
      name: '',
      location: '',
      startTime: '',
      duration: 60,
      cost: '',
      category: 'sightseeing'
    });
    setSelectedDate('');
  };

  const categoryOptions = [
    { value: "sightseeing", label: "Sightseeing" },
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "accommodation", label: "Accommodation" },
    { value: "activity", label: "Activity" },
    { value: "shopping", label: "Shopping" }
  ];

  const dateOptions = [
    { value: '', label: 'Choose a date' },
    ...tripDates.map(date => ({
      value: date,
      label: format(parseISO(date), 'EEEE, MMMM d')
    }))
  ];

  return (
    <AnimatePresence>
      {show && (
        <ModalOverlay onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader title="Add Activity" onClose={onClose} />

            <form onSubmit={handleSubmit} className="space-y-4">
              {!initialDate && (
                <FormField
                  label="Select Date"
                  type="select"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  options={dateOptions}
                  required
                />
              )}

              <FormField
                label="Activity Name"
                name="name"
                value={activityForm.name}
                onChange={handleChange}
                placeholder="e.g., Visit Eiffel Tower"
                required
              />

              <FormField
                label="Location"
                name="location"
                value={activityForm.location}
                onChange={handleChange}
                placeholder="e.g., Paris, France"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Time"
                  type="time"
                  name="startTime"
                  value={activityForm.startTime}
                  onChange={handleChange}
                />
                <FormField
                  label="Cost ($)"
                  type="number"
                  name="cost"
                  value={activityForm.cost}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                />
              </div>

              <FormField
                label="Category"
                type="select"
                name="category"
                value={activityForm.category}
                onChange={handleChange}
                options={categoryOptions}
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="button" onClick={onClose} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" variant="secondary" className="flex-1">
                  Add Activity
                </Button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default AddActivityForm;