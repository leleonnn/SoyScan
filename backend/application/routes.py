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

        body = request.json
        name = body["name"]
        rarity = body["rarity"]
        symptoms = body["symptoms"]
        explanation = body["explanation"]
        treatment = body["treatment"]
        imageLink = body["imageLink"]

        db.disease.insert_one({
            # "_id": ObjectId(),
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
    

@app.route("/api/disease/<name>", methods=["GET"])
def get_disease_by_name(name):
    try:
        if name is None:
            return jsonify({"error": "Missing 'name' parameter"}), 400

        diseases = db.disease.find_one({'name': name})
        if diseases:
            return dumps(diseases)
        else:
            return jsonify({"error": f"No disease found with name '{name}'"}), 404

    except KeyError:
        return jsonify({"error": "Invalid request data"}), 400
    except Exception as e:
        # Log the error for debugging
        return jsonify({"error": "Internal server error"}), 500


    

      