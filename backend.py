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
    day1_items = set(file.read().strip().split('\n'))

# Open and read day2.txt into a set
with open('day2.txt', 'r') as file:
    day2_items = set(file.read().strip().split('\n'))

# Find items that are unique to day1 (not in day2)
unique_to_day1 = day1_items - day2_items

# Find items that are unique to day2 (not in day1)
unique_to_day2 = day2_items - day1_items

# Combine the unique items from both days
differences = unique_to_day1.union(unique_to_day2)

# Optionally, write the differences to a new file
with open('food_items.txt', 'w') as file:
    for item in differences:
        file.write(item + '\n')

