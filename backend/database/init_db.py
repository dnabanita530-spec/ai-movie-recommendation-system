# database/init_db.py

from config.database import Base, engine
from models.user_model import User

Base.metadata.create_all(bind=engine)

print("Database initialized successfully")