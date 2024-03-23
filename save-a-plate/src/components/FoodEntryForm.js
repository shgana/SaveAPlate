import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <label>
                Food Item:
                <select name="foodItem" onChange={handleInputChange} value={foodData.foodItem}>
                    {/* Add options here */}
                </select>
            </label>
            <label>
                Amount Cooked:
                <input type="number" name="cookedAmount" onChange={handleInputChange} value={foodData.cookedAmount} />
            </label>
            <label>
                Leftover Amount:
                <input type="number" name="leftoverAmount" onChange={handleInputChange} value={foodData.leftoverAmount} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default FoodEntryForm;