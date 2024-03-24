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