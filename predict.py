import mysql.connector
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error

# Connect to the database
config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'Joshua@529',
    'database': '`WasteTrackerDB`'
}
cnx = mysql.connector.connect(**config)

# Fetch production and waste logs
query_prod = "SELECT food_item_id, SUM(quantity) as total_produced, production_date FROM production_logs GROUP BY food_item_id, production_date"
query_waste = "SELECT food_item_id, SUM(quantity) as total_wasted, log_date FROM waste_logs GROUP BY food_item_id, log_date"

df_prod = pd.read_sql(query_prod, cnx)
df_waste = pd.read_sql(query_waste, cnx)

# Merge on food_item_id and date
df_combined = pd.merge(df_prod, df_waste, left_on=['food_item_id', 'production_date'], right_on=['food_item_id', 'log_date'], how='left').fillna(0)
df_combined['waste_percentage'] = (df_combined['total_wasted'] / df_combined['total_produced']) * 100

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

# Fetch future data
query_future = "SELECT day_of_week, students_present FROM PredictFood"
df_future = pd.read_sql(query_future, cnx)

# Predict future waste percentages
future_predictions = model.predict(df_future)

# You can then calculate the range of predicted waste percentages and analyze further
