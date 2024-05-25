import json

from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
import uuid

from app import video_utils, detection

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


@app.errorhandler(404)
def not_found():
    return make_response(jsonify({"error": "Not found"}), 404)


@app.route("/api/v1/upload", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return make_response(jsonify({"error", "Video not specified"}), 500)
    video = request.files["video"]
    if video.filename == "":
        return make_response(jsonify({"error", "Invalid video"}), 500)
    video_id = ""
    if video and video_utils.is_allowed_video(video.filename):
        video_name = video.filename.rsplit(".", 1)[0]
        video_extension = video.filename.rsplit(".", 1)[1]
        video_id = video_name + uuid.uuid4().__str__() + "." + video_extension
        video.save("app/static/videos/" + video_id)

    return make_response(jsonify({"video_id": video_id}), 201)


@app.route("/api/v1/detect", methods=["PUT"])
def detect():
    dto = json.loads(request.data)
    if dto["video_id"]:
        detection.detect_fire_and_smoke(dto["video_id"])
        return make_response(jsonify({"success": True}), 200)
    else:
        return make_response(jsonify({"error", "Not provided video_id"}), 500)


if __name__ == "__main__":
    app.run(port=8080, debug=True)
