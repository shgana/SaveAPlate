import React, { useState } from 'react';
import './FoodEntryForm.css';

function FoodEntryForm() {
    // Initialize foodEntries with 89 preset entries for food items.
    const initialFoodEntries = Array.from({ length: 89 }, () => ({ foodItem: '' }));
    const [foodEntries, setFoodEntries] = useState(initialFoodEntries);

    const handleFoodItemChange = (index, value) => {
        const updatedEntries = [...foodEntries];
        updatedEntries[index].foodItem = value;
        setFoodEntries(updatedEntries);
    };

    return (
        <div className="form-container">
            <table className="food-entries-table">
                <thead>
                    <tr>
                        <th>Food Item</th>
                        <th>% Decrease</th>
                    </tr>
                </thead>
                <tbody>
                    {foodEntries.map((entry, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={entry.foodItem}
                                    onChange={(e) => handleFoodItemChange(index, e.target.value)}
                                    placeholder="Enter Food Item"
                                    required
                                />
                            </td>
                            {/* As % Decrease is calculated in the backend, this column remains a placeholder */}
                            <td>% Decrease Placeholder</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FoodEntryForm;