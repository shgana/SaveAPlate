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
with open('food_items.txt', 'w') as file:
    for item in food_items:
        food_name = item.get_text(strip=True)
        file.write(food_name + '\n')

print('Food items have been saved to food_items.txt')
