from bs4 import BeautifulSoup
import requests

date = '3/27/2024'
website = 'https://nutrition.umd.edu/?locationNum=19&dtdate=' + date
result = requests.get(website)
content = result.text

soup = BeautifulSoup(content, 'lxml')

# Find all 'a' tags with the class 'menu-item-name'
food_items = soup.find_all('a', class_='menu-item-name')

# Extract and print the text (food name) from each tag
with open('day1.txt', 'w') as file:
    for item in food_items:
        food_name = item.get_text(strip=True)
        file.write(food_name + '\n')

date = '3/28/2024'
website = 'https://nutrition.umd.edu/?locationNum=19&dtdate=' + date
result = requests.get(website)
content = result.text

soup = BeautifulSoup(content, 'lxml')

food_items = soup.find_all('a', class_='menu-item-name')

# Extract and print the text (food name) from each tag
with open('day2.txt', 'w') as file:
    for item in food_items:
        food_name = item.get_text(strip=True)
        file.write(food_name + '\n')


with open('day1.txt', 'r') as file:
    day1_items = set(file.read().splitlines())

# Read the contents of day2.txt
with open('day2.txt', 'r') as file:
    day2_items = set(file.read().splitlines())

# Find items that are in day 1 but not in day 2
unique_items = day1_items - day2_items

# Write the unique items to food_items.txt
with open('food_items.txt', 'w') as file:
    for item in unique_items:
        file.write(item + '\n')

import mysql.connector

# Establish a connection to the MySQL database
connection = mysql.connector.connect(
    host="localhost",
    user="your_username",
    password="your_password",
    database="WasteTrackerDB"
)

try:
    # Create a cursor object to execute SQL queries
    cursor = connection.cursor()

    # Create the "PredictFood" table if it doesn't exist
    create_table_query = """
    CREATE TABLE IF NOT EXISTS PredictFood (
        id INT AUTO_INCREMENT PRIMARY KEY,
        food_name VARCHAR(255)
    )
    """
    cursor.execute(create_table_query)

    # Read the food items from the file
    with open('food_items.txt', 'r') as file:
        food_items = file.read().splitlines()

    # Insert the food items into the "PredictFood" table
    insert_query = "INSERT INTO PredictFood (food_name) VALUES (%s)"
    for item in food_items:
        cursor.execute(insert_query, (item,))

    # Commit the changes to the database
    connection.commit()

    print("Food items inserted into the PredictFood table successfully.")

except mysql.connector.Error as error:
    print(f"Error: {error}")

finally:
    # Close the cursor and the database connection
    if cursor:
        cursor.close()
    if connection:
        connection.close()