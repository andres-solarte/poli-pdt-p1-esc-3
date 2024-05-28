from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from uuid import uuid4

app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = "secret"
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/auth/login", methods=["POST"])
def auth_login():
    data = request.json
    socketio.emit("userJoined", data)

    return jsonify(data)

@app.route("/auth/logout", methods=["POST"])
def auth_logout():
    data = request.json
    socketio.emit("userLeft", data)

    return jsonify(data)

@socketio.on("connect")
def handle_connect(auth):
    try:
        emit("connected", {"uuid": str(uuid4())})
    except Exception as e:
        print(e)

@socketio.on("disconnect")
def handle_disconnect():
    try:
        print("Disconnected")
        # emit("disconnect", {"data": "Disconnected"})
    except Exception as e:
        print(e)
