# # backend/config/database.py

# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base
# from config.settings import *

# DATABASE_URL = (
#     f"mysql+pymysql://"
#     f"{DB_USER}:{DB_PASSWORD}"
#     f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
# )

# engine = create_engine(DATABASE_URL)

# SessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine
# )

# Base = declarative_base()
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from config.settings import *

print("DB_HOST =", DB_HOST)
print("DB_PORT =", DB_PORT)
print("DB_USER =", DB_USER)
print("DB_PASSWORD =", DB_PASSWORD)
print("DB_NAME =", DB_NAME)

from urllib.parse import quote_plus

DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:"
    f"{quote_plus(DB_PASSWORD)}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

print("DATABASE_URL =", DATABASE_URL)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()