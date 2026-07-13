from sqlalchemy.orm import Session

from models.user_model import User

from utils.password_handler import (
    hash_password,
    verify_password
)

from utils.jwt_handler import (
    create_access_token
)


class AuthService:

    @staticmethod
    def signup(db: Session, data):

        print("STEP 1")

        existing_user = db.query(User).filter(
            User.email == data.email
        ).first()

        print("STEP 2")

        if existing_user:
            return {
                "success": False,
                "message": "Email already exists"
            }

        user = User(
    name=data.name,
    email=data.email,
    password=hash_password(data.password),

    role="user"
)

        print("STEP 3")

        db.add(user)

        db.commit()

        db.refresh(user)

        print("STEP 6")

        return {
            "success": True,
            "message": "Signup is successfully!!!"
        }

    @staticmethod
    def login(db: Session, data):

        user = db.query(User).filter(
            User.email == data.email
        ).first()

        if not user:
            return {
                "success": False,
                "message": "Invalid Email"
            }

        if not verify_password(
            data.password,
            user.password
        ):
            return {
                "success": False,
                "message": "Invalid Password"
            }

        token = create_access_token(
            {
                "user_id": user.id,
                "email": user.email,
                "role": user.role
            }
        )

        return {
    "access_token": token,
    "token_type": "bearer",
    "success": True,
    "message": "Login is successfully!!!",

    "role": user.role,

    "username": user.name,

    "email": user.email
}