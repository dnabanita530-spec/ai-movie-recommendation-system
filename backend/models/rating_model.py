from sqlalchemy import Column, Integer, String, Float
from config.database import Base

class Rating(Base):

    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    movie_id = Column(Integer)

    title = Column(String(255))

    rating = Column(Float)