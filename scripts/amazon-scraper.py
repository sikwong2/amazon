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
import google.generativeai as genai

# LINKS:
# https://oxylabs.io/blog/how-to-scrape-amazon-product-data
# https://www.digitalocean.com/community/tutorials/scrape-amazon-product-information-beautiful-soup#python-script-to-extract-product-details-across-multiple-webpages
# https://www.scrapingbee.com/blog/web-scraping-amazon/#how-to-extract-amazoncomhttpamazoncom-product-information

# Function to extract Product Title
def get_title(soup):

    try:
        # Outer Tag Object
        title = soup.find("span", attrs={"id": "productTitle"})

        # Inner NavigableString Object
        title_value = title.string

        # Title as a string value
        title_string = title_value.strip()
        
        # title_string = re.sub(r"[^a-zA-Z0-9 .,!?\-/&]", "", title_string)

    except AttributeError as e:
        print('get_title() failed: ', e)
        title_string = ""

    print('title_string: ', title_string.replace("'", "’").replace("\"", "’"))
    return json.dumps(title_string.replace("'", "’"))[1:-1]   # remove extra quotes

# Function to extract Product Price
def get_price(soup):

    try:
        price_tag = soup.find("span", attrs={"class": "a-price-whole"})
        price = price_tag.get_text()
        price_decimal_tag = soup.find("span", attrs={"class": "a-price-fraction"})
        price_decimal = price_decimal_tag.get_text()

        price = price + price_decimal
        price = float(price.replace(",", ""))

    except AttributeError as e:
        # if can't scrape price, generate random price
        print('get_price() error: ', e)
        price = round(random.uniform(0.99, 9999.99), 2)

    print('price: ', price)
    return price

# Function to extract Product Rating
# TODO: sometimes not finding rating?
def get_rating(soup):
    try:
        rating = soup.find("i", attrs={'class':'a-size-base a-color-base'}).string.strip()
    except AttributeError:
        try:
            rating = soup.find("span", attrs={'class':'a-icon-alt'}).string.strip()
        except:
            rating = ""

    print('OGrating: ', rating)
    # if cannot find rating, randomize one
    if (re.match(r'^[0-5]\.[0-9]?.*$', rating) == None):
        rating = str(round(random.uniform(3.0, 5.0), 1))

    match = re.match(r'^([0-5]\.[0-9]?).*$', rating)
    print('rating: ', match.group(0))
    return rating.replace(' out of 5 stars', '')

# Function to extract Number of User Reviews
def get_review_count(soup):
    try:
        review_count = soup.find(
            "span", attrs={"id": "acrCustomerReviewText"}
        ).string.strip()

    except AttributeError:
        review_count = ""

    print('review_count: ', review_count)
    return review_count

# Function to extract Availability Status
def get_availability(soup):
    try:
        available = soup.find("div", attrs={"id": "availability"})
        available = available.find("span").string.strip()

    except AttributeError:
        available = ""

    print(f"available: *{available}*")
    return available

# Function to extract Product Images
def get_image_links(searchpage):
    # Find hi-res images
    image_links = re.findall('"hiRes":"(.+?)"', searchpage.text)

    print('images: ', image_links[:10])
    # max of 10 images
    return list(set(image_links[:10]))

# Function to AI generate product description
def generate_description(title):
    try:
        # Google's Gemini model
        # https://ai.google.dev/gemini-api/docs/quickstart
        model = genai.GenerativeModel('gemini-1.5-flash')
        description = model.generate_content(f'Your job is to create Amazon "About this item" product descriptions. For each product, create multiple short descriptions of 1-2 lines highlighting product features and providing extra information about the product for potential buyers. Please generate the short descriptions in the format of a Python dictionary of strings, with each string being a description about some product I will specify below. Make sure each short description is encapsulated in its own double quotes and separated by commas in the Python list. Your output should something like this: "["some description here", "another description here", "another description here"]". Notice the use of square brackets and double quotes. Do not respond with any questions or remarks, only the python dictionary. Do not include any extra labels or information that is not relevant to the product description. Here is the product "{title}"')
        description = description.text

        # Clean text
        for str in description:
            str = json.dumps(str.replace("'", "’").strip())
        
    except AttributeError:
        description = ""

    print('description has been generated')
    return description

# Function to extract product info
def get_about_this_item(soup, title):
    about_section = []
    
    try:
        # Locate the unordered list
        about_list = soup.find('ul', attrs={'class': 'a-unordered-list a-vertical a-spacing-mini'})
        # Find all list items within the unordered list
        items = about_list.find_all('li', attrs={'class': 'a-spacing-mini'})
        
        # Loop through each list item and extract the text
        for item in items:
            text = item.find('span', class_='a-list-item').get_text(strip=True).replace("'", "’")
            about_section.append(text)
    
    except:
        try:
            # try to get book description
            book_description_div = soup.find('div', attrs={"id": "bookDescription_feature_div"})
            book_description_texts = book_description_div.find_all('span')
            book_description = ""
            for text in book_description_texts:
                book_description += text.get_text(strip=True) + " "
            about_section.append(book_description.replace("'", "’"))
        except:
            try: 
                # try to get product description
                product_description = soup.find('div', attrs={'id': 'productDescription'}).string.strip()
                about_section.append(product_description.replace("'", "’"))
            except:
                # If can't find product description or book description, use Gemini to generate one
                about_section.append(generate_description(title).replace("'", "’"))

    # If can't find about-this-item or product description, generate a product description
    if(about_section == [] or about_section == ['']): return generate_description(title)

    print('about_section: ', about_section)
    return json.dumps(about_section)

