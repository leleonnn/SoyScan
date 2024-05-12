from application import app
from application import db
from bson.json_util import dumps
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, jsonify
import boto3
import cv2
import numpy as np
import os

@app.route("/", methods=["POST"])
def index():
    return "Hello, World!"


# Disease
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
    

# Soy
@app.route("/api/soy", methods=["POST"])
def predict_soy():
    try:
        body = request.json
        image_link = body["imageLink"]

        # ===
        # Machine Learning Process
        # ===

        is_soy_affected = False
        disease_name = 'Disease Name'

        if is_soy_affected:
            db.soy.insert_one({
                "_id": ObjectId(),
                "imageLink": image_link,
                "isSoyAffected": is_soy_affected,
                "diseaseName": disease_name
            })
            return jsonify({"message": "Prediction successful, your plant is diseased"})
        else:
            db.soy.insert_one({
                # "_id": ObjectId(),
                "imageLink": image_link,
                "isSoyAffected": is_soy_affected
            })
            return jsonify({"message": "Prediction successful, your plant is healthy"})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/soy/<id>", methods=["GET"])
def get_prediction_result(id):
    try:
        if id is None:
            return jsonify({"error": "Missing 'id' parameter"}), 400
        
        obj_id = ObjectId(id)

        soy = db.soy.find_one({'_id': obj_id})
        if soy:
            return dumps(soy)
        else:
            return jsonify({"error": f"Soy not available"}), 404

    except KeyError:
        return jsonify({"error": "Invalid request data"}), 400
    except Exception as e:
        # Log the error for debugging
        return jsonify({"error": f"Internal server error, {e}"}), 500


@app.route("/api/get-image", methods=["GET"])
def get_image_from_s3():
    try:
        if id is None:
            return jsonify({"error": "Missing 'id' parameter"}), 400
        
        s3 = boto3.client('s3')
        bucket_name = 'soyscan-bucket'
        image_key = 'frogeye_383_(Small).jpg'

        response = s3.get_object(Bucket=bucket_name, Key=image_key)
        image_data = response['Body'].read()

        # Convert image data into a numpy array for OpenCV
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        save_path = '/media/rayhanadi/SSD PNY/Kuliah/6th_semester/Senior Project/Soyscan-new/SoyScan/backend/static/images/'

        if not os.path.exists(save_path):
            os.makedirs(save_path)
        image_filename = os.path.join(save_path, 'image_from_s3.jpg')
        cv2.imwrite(image_filename, img)

        return jsonify({"Success": "Bisa cuy"}), 200 

    except KeyError:
        return jsonify({"error": "Invalid request data"}), 400
    except Exception as e:
        # Log the error for debugging
        return jsonify({"error": f"Internal server error, {e}"}), 500
    

      