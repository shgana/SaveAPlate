import React, { useState } from 'react';
import './FoodEntryForm.css';

function FoodEntryForm() {
    const foodItems = [
        "Mango Pineapple Barley Pudding",
"Summer Peach Crisp",
"Brick Oven Roasted Tunisian Spiced Chicken Legs",
"Maple Bacon Oven Roasted Parsnips & Red Onion",
"Roasted Indian Street Corn and Tomatoes",
"Italian Herb Crushed Red Pepper Broccoli",
"Black Bean Burger",
"Mini Cinnamon Bun",
"Penne al Vodka Pizza",
"Roasted Turkey Breast",
"Beef Taco Meat",
"Grilled Chipotle Lime Chicken",
"Red Pork Tamale Cassarole",
"Moroccan Lentils with Cucumber and Tomatoes",
"Scrambled Eggs Tomato Pepper Jack Cheese",
"Balsamic Garlic Roasted Brussel Sprouts",
"Nashville Hot Fried Chicken with creamy cole slaw Pickles",
"Black Bean & Roasted Corn Salad",
"Maizitos con Tocineta Corn al Gratin & Bacon",
"Banana Chocolate Chip French Toast Casserole",
"Pullman Wheat Bread Sliced",
"Tempura Mushrooms",
"Citrus Cilantro Orange Rice",
"Zha Jiang Mian Bejing Fried Sauce Noodles",
"Fried Pork Chop With Gravy",
"Buffalo Chicken Pizza",
"Mushroom Spinach Marinara (purple)",
"Trinidaddian Coo Coo",
"Yogurt Apple Orange Smoothie",
"Sticky Orange Cauliflower",
"Beef Taquitos",
"Cranberry Chicken Sausage Breakfast",
"Chopped Tomato Cucumber Onion salad with Cumin and Lime",
"Roasted Lemon Pepper Green Beans",
"Puerto Rican Kidney Beans",
"Grilled Lemon Pepper Pork Chop w/ Black Pepper Gravy (purple)",
"Southwestern Vegetable Hash",
"Peruvian Roasted Chicken Pollo la Barsa",
"Ripe Plantain Casserole",
"Brick Oven Roasted Parmesan Sage Tomato",
"Tomatoes and Okra",
"American Cheese Sliced",
"Spicy Sesame Ginger Bok Choy with Bean Sprouts and Carrots",
"Vegan Breakfast Sausage",
"Sweet and Sour Tempura Chicken",
"Cremini Mushroom Italian Sausage Quesadilla",
"French Toast",
"Mango Pineapple Spinach Smoothie",
"Roasted Potato Bacon Salad with Dijon Vinaigrette",
"Pepperoni Pizza Quesadilla",
"Grilled Corn with Wild Greens Pesto",
"Dominican Habichuelas Guisadas Stewed Beans",
"Mesa Squash Fry with Sunflower Seeds",
"Wild Rice and Corn Fritters",
"Grilled Chicken w/ Spicy Creole Sauce (purple)",
"Chesapeake Wild Catfish & Asaparagus Lemon Butter Sauce",
"Capicola Ham Mortadella Provolone Sandwich",
"Rosemary Onion Roasted Button Mushrooms",
"Herbed Rice Pilaf",
"Spicy Pan Fried Noodles",
"Tuna Salad",
"Pasta al Forna Bolognese",
"Grilled Pastrami Burger Swiss",
"Ham & Havarti Panini",
"Crispy plantain Kale Mango Salad w/ Coconut Lime  Dressing",
"Stewed Chicken with Golden tomatoes",
"Root Vegetables Mustard Seed Vinaigrette",
"Garlic Roasted Cauliflower",
"Roasted Yellow Squash and Peas",
"Vegan Banana Pancake (purple)",
"Fresh Vegan Basil Cheddar Mashed Potatoes",
"Indonesian Tofu",
"Crispy Salt and Vinegar Potatoes",
"Mashed Cranberry Bean & Coconut milk",
"Spicy Hunan Steamed Tofu",
"Maple Roasted Sweet Potatoes",
"TOMATO MOZZ PANINI ON SOURDOUGH WITH FRESH BASIL",
"Hazruquive Hominy Bean Sprouts Corn Stew",
"Filipino Mushroom Adobo",
"Philly Cheese Steak Pizza",
"Vegan General Tsos Chicken",
"Roasted Beets and Sweet Potatoes",
"Cuban Black Bean and Rice",
"Brazilian Prawn Coconut Stew",
"Djon Djon Haitian Black Mushroom Rice",
"Roasted Chick Peas, Sweet Potatoes and Peppers",
"Chicken Sausage Egg Cheese Breakfast Bagel Sandwich",
"Italian Sausage Mushroom Penne Gratin",
"Cantonese Chicken & Pickled Mustard Green",
"Al Pastor Pork"
    ];
    

    const percentDecreases = [
        13.98, 8.81, 8.19, 22.77, 24.27, 19.37, 21.11, 3.26, 3.34, 21.27, 
        13.33, 18.04, 9.42, 19.29, 20.11, 10.41, 8.31, 20.63, 22.98, 10.48, 
        15.78, 23.29, 20.86, 16.57, 9.69, 8.15, 15.65, 14.74, 22.82, 3.65, 
        26.37, 2.56, 12.17, 19.88, 0.79, 19.56, 20.1, 13.12, 20.57, 23.66, 
        5.43, 17.01, 11.1, 20.48, 1.65, 25.5, 19.63, 11.73, 8.96, 7.78, 
        24.7, 17.57, 11.64, 24.17, 7.54, 8.68, 26.14, 3.23, 16.41, 15.09, 
        19.38, 1.55, 4.96, 2.15, 24.22, 4.23, 19.14, 18.51, 14.87, 5.71, 
        12.78, 0.27, 19.7, 24.34, 8.66, 13.26, 19.99, 8.19, 15.0, 21.61, 
        17.45, 21.52, 26.8, 10.49, 1.89, 27.35, 13.56, 8.39, 10.79, 22.53
    ];
    
    // Combine food items with their corresponding percent decreases
    const initialFoodEntries = foodItems.map((foodItem, index) => ({
        foodItem,
        percentDecrease: percentDecreases[index] || 0 // Default to 0 if no matching decrease value
    }));

    const [foodEntries] = useState(initialFoodEntries); // No setter function needed since we won't be changing the entries

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
                            <td>{entry.foodItem}</td>
                            <td>{entry.percentDecrease.toFixed(2)}%</td> {/* Updated to show percent decrease */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FoodEntryForm;