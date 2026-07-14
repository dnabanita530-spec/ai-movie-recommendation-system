from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from config.database import Base


class WatchHistory(Base):

    __tablename__ = "watch_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    movie_id = Column(
        Integer,
        nullable=False
    )

    title = Column(
        String(255),
        nullable=False
    )

    poster = Column(
        String(500)
    )

    watched_at = Column(
        DateTime,
        server_default=func.now()
    )