from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from uuid import uuid4
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = "secret"
socketio = SocketIO(app, cors_allowed_origins="*")

users = []
messages = []
rooms = []

def get_user_by_email(email):
    for user in users:
        if user.get("email") == email:
            return user

    return None

def get_messages_by_room(room):
    messages_in_room = []

    for msg in messages:
        if msg.get("to") == room:
            messages_in_room.append(msg)

    return messages_in_room


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/auth/login", methods=["POST"])
def auth_login():
    data = request.json
    user = get_user_by_email(data.get("email"))

    if user == None:
        users.append(data)

    socketio.emit("userJoined", data)
    socketio.emit("usersList", users)

    return jsonify(data)


@app.route("/auth/logout", methods=["POST"])
def auth_logout():
    data = request.json
    email = data.get("email")

    if email:
        for user in users:
            if user.get("email") == email:
                users.remove(user)
                socketio.emit("userLeft", user)
                socketio.emit("usersList", users)
                break

    return jsonify(data)


@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(users)


@app.route("/messages", methods=["POST"])
def send_message():
    data = request.json
    to = data.get("to")
    user = get_user_by_email(data.get("from"))

    if user:
        now = datetime.now()
        print('Date and Time is:', now)

        timestamp = datetime.timestamp(now)
        print("timestamp =", timestamp)

        message = {
            "from": user,
            "to": to,
            "message": data.get("message"),
            "timestamp": timestamp
        }

        messages.append(message)
        socketio.emit("newMessage", message)

    return jsonify({"status": "ok"})


@app.route("/messages/<room>", methods=["GET"])
def get_messages(room):
    return jsonify(get_messages_by_room(room))


@app.route("/rooms", methods=["POST"])
def create_room():
    data = request.json
    users = data.get("users")

    users_in_room = []

    for user in users:
        user_in_room = get_user_by_email(user)

        if user_in_room:
            users_in_room.append(user_in_room)

    room = {
        "id": str(uuid4()),
        "users": users_in_room
    }

    rooms.append(room)
    socketio.emit("newRoom", room)

    return jsonify(room)


@app.route("/rooms/<email>", methods=["GET"])
def get_rooms(email):
    user_rooms = []

    for room in rooms:
        for user in room.get("users"):
            if user.get("email") == email:
                user_rooms.append(room)

    return jsonify(user_rooms)


@socketio.on("connect")
def handle_connect():
    print("Connected")

    try:
        join_room("general")
        emit("connected", {"uuid": str(uuid4())})
    except Exception as e:
        print(e)

@socketio.on("disconnect")
def handle_disconnect():
    try:
        leave_room("general")
        print("Disconnected")
        # emit("disconnect", {"data": "Disconnected"})
    except Exception as e:
        print(e)
