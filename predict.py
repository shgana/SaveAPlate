import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import OneHotEncoder
import numpy as np

# Directory where the CSV files are located
csv_dir = '/workspaces/SaveAPlate'

# Read data from CSV files
df_prod = pd.read_csv(os.path.join(csv_dir, 'production_logs.csv'), usecols=['id', 'food_item_id', 'quantity', 'day_of_week', 'students_present'])
df_waste = pd.read_csv(os.path.join(csv_dir, 'waste_logs.csv'), usecols=['id', 'food_item_id', 'quantity', 'log_date', 'day_of_week', 'students_present'])

# Generate random data for PredictFood.csv
days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
num_rows = 100
df_predict = pd.DataFrame({
    'food_name': ['Food ' + str(i) for i in range(1, num_rows + 1)],
    'day_of_week': np.random.choice(days, size=num_rows),
    'students_present': np.random.randint(100, 500, size=num_rows),
    'quantity': np.random.randint(10, 100, size=num_rows)
})

# Merge production and waste logs on food_item_id
df_combined = pd.merge(df_prod, df_waste, on='food_item_id', how='left')

# Calculate waste_percentage
df_combined['waste_percentage'] = (df_combined['quantity_y'] / df_combined['quantity_x']) * 100

# Rename columns to remove suffixes
df_combined.rename(columns={'day_of_week_x': 'day_of_week', 'students_present_x': 'students_present'}, inplace=True)

# One-hot encode the 'day_of_week' column
X = df_combined[['day_of_week', 'students_present']]
encoder = OneHotEncoder(handle_unknown='ignore')
X_encoded = pd.DataFrame(encoder.fit_transform(X[['day_of_week']]).toarray(), columns=encoder.get_feature_names_out(['day_of_week']))
X_encoded = pd.concat([X_encoded, X[['students_present']]], axis=1)

# Assuming 'waste_percentage' is the target variable
y = df_combined['waste_percentage']

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# Create and fit the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Encode the 'day_of_week' column in the future data
X_predict = df_predict[['day_of_week', 'students_present']]
X_predict_encoded = pd.DataFrame(encoder.transform(X_predict[['day_of_week']]).toarray(), columns=encoder.get_feature_names_out(['day_of_week']))
X_predict_encoded = pd.concat([X_predict_encoded, X_predict[['students_present']]], axis=1)

# Predict future waste percentages
predicted_waste_percentages = model.predict(X_predict_encoded)

# Create a DataFrame with predictions and quantity
df_predictions = pd.DataFrame({
    'quantity': df_predict['quantity'],
    'predicted_waste_percentage': predicted_waste_percentages
})

# Group by and calculate statistics
waste_stats = df_predictions.groupby(level=0)[['predicted_waste_percentage', 'quantity']].agg({
    'predicted_waste_percentage': ['min', 'max', 'mean', 'median', 'std'],
    'quantity': 'sum'
})

# Print statistics and quantity of food not wasted
for i, stats in waste_stats.iterrows():
    print(f"Index: {i}")
    print(f"Minimum Predicted Waste Percentage: {stats['predicted_waste_percentage']['min']}%")
    print(f"Maximum Predicted Waste Percentage: {stats['predicted_waste_percentage']['max']}%")
    print(f"Mean Predicted Waste Percentage: {stats['predicted_waste_percentage']['mean']}%")
    print(f"Median Predicted Waste Percentage: {stats['predicted_waste_percentage']['median']}%")
    print(f"Standard Deviation of Predicted Waste Percentages: {stats['predicted_waste_percentage']['std']}")
    
    mean_waste_percentage = stats['predicted_waste_percentage']['mean']
    total_quantity = stats['quantity']['sum']
    quantity_not_wasted = total_quantity * (1 - (mean_waste_percentage / 100))
    print(f"Quantity of Food Not Wasted: {quantity_not_wasted}")
    print()