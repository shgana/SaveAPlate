import React, { useState } from 'react';
import './App.css';
import FoodEntryForm from './components/FoodEntryForm';
import DisplayComponent from './components/DisplayComponent';

function App() {
  const [reductionPercentage, setReductionPercentage] = useState(0);

  const handleFormSubmission = (foodData) => {
    // TODO: Send data to backend and set reduction percentage
  };

  return (
    <div className="App">
      <header className="App-header">
        <FoodEntryForm onSubmission={handleFormSubmission} />
        <DisplayComponent reductionPercentage={reductionPercentage} />
      </header>
    </div>
  );
}

export default App;
