"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, Character, Planets, Vehicles, UserFavorites
from api.utils import APIException
from flask_cors import CORS


api = Blueprint('api', __name__)
CORS(api)


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        return jsonify({"msg": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "Email already exists"}), 409

    user = User(email=data["email"], password=data["password"], is_active=True)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    return jsonify(user.serialize()), 200


@api.route('/characters', methods=['GET'])
@jwt_required()
def get_characters():
    characters = Character.query.all()
    characters_serialized = [character.serialize() for character in characters]
    return jsonify(characters_serialized), 200

@api.route('/characters/<int:character_id>', methods=['GET'])
@jwt_required()
def get_character(character_id):
    character = Character.query.get(character_id)
    if not character:
        return jsonify({"msg": "Character not found"}), 404
    
    return jsonify(character.serialize()), 200


@api.route('/planets', methods=['GET'])
@jwt_required()
def get_planets():
    planets = Planets.query.all()
    planets_serialized = [planet.serialize() for planet in planets]
    return jsonify(planets_serialized), 200

@api.route('/planets/<int:planet_id>', methods=['GET'])
@jwt_required()
def get_planet(planet_id):
    planet = Planets.query.get(planet_id)
    if not planet:
        return jsonify({"msg": "Planet not found"}), 404
    
    return jsonify(planet.serialize()), 200


@api.route('/vehicles', methods=['GET'])
@jwt_required()
def get_vehicles():
    vehicles = Vehicles.query.all()
    vehicles_serialized = [vehicle.serialize() for vehicle in vehicles]
    return jsonify(vehicles_serialized), 200

@api.route('/vehicles/<int:vehicle_id>', methods=['GET'])
@jwt_required()
def get_vehicle(vehicle_id):
    vehicle = Vehicles.query.get(vehicle_id)
    if not vehicle:
        return jsonify({"msg": "Vehicle not found"}), 404
    
    return jsonify(vehicle.serialize()), 200


@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = UserFavorites.query.filter_by(user_id=user_id).all()
    return jsonify([favorite.serialize() for favorite in favorites]), 200

@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    user_id = get_jwt_identity()

    favorite = UserFavorites(
        user_id=user_id,
        character_id=data.get("character_id"),
        planet_id=data.get("planet_id"),
        vehicle_id=data.get("vehicle_id")
    )
    db.session.add(favorite)
    db.session.commit()

    return jsonify(favorite.serialize()), 201

@api.route('/favorites/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(id):
    favorite = UserFavorites.query.get(id)
    if not favorite:
        return jsonify({"msg": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"msg": "Favorite deleted"}), 200


