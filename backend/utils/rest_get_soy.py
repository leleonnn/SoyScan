import requests

# URL of your Flask API endpoint
url = 'http://localhost:5000/api/soy/6600a11fcb754d026bab9f6e'

headers = {'Content-Type': 'application/json'}

# Send the GET request with parameters
response = requests.get(url, headers=headers)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Print the response data
    print(response.json())
else:
    # Print an error message if the request was not successful
    print(f"Error: {response.status_code}, {response.text}")
