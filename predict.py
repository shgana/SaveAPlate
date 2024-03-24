import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
import numpy as np

csv_dir = '/workspaces/SaveAPlate'

# Read data from CSV files
df_prod = pd.read_csv(os.path.join(csv_dir, 'production_logs.csv'), usecols=['id', 'food_item_id', 'quantity', 'day_of_week', 'students_present'])
df_waste = pd.read_csv(os.path.join(csv_dir, 'waste_logs.csv'), usecols=['id', 'food_item_id', 'quantity', 'log_date', 'day_of_week', 'students_present'])

# Merge on food_item_id
df_combined = pd.merge(df_prod, df_waste, on='food_item_id', how='left')

# Calculate waste_percentage
df_combined['waste_percentage'] = (df_combined['quantity_y'] / df_combined['quantity_x']) * 100

# Rename columns to remove suffixes
df_combined.rename(columns={'day_of_week_x': 'day_of_week', 'students_present_x': 'students_present'}, inplace=True)

# Assuming 'day_of_week' and 'students_present' are relevant features
X = df_combined[['day_of_week', 'students_present']]
y = df_combined['waste_percentage']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

# Predict on test set
predictions = model.predict(X_test)

# Evaluate the model
mae = mean_absolute_error(y_test, predictions)
print(f"Mean Absolute Error: {mae}")

# Read future data from CSV
df_future = pd.read_csv(os.path.join(csv_dir, 'PredictFood.csv'))

# Predict future waste percentages
future_predictions = model.predict(df_future)

# Convert predictions to a NumPy array for easier manipulation
predicted_waste_percentages = np.array(future_predictions)

# Basic statistics
min_waste = np.min(predicted_waste_percentages)
max_waste = np.max(predicted_waste_percentages)
mean_waste = np.mean(predicted_waste_percentages)
median_waste = np.median(predicted_waste_percentages)
std_deviation = np.std(predicted_waste_percentages)

print(f"Minimum Predicted Waste Percentage: {min_waste}%")
print(f"Maximum Predicted Waste Percentage: {max_waste}%")
print(f"Mean Predicted Waste Percentage: {mean_waste}%")
print(f"Median Predicted Waste Percentage: {median_waste}%")
print(f"Standard Deviation of Predicted Waste Percentages: {std_deviation}")