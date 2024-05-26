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
from ultralytics import YOLO
from flask_cors import CORS, cross_origin

@app.route("/", methods=["POST"])
def index():
    return "Hello, World!"


# Disease
@app.route("/api/disease", methods=["POST"])
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
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
    
@app.route("/api/diseases", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_all_diseases():
    try:
        diseases = db.disease.find()
        disease_list = list(diseases)
        return dumps(disease_list), 200

    except Exception as e:
        # Log the error for debugging
        return jsonify({"error": str(e)}), 500

    

# Soy
@app.route("/api/soy", methods=["POST"])
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
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

        current_dir = os.path.dirname(__file__)
        save_path = os.path.join(current_dir, '..', 'static', 'models', 'classify_model.pt')
        save_path = os.path.normpath(save_path)

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
    

@app.route("/api/predict-image-from-s3", methods=["GET"])
@cross_origin(supports_credentials=True)
def predict_image_from_s3():
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

        current_dir = os.path.dirname(__file__)
        model_path = os.path.join(current_dir, '..', 'static', 'models', 'classify_model.pt')
        model_path = os.path.normpath(model_path)

        model = YOLO(model_path)  # load a custom model

        # Predict with the model
        results = model(img)  # predict on an image

        names_dict = results[0].names
        probs = results[0].probs.top1

        print(names_dict)
        print(probs)

        return jsonify({"Success": names_dict[probs]}), 200 

    except KeyError:
        return jsonify({"error": "Invalid request data"}), 400
    except Exception as e:
        # Log the error for debugging
        return jsonify({"error": f"Internal server error, {e}"}), 500
    
@app.route("/api/predict-disease-by-image-key/<key>", methods=["GET"])
@cross_origin(supports_credentials=True)
def predict_disease_by_image_key(key):
    try:
        if id is None:
            return jsonify({"error": "Missing 'id' parameter"}), 400
        
        s3 = boto3.client('s3')
        bucket_name = 'soyscan-bucket'
        image_key = key

        response = s3.get_object(Bucket=bucket_name, Key=image_key)
        image_data = response['Body'].read()

        # Convert image data into a numpy array for OpenCV
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        current_dir = os.path.dirname(__file__)
        model_path = os.path.join(current_dir, '..', 'static', 'models', 'classify_model.pt')
        model_path = os.path.normpath(model_path)

        model = YOLO(model_path)  # load a custom model

        # Predict with the model
        results = model(img)  # predict on an image

        # # Check if the prediction result higher than threshold
        # for prob in results[0].probs:
        #     print(prob)
        #     if prob < 0.4:
        #         return jsonify({"Success": "Soybean Leaf is not detected"}), 200 

        names_dict = results[0].names
        probs = results[0].probs.top1

        print(names_dict)
        print(probs)

        return jsonify({"Success": names_dict[probs]}), 200 

    except KeyError:
        return jsonify({"error": "Invalid request data"}), 400
    except Exception as e:
        # Log the error for debugging
        return jsonify({"error": f"Internal server error, {e}"}), 500