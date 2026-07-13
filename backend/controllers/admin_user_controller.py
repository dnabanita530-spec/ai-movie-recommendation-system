from fastapi import APIRouter
from config.database import SessionLocal
from models.user_model import User

router = APIRouter(
    prefix="/admin/users",
    tags=["Admin Users"]
)
# Get All Users
@router.get("/")
def get_users():

    db = SessionLocal()

    users = db.query(User).all()

    result = []

    for user in users:

        result.append({

            "id": user.id,

            "name": user.name,

            "email": user.email,

            "role": user.role,

            "created_at":
            str(user.created_at)

        })

    return result
  
#  Change Role 
@router.put("/{user_id}/role")
def update_role(
    user_id: int
):

    db = SessionLocal()

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {
            "message":
            "User not found"
        }

    user.role = (

        "ADMIN"

        if user.role == "USER"

        else "USER"

    )

    db.commit()

    return {
        "success": True
    }
    
    # DElete User
@router.delete("/{user_id}")
def delete_user(
    user_id: int
):

    db = SessionLocal()

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {
            "message":
            "User not found"
        }

    db.delete(user)

    db.commit()

    return {
        "success": True
    }