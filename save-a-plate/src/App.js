import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment-timezone';
import 'react-calendar/dist/Calendar.css'; // default styling for the calendar
import './App.css';
import Header from './components/Header';
import FoodEntryForm from './components/FoodEntryForm';
import DisplayComponent from './components/DisplayComponent';

function App() {
  const [reductionPercentage, setReductionPercentage] = useState(0);
  const [date, setDate] = useState(new Date());
  const [timezone, setTimezone] = useState('America/New_York'); // default to EST

  const handleFormSubmission = (foodData) => {
    // TODO: Send data to backend and set reduction percentage
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // TODO: Fetch and display values for the selected date
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="calendar-container">
          <h2>Local Time: {moment().tz(timezone).format('HH:mm:ss')}</h2>
          {/* Calendar Component */}
          <Calendar
            onChange={handleDateChange}
            value={date}
          />
          {/* Optionally, add controls here to change the timezone */}
        </div>
        <FoodEntryForm onSubmission={handleFormSubmission} />
        <DisplayComponent reductionPercentage={reductionPercentage} />
      </div>
    </div>
  );
}

export default App;
