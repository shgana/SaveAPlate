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
    'day_of_week': np.random.choice(days, size=num_rows),
    'students_present': np.random.randint(100, 500, size=num_rows)
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

# Predict on test set
predictions = model.predict(X_test)

# Evaluate the model
mae = mean_absolute_error(y_test, predictions)
print(f"Mean Absolute Error: {mae}")

# Encode the 'day_of_week' column in the future data
X_predict = df_predict[['day_of_week', 'students_present']]
X_predict_encoded = pd.DataFrame(encoder.transform(X_predict[['day_of_week']]).toarray(), columns=encoder.get_feature_names_out(['day_of_week']))
X_predict_encoded = pd.concat([X_predict_encoded, X_predict[['students_present']]], axis=1)

# Predict future waste percentages
predicted_waste_percentages = model.predict(X_predict_encoded)

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