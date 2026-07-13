from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from config.dependencies import get_db

from schemas.auth_schema import (
    SignupSchema,
    LoginSchema
)

from services.auth_service import (
    AuthService
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/signup")
def signup(
    data: SignupSchema,
    db: Session = Depends(get_db)
):
    return AuthService.signup(
        db,
        data
    )

@router.post("/login")
def login(
    data: LoginSchema,
    db: Session = Depends(get_db)
):
    return AuthService.login(
        db,
        data
    )