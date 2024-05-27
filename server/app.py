from flask import Flask
from flask_socketio import SocketIO, emit
from uuid import uuid4

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"
socketio = SocketIO(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@socketio.on("connect")
def handle_connect(auth):
    try:
        print(auth, uuid4())
        emit("connect", {"data": "Connected"})
    except Exception as e:
        print(e)

@socketio.on("message")
def handle_message(data):
    try:
        emit("message", {"data": data["data"]})
    except Exception as e:
        print(e)

@socketio.on("direct_message")
def handle_direct_message(data):
    try:
        emit("direct_message", {"data": data["data"]}, room=data["room"])
    except Exception as e:
        print(e)

@socketio.on("disconnect")
def handle_disconnect():
    try:
        print("Disconnected")
        # emit("disconnect", {"data": "Disconnected"})
    except Exception as e:
        print(e)
