import cv2
from ultralytics import YOLO

model = YOLO("app/resources/model/yolov8mfireandsmokedetection.pt")


def detect_fire_and_smoke(filename: str):
    cap = cv2.VideoCapture(f"app/static/videos/{filename}")
    img_array = []

    while cap.isOpened():
        success, frame = cap.read()

        if success:
            results = model(frame)
            annotated_frame = results[0].plot()
            img_array.append(annotated_frame)
        else:
            break

    cap.release()

    size = img_array[0].shape[1], img_array[0].shape[0]
    writer = cv2.VideoWriter(f"app/static/videos/{filename}", cv2.VideoWriter_fourcc(*"mp4v"), 25, size)
    for frame in img_array:
        img_n = cv2.resize(frame, size)
        writer.write(img_n)
    writer.release()
