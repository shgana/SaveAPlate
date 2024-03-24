import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import FoodEntryForm from './components/FoodEntryForm';
import DisplayComponent from './components/DisplayComponent';


function App() {
  // If you're planning to use the `setReductionPercentage` function later, keep it here.
  // Otherwise, you can remove the state setter or comment it out as shown below:
  // const [reductionPercentage, setReductionPercentage] = useState(0);
  const [reductionPercentage] = useState(0);
  
  // For `setTimezone`, remove it if you're not using it
  // const [timezone, setTimezone] = useState('EST'); // Remove or comment out if not used

  const handleFormSubmission = (foodData) => {
    // Implementation needed for form submission that may use `setReductionPercentage`
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <FoodEntryForm onSubmission={handleFormSubmission} />
        <DisplayComponent reductionPercentage={reductionPercentage} />
      </div>
    </div>
  );
}

export default App;
 