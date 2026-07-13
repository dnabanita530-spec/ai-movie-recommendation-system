from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from sqlalchemy.sql import func

from config.database import Base


class RecommendationLog(Base):

    __tablename__ = "recommendation_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String(100)
    )

    recommendation_type = Column(
        String(50)
    )

    movies = Column(
        String(1000)
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )