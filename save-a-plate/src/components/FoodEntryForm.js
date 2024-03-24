import React, { useState } from 'react';
import './FoodEntryForm.css'; // Ensure you have this CSS file in the same directory

function FoodEntryForm({ onSubmission }) {
    // Initialize the state with default values for foodItem, cookedAmount, and leftoverAmount
    const [foodData, setFoodData] = useState({
        foodItem: '',
        cookedAmount: '',
        leftoverAmount: ''
    });

    // Handle input change for all form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFoodData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmission(foodData);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="foodItem">Food Item:</label>
                    <select name="foodItem" id="foodItem" onChange={handleInputChange} value={foodData.foodItem}>
                        {/* Add options here */}
                        <option value="">Select Food</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Salad">Salad</option>
                        <option value="Pasta">Pasta</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="cookedAmount">Amount Cooked:</label>
                    <input type="number" name="cookedAmount" id="cookedAmount" onChange={handleInputChange} value={foodData.cookedAmount} />
                </div>
                <div className="form-group">
                    <label htmlFor="leftoverAmount">Leftover Amount:</label>
                    <input type="number" name="leftoverAmount" id="leftoverAmount" onChange={handleInputChange} value={foodData.leftoverAmount} />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}

export default FoodEntryForm;
