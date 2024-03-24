from application import app
from application import db
from bson.json_util import dumps
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, jsonify

@app.route("/", methods=["POST"])
def index():
    return "Hello, World!"

@app.route("/api/disease", methods=["POST"])
def add_disease():
    try:

        body = request.json()
        name = body["name"]
        rarity = body["rarity"]
        symptoms = body["symptoms"]
        explanation = body["explanation"]
        treatment = body["treatment"]
        imageLink = body["imageLink"]

        db.disease.insert_one({
            "_id": ObjectId(),
            "name": name,
            "rarity": rarity,
            "symptoms": symptoms,
            "explanation": explanation,
            "treatment": treatment,
            "imageLink": imageLink
        })
        return jsonify({"message": "Disease added successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})
    

      