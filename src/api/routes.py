"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
    email = request.json.get('email')
    if email is not None:
        user = User.query.filter_by(email=email).first()
        if user is not None:
            return 'User already exists', 400
    else:
        return 'Email is required', 400
    password = request.json.get('password')
    if password is None:
        return 'Password is required', 400
    elif len(password) > 8:
        return 'Password should be max 8 characters long', 400
    name = request.json.get('name')
    if name is None:
        return 'Name is required', 400
    user = User()
    user.email = email
    user.name = name
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user.password = hashed_password
    user.is_active = True
    
    db.session.add(user)
    db.session.commit()

    return 'User created', 200

@api.route('/user/login', methods=['POST'])
def user_login():
    email = request.json.get('email')
    password = request.json.get('password')
    if email is None or password is None:
        return jsonify({'message': 'Email and password are required'}), 400
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 400
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid password'}), 400
    
    access_token = create_access_token(identity=email)
    return jsonify({'token': access_token, 'user': user.serialize()}), 200

@api.route('/userslist', methods=['GET'])
@jwt_required()
def all_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200