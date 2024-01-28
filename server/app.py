from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/register", methods=["POST"])
def register_user():
    employee_id = request.json["employee_id"]
    employee_name = request.json["employee_name"]
    employee_position = request.json["employee_position"]
    employee_salary = request.json["employee_salary"]

    user_exists = User.query.filter_by(employee_id=employee_id).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    new_user = User(employee_id=employee_id, employee_name=employee_name, employee_position=employee_position, employee_salary=employee_salary)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
    })

@app.route("/userDetails", methods=["GET"])
def get_all_users():
    users = User.query.all()
    user_details = [{"id": user.id, "employee_id": user.employee_id, "employee_name":user.employee_name, "employee_position":user.employee_position, "employee_salary":user.employee_salary} for user in users]
    return jsonify(user_details)


@app.route("/erase-data", methods=["POST"])
def erase_data():
    try:
        # Delete all records from the User table
        db.session.query(User).delete()
        db.session.commit()

        return jsonify({"message": "All data erased successfully."}), 200
    except Exception as e:
        print(f"Error erasing data: {e}")
        db.session.rollback()
        return jsonify({"error": "Failed to erase data."}), 500

@app.route('/userDetails/<string:employee_id>', methods=['DELETE'])
def delete_user(employee_id):
    try:
        # Assuming employee_id is a valid employee ID
        user = User.query.filter_by(employee_id=employee_id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "User deleted successfully"})
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        print(f"Error deleting user: {e}")
        db.session.rollback()
        return jsonify({"error": "Failed to delete user"}), 500
    
@app.route('/modify-user/<string:employee_id>', methods=['PUT'])
def modify_user(employee_id):
    try:
        # Assuming employee_id is a valid employee ID
        user = User.query.filter_by(employee_id=employee_id).first()

        if not user:
            return jsonify({"error": "User not found"}), 404
        if 'employee_position' in request.json:
            user.employee_position = request.json['employee_position']
        if 'employee_salary' in request.json:
            user.employee_salary = request.json['employee_salary']

        db.session.commit()

        return jsonify({"message": "User modified successfully"})

    except Exception as e:
        print(f"Error modifying user: {e}")
        db.session.rollback()
        return jsonify({"error": "Failed to modify user"}), 500    



if __name__ == "__main__":
    app.run(debug=True)
