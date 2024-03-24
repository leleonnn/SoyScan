from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
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