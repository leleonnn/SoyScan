from ultralytics import YOLO
import numpy as np
import cv2

image_source = 'static/images/sample_image.jpg'
image =  cv2.imread(image_source,0)

def classify_soy_image(image):
    model = YOLO('static/models/classify_model.pt')  # load a custom model

    # Predict with the model
    results = model(image)  # predict on an image

    return results

print(classify_soy_image(image))