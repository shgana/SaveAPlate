from bs4 import BeautifulSoup
import requests
import mysql.connector  # Import the MySQL connector

# Function to scrape website and return unique food items for given dates
def scrape_food_items(date):
    website = f'https://nutrition.umd.edu/?locationNum=19&dtdate={date}'
    result = requests.get(website)
    content = result.text
    soup = BeautifulSoup(content, 'lxml')
    food_items = soup.find_all('a', class_='menu-item-name')
    return {item.get_text(strip=True) for item in food_items}

def insert_into_database(food_items):
    connection = None  # Initialize connection to None
    try:
        connection = mysql.connector.connect(
            host='127.0.0.1',  # Correct this as per your setup
            user='root',  # Your MySQL username
            password='Joshua@529',  # Your MySQL password
            database='WasteTrackerDB'  # Your database name
        )
        cursor = connection.cursor()
        query = "INSERT INTO PredictFood (food_name) VALUES (%s);"
        for item in food_items:
            cursor.execute(query, (item,))
        connection.commit()
        print(f"{cursor.rowcount} records inserted.")
    except mysql.connector.Error as error:
        print(f"Failed to insert record into MySQL table {error}")
    finally:
        # Check if connection was successfully established before calling is_connected
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


# Scrape the website for the two dates and find unique items
day1_items = scrape_food_items('3/27/2024')
day2_items = scrape_food_items('3/28/2024')
unique_items = day1_items - day2_items

# Insert the unique food items into the database
insert_into_database(unique_items)