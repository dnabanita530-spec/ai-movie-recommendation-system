import axios from "axios";

const API =
  "http://127.0.0.1:8000/admin/users";

export const getUsers =
  async () => {

    const res =
      await axios.get(API);

    return res.data;

  };

export const updateRole =
  async (id) => {

    await axios.put(
      `${API}/${id}/role`
    );

  };

export const deleteUser =
  async (id) => {

    await axios.delete(
      `${API}/${id}`
    );

  };