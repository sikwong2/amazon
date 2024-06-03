# Amazon Scraper

This Python script scrapes product data from Amazon and generates curl commands for each product.

## Main Script

The main script uses the above functions to scrape product data from Amazon and generate curl commands. It takes three command-line arguments: the URL to send the requests to, the access token for authentication, and the number of curl commands to generate (most scrapes fail so expect there too much less than specified).

The script generates a random search term, sends a GET request to the Amazon search page for that term, and then selects a product from the search results. It then sends a GET request to the product page and scrapes the product data. The scripts also queries openai to generate a product description, because scraping that from amazon prove to be too difficult. Finally, it generates a curl command for the product and writes it to a .sh script.

The script repeats this process for the specified number of curl commands.

The script outputs the curl commands to curl_commands.sh.

See requirements.txt for python packages. 

## Example
```sh
python amazon-scraper.py http://localhost:3014/api/v0/product eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZTM1MTc2YTktOGEyOC00ZDFmLWI0ZmMtOGY3NTFmNDFiMjdiIiwiYWNjb3VudF9pZCI6ImY0ZGY4YjI2LTM0NzQtNDJkMC05YjM3LTlhODcwMDM5ZmJmOCIsImlhdCI6MTcxNzM2NjUzOH0.-3PFb0jXzjUTTfu5uVwhG3VPAoOXFSpuEa1o71mqXGo 100
```