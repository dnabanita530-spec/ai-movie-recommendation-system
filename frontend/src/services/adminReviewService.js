import axios from "axios";

const API =
  "http://127.0.0.1:8000/admin/reviews";

export const getReviews =
  async () => {

    const res =
      await axios.get(API);

    return res.data;

  };

export const deleteReview =
  async (id) => {

    await axios.delete(
      `${API}/${id}`
    );

  };