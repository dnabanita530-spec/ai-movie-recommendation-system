from sqlalchemy.orm import Session

from models.recommendation_log_model import RecommendationLog


class RecommendationLogService:

    @staticmethod
    def save_log(
        db: Session,
        username,
        rec_type,
        movies
    ):

        log = RecommendationLog(

            username=username,

            recommendation_type=
            rec_type,

            movies=",".join(movies)

        )

        db.add(log)

        db.commit()