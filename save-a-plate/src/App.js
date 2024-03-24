import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'; // Import the Header component
import FoodEntryForm from './components/FoodEntryForm';
import DisplayComponent from './components/DisplayComponent';

function App() {
  const [reductionPercentage, setReductionPercentage] = useState(0);

  const handleFormSubmission = (foodData) => {
    // TODO: Send data to backend and set reduction percentage
  };

  return (
    <div className="App">
      <Header /> {/* Include the Header at the top */}
      <div className="content">
        <FoodEntryForm onSubmission={handleFormSubmission} />
        <DisplayComponent reductionPercentage={reductionPercentage} />
      </div>
    </div>
  );
}

export default App;
