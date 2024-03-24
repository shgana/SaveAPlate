import React, { useState } from 'react';
import './FoodEntryForm.css'; // Ensure your CSS is updated accordingly

function FoodEntryForm({ onSubmission }) {
    const [foodData, setFoodData] = useState({
        foodItem: '',
        cookedAmount: '',
        leftoverAmount: ''
    });
    const [foodEntries, setFoodEntries] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFoodData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        setFoodEntries([...foodEntries, foodData]);
        setFoodData({ foodItem: '', cookedAmount: '', leftoverAmount: '' }); // Reset form
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmission(foodEntries); // Modify as needed to handle the list of entries
    };

    const calculateDecreasePercentage = (cooked, leftover) => {
        const decrease = cooked - leftover;
        return (decrease / cooked) * 100;
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Form fields for food entry */}
                {/* Same as before */}

                <button type="button" className="add-item-btn" onClick={handleAddItem}>Add Item</button>
                
                <table className="food-entries-table">
                    <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>Amount Cooked</th>
                            <th>Leftover Amount</th>
                            <th>% Decrease</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodEntries.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.foodItem}</td>
                                <td>{entry.cookedAmount}</td>
                                <td>{entry.leftoverAmount}</td>
                                <td>{calculateDecreasePercentage(entry.cookedAmount, entry.leftoverAmount).toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button type="submit" className="submit-btn">Submit All</button>
            </form>re
        </div>
    );
}

export default FoodEntryForm;