# Function to generate random product stock
def get_stock(soup):
    availability = get_availability(soup)
    if(availability == '' or availability == 'In Stock'):
        return random.randint(10, 1000)
    else:
        return random.randint(1, 10)

# Function to extract best seller categories
def get_best_sellers(soup):
    categories = []
    best_seller_ranks = []
    try:
        # Find parent of Best Sellers Rank under Product Details
        best_sellers_li = soup.find('span', attrs={"class": "a-text-bold"}, string=' Best Sellers Rank: ').parent
        
        # Find first category
        first_rank = best_sellers_li.find(string=re.compile(r'#\d+[,\d]* in'))
        if(first_rank):
            # Remove rank text
            cleaned_first_category = re.sub(r'#\d+[,\d]*\s+in\s+', '', first_rank.strip())
            # Remove parenthesis
            cleaned_first_category = re.sub(r'\(.*\)?', '', cleaned_first_category)
            categories.append(cleaned_first_category.replace("'", "’").strip())

        # Find rest of best seller ranks in list
        best_seller_ranks = best_sellers_li.find_all('li')

    except AttributeError as e:
        print('error getting best sellers1: ', e)

        try:
            # Find Best Sellers Rank row in the Item details table
            best_sellers_rank_row = soup.find("th", string=" Best Sellers Rank ").find_next('td')

            # Find best seller ranks in table row
            best_seller_ranks = best_sellers_rank_row.find_all('span')

        except AttributeError as e:
            print('error getting best sellers2: ', e)
    
    # Clean up category text
    for category in best_seller_ranks:
        category_text = category.get_text()
        # Remove rank text
        cleaned_category = re.sub(r'#\d+[,\d]*\s+in\s+', '', category_text.strip())
        # Remove parenthesis
        cleaned_category = re.sub(r'\(.*\)?', '', cleaned_category)
        
        categories.append(cleaned_category.replace("'", "’").strip())

    print('best_sellers: ', categories)
    return categories

# Function to extract categories from breadcrumb
def get_breadcrumb(soup):
    categories = []

    try:
        # Find breadcrumb div 
        breadcrumb_div = soup.find('div', attrs={"id": "wayfinding-breadcrumbs_feature_div"})

        # Find categories in breadcrumb list, skipping commas
        breadcrumb_categories = breadcrumb_div.find_all('a', attrs={'class': 'a-link-normal a-color-tertiary'})

        for category in breadcrumb_categories:
            # Strip text away 
            category_text = category.get_text()
            categories.append(category_text.replace("'", "’").strip())

    except AttributeError as e:
        print('error getting breadcrumb categories: ', e)

    print('breadcrumb: ', categories)
    return categories

# Function to extract product categories
def get_categories(soup):
    best_seller_categories = get_best_sellers(soup)
    breadcrumb_categories = get_breadcrumb(soup)
    categories_set = list(set(best_seller_categories + breadcrumb_categories))
    random.shuffle(categories_set)

    return json.dumps(categories_set + ["Generated"])

# Function to extract product link
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

# Function to generate a random word
def generate_random_word():
    word_list = words.words()
    random_word = random.choice(word_list)
    return random_word

# Function to generate curl commands
def generate_curl_command(
    url, bearer_token, name, price, stock, rating, image, category, description
):
    image_with_quotes = "[" + ", ".join([json.dumps(img) for img in image]) + "]"

    curl_command = f"""curl -k -X 'POST' \\\n  '{url}' \\\n  -H 'accept: application/json' \\\n  -H 'Authorization: Bearer {bearer_token}' \\\n  -H 'Content-Type: application/json' \\\n  -d '{{\n  "name": "{name}",\n  "price": {price},\n  "stock": {stock},\n  "rating": {rating},\n  "image": {image_with_quotes},\n  "category": {category},\n  "description": {description}\n}}'\n"""
    return curl_command


if __name__ == "__main__":
    
    # Create the parser
    parser = argparse.ArgumentParser(description="Generate curl commands")

    # Add the arguments
    parser.add_argument('url', type=str, help='The URL to send the requests to')
    parser.add_argument('access_token', type=str, help='The access token for authentication')
    parser.add_argument('number', type=int, help='The number of curl commands to generate')
   
    # url
    # https://ucsc-amazon.com/vendorapi/v0/product
    # access_token
    # eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjI4ZmFhNGMtYWM0YS00MjhmLWI1MTEtYWNjNmNhOTFmM2ZjIiwiYWNjb3VudF9pZCI6IjMzZDY0NmRmLTFmNGEtNDEzMC04NTkwLTcyMGY0NWJhNDE3OSIsImlhdCI6MTcxNzcwOTE4OX0.ZaWmIhXK6EJTt1-Kt-0aJa4BiPsuRPMcjA1aQ9AjCdY

    # Parse the arguments
    args = parser.parse_args()

    if os.path.exists("curl_commands.sh"):
        os.remove("curl_commands.sh")
        
    load_dotenv()

    # set API key
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    # client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    nltk.download("words")

    for i in range(
        args.number
    ):  # Replace 10 with the number of curl commands you want to generate

        ua = UserAgent()

        HEADERS = {
            'User-Agent': ('Mozilla/5.0 (X11; Linux x86_64)'
                    'AppleWebKit/537.36 (KHTML, like Gecko)'
                    'Chrome/44.0.2403.157 Safari/537.36'),
            # Random user-agent fails too often
            # "User-Agent": ua.random,
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
            print("Failed to scrape title, probably not a product page. Skipping")
            continue        # chat/gemini can't generate description off of one word
        
        price = get_price(soup)
        stock = get_stock(soup)
        rating = get_rating(soup)
        image = get_image_links(webpage)
        category = get_categories(soup)
        description = get_about_this_item(soup, name)

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
