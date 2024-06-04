from bs4 import BeautifulSoup
import requests
import nltk
from nltk.corpus import words
from openai import OpenAI
import random
import re
import os
from dotenv import load_dotenv
import json
from fake_useragent import UserAgent
import argparse


# Function to extract Product Title
def get_title(soup):

    try:
        # Outer Tag Object
        title = soup.find("span", attrs={"id": "productTitle"})

        # Inner NavigableString Object
        title_value = title.string

        # Title as a string value
        title_string = title_value.strip()
        
        title_string = re.sub(r"[^a-zA-Z0-9 .,!?]", "", title_string)

    except AttributeError as e:
        title_string = ""

    return title_string


# Function to extract Product Price
def get_price(soup):

    try:
        price_tag = soup.find("span", attrs={"class": "a-price-whole"})
        price = price_tag.get_text()
        price_decimal_tag = soup.find("span", attrs={"class": "a-price-fraction"})
        price_decimal = price_decimal_tag.get_text()

        price = price + price_decimal
        price = float(price.replace(",", ""))

    except AttributeError:
        price = None

    return price


# Function to extract Product Rating
def get_rating(soup):
    return random.randint(0, 5)


# Function to extract Number of User Reviews
def get_review_count(soup):
    try:
        review_count = soup.find(
            "span", attrs={"id": "acrCustomerReviewText"}
        ).string.strip()

    except AttributeError:
        review_count = ""

    return review_count


# Function to extract Availability Status
def get_availability(soup):
    try:
        available = soup.find("div", attrs={"class": "availability"})
        available = available.find("span").string.strip()

    except AttributeError:
        available = ""

    return available


import json


def get_image_links(soup):
    pattern = r"https://m\.media-amazon\.com/images/I/.*"
    regex = re.compile(pattern)

    # Find all image tags on the page
    image_tags = soup.find_all("img")

    # Filter the image tags based on the regex and extract the URLs from the 'data-a-dynamic-image' attribute
    image_links = []
    for img in image_tags:
        if img.get("data-a-dynamic-image"):
            dynamic_images = json.loads(img.get("data-a-dynamic-image"))
            image_links.extend(
                [url for url in dynamic_images.keys() if regex.match(url)]
            )

    if not image_links:
        return None

    # Select five random images
    if len(image_links) > 5:
        image_links = random.sample(image_links, 5)

    return image_links


def get_description(title):
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You're job is to create amazon product listings. Do not respond to the user or ask questions. Just provide a description for the product.",
                },
                {
                    "role": "user",
                    "content": "Write a description for name = " + title,
                },
            ],
        )
        description = completion.choices[0].message.content
        description = re.sub(r"[^a-zA-Z0-9 .,!?]", "", description)
        
    except AttributeError:
        description = ""

    return description


def get_stock():
    return random.randint(0, 100)


def get_product_link(soup):
    # Regex to match Amazon product ID
    regex = re.compile(r"/dp/([A-Z0-9]{10})")

    # Find the first product link on the page that matches the regex
    product_link_tag = soup.find("a", href=regex)

    # If a product link was found, prepend the base URL and return the link
    if product_link_tag:
        product_link = "https://www.amazon.com" + product_link_tag["href"]
        print(product_link)
        return product_link

    # If no product link was found, return None
    return None


def generate_random_word():
    word_list = words.words()
    random_word = random.choice(word_list)
    return random_word


def generate_curl_command(
    url, bearer_token, name, price, stock, rating, image, category, description
):
    image_with_quotes = "[" + ", ".join([json.dumps(img) for img in image]) + "]"

    curl_command = f"""curl -k -X 'POST' \\\n  '{url}' \\\n  -H 'accept: application/json' \\\n  -H 'Authorization: Bearer {bearer_token}' \\\n  -H 'Content-Type: application/json' \\\n  -d '{{\n  "name": "{name}",\n  "price": {price},\n  "stock": {stock},\n  "rating": {rating},\n  "image": {image_with_quotes},\n  "category": {category},\n  "description": ["{description}"]\n}}'\n"""
    return curl_command


if __name__ == "__main__":
    
    # Create the parser
    parser = argparse.ArgumentParser(description="Generate curl commands")

    # Add the arguments
    parser.add_argument('url', type=str, help='The URL to send the requests to')
    parser.add_argument('access_token', type=str, help='The access token for authentication')
    parser.add_argument('number', type=int, help='The number of curl commands to generate')
    
    # Parse the arguments
    args = parser.parse_args()

    ua = UserAgent()

    if os.path.exists("curl_commands.sh"):
        os.remove("curl_commands.sh")
        
    load_dotenv()

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    nltk.download("words")

    for i in range(
        args.number
    ):  # Replace 10 with the number of curl commands you want to generate

        HEADERS = {
            "User-Agent": ua.random,
            "Accept-Language": "en-US, en;q=0.5",
        }
        random_word = generate_random_word()
        print()
        print(f"Iteration: {i}")
        print(f"Random Search Term: {random_word}")

        SEARCH_URL = "https://www.amazon.com/s?k=" + random_word

        searchpage = None
        try:
            searchpage = requests.get(SEARCH_URL, headers=HEADERS)
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            continue
        
        search_soup = BeautifulSoup(searchpage.content, "lxml")
        
        
        product_link = get_product_link(search_soup)

        # Skip this iteration if product_link is missing
        if not product_link:
            print("Product link not found")
            continue

        # HTTP Request
        webpage = None
        try:
            webpage = requests.get(product_link, headers=HEADERS)
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            continue

        # Soup Object containing all data
        soup = BeautifulSoup(webpage.content, "lxml")

        # Function calls to display all necessary product information
        name = get_title(soup)
        
        if name == "":
            name = random_word
        
        price = get_price(soup)
        stock = get_stock()
        rating = get_rating(soup)
        image = get_image_links(soup)
        category = f'["Generated"]'
        description = get_description(name)
    

        # Skip this iteration if any variable is missing
        if not all([name, price, stock, rating, image, category, description]):
            print("name=", name)
            print("price=", price)
            print("stock=", stock)
            print("rating=", rating)
            print("image=", image)
            print("category=", category)
            print("description=", description)
            print("Missing data")
            continue

        curl_command = generate_curl_command(
            args.url,
            args.access_token,
            name,
            price,
            stock,
            rating,
            image,
            category,
            description,
        )

        # Write the curl command to a .sh script
        with open("curl_commands.sh", "a") as file:
            file.write(curl_command + "\n")
        print("Curl command written to file\n")
