from sqlalchemy import Column, Integer, String
from config.database import Base

class Favorite(Base):

    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    movie_id = Column(Integer)

    title = Column(String(255))

    poster = Column(String(500))