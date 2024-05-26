from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin

load_dotenv()

os.environ['AWS_ACCESS_KEY_ID'] = os.getenv("AWS_ACCESS_KEY_ID")
os.environ['AWS_SECRET_ACCESS_KEY'] = os.getenv("AWS_SECRET_ACCESS_KEY")

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["MONGO_URI"] = os.getenv("MONGO_URI")


try:
    # Setup MongoDB
    mongodb_client = PyMongo(app)
    db = mongodb_client.db
    print("Connected to MongoDB")
except Exception as e:
    print("Error connecting to MongoDB:", e)

from application import routes