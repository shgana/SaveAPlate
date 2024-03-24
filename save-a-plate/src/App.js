import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import FoodEntryForm from './components/FoodEntryForm';
import DisplayComponent from './components/DisplayComponent';
import CalendarComponent from './components/CalendarComponent';
import ClockComponent from './components/ClockComponent';

function App() {
  const [reductionPercentage] = useState(0);
  const [date, setDate] = useState(new Date()); // For the selected date in the calendar
  const [timezone, setTimezone] = useState('America/New_York'); // Default timezone

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Actions for the selected date can be performed here
  };

  const handleFormSubmission = (foodData) => {
    // Placeholder for form submission logic
  };

  return (
    <div className="App">
      <Header />
      <div className="app-content">
        <aside className="sidebar">
          <ClockComponent timezone={timezone} />
          <CalendarComponent onDateChange={handleDateChange} />
        </aside>
        <main className="main-content">
          <FoodEntryForm onSubmission={handleFormSubmission} />
          <DisplayComponent reductionPercentage={reductionPercentage} />
        </main>
      </div>
    </div>
  );
}

export default App;
