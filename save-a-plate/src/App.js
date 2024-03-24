import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import FoodEntryForm from './components/FoodEntryForm';
import DisplayComponent from './components/DisplayComponent';
import CalendarComponent from './components/CalendarComponent';
import ClockComponent from './components/ClockComponent';

function App() {
  // Removed unused `setReductionPercentage` and added `selectedDate`
  const [reductionPercentage, setReductionPercentage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    // You can now use `selectedDate` to fetch data or for other logic
  };

  const handleFormSubmission = (foodEntries) => {
    // Implementation logic for form submission
    // For example, calculating the total reduction percentage (dummy implementation)
    const totalCooked = foodEntries.reduce((acc, entry) => acc + Number(entry.cookedAmount), 0);
    const totalLeftover = foodEntries.reduce((acc, entry) => acc + Number(entry.leftoverAmount), 0);
    const reduction = totalCooked - totalLeftover;
    const percentage = (reduction / totalCooked) * 100;
    setReductionPercentage(percentage);
    // After calculating, you may want to send this data to a backend or store it
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="calendar-container">
          <ClockComponent timezone="America/New_York" />
          <CalendarComponent onDateChange={handleDateChange} />
        </div>
        <div className="main-content">
          <FoodEntryForm onSubmission={handleFormSubmission} />
          <DisplayComponent reductionPercentage={reductionPercentage} />
        </div>
      </div>
    </div>
  );
}

export default App;
