import axios from "axios";

const API =
"http://127.0.0.1:8000/admin/analytics";

export const getAnalytics =
async () => {

  const res =
    await axios.get(API);

  return res.data;

};