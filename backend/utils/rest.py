import requests
import json

# URL of your Flask API endpoint
url = 'http://localhost:5000/api/disease'

# Sample JSON data for the request body
data = {
    "name": "Example Disease",
    "rarity": "Rare",
    "symptoms": "Symptom 1",
    "explanation": "Explanation of the disease",
    "treatment": "Treatment details",
    "imageLink": "https://example.com/image.jpg"
}

# Convert the data to JSON format
json_data = json.dumps(data)

# Set the headers for the request
headers = {'Content-Type': 'application/json'}

# Send the POST request
response = requests.post(url, data=json_data, headers=headers)

# Print the response
print(response.text)
