import os, multiprocessing as mp
from video_processor import VideoProcessor
from flask import Flask, request, jsonify

app = Flask(__name__)
vp = VideoProcessor()

@app.route("/process_video", methods=["POST"])
def handle_request():
    path = os.environ.get("PRIVACYPAL_VIDEO_DIRECTORY", "/opt/privacypal/videos") # default to /opt/privacypal/videos
    if request.method == "POST":
        file = request.data.decode("utf-8")     # expects just the filename, such as "sample_2023-10-24.mp4"
        if os.path.isfile(f"{path}/{file}"):    # check if the file exists
            out = f"{path}/{file[:-4]}"
            if not os.path.isdir(out):
                os.mkdir(out)   # if the directory doesn't exist, make a directory with the name of the file we're going to be processing
            process = mp.Process(target=vp.process_INTERPOLATE, args=(f"{path}/{file}", f"{out}/temp.mp4", f"{out}/final.mp4", ))  # define a new process pointing to process_INTERPOLATE
            process.start() # start the process on another thread
            print(f"Process started on {file}")
            return "Success: file exists"
        else:
            return "Error: file not found"
    return "Error: request must be of type POST"

@app.route("/health", methods=["GET"])
def return_health():
    return jsonify({}), 200
