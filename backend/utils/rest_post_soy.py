import requests
import json

# URL of your Flask API endpoint
url = 'http://localhost:5000/api/soy'

# Sample JSON data for the request bodys
data = {
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
