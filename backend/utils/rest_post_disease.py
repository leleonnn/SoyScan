import requests
import json

# URL of your Flask API endpoint
url = 'http://localhost:5000/api/disease'

# Sample JSON data for the request bodys
data = {
    "name": "Rust",
    "rarity": "Common",
    "symptoms": "Small, reddish-brown pustules on the leaf surface, Rust-colored spores on leaves",
    "explanation": "Rust is a fungal disease that affects soybean leaves. It is characterized by small, reddish-brown pustules on the leaf surface, often accompanied by rust-colored spores.",
    "treatment": "Scout the lower canopy of fields weekly, especially during wet weather after soybeans begin to flower. Soybean rust must be diagnosed at an early stage to be successfully managed. Cultural practices have had little effect on the disease. Soybean rust must be managed with the judicious use of fungicides applied properly and at the correct time. Soybean varieties that are resistant to soybean rust are in development.",
    "imageLink": "https://example.com/images.jpg"
}

# Convert the data to JSON format
json_data = json.dumps(data)

# Set the headers for the requests
headers = {'Content-Type': 'application/json'}

# Send the POST request
response = requests.post(url, data=json_data, headers=headers)

# Print the response
print(response.text)
