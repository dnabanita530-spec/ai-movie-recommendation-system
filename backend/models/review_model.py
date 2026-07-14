from sqlalchemy import Column, Integer, String, Text
from config.database import Base

class Review(Base):

    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    movie_id = Column(Integer)

    title = Column(String(255))

    review = Column(Text)