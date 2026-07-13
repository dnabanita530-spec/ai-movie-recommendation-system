import {
  useEffect,
  useState
} from "react";

import {
  deleteUser,
  getUsers,
  updateRole
} from "../../services/adminUserService";

import "./AdminUsers.css";

function AdminUsers() {

  const [users,
    setUsers] =
      useState([]);

  const [search,
    setSearch] =
      useState("");

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers =
    async () => {

      const data =
        await getUsers();

      setUsers(data);

    };

  const handleRole =
    async (id) => {

      await updateRole(id);

      loadUsers();

    };

  const handleDelete =
    async (id) => {

      if (

        window.confirm(
          "Delete user?"
        )

      ) {

        await deleteUser(id);

        loadUsers();

      }

    };

  const filteredUsers =
    users.filter(user =>

      user.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );

  return (

    <div className="adminUsersPage">

      <div className="adminHeader">

        <h1>
          👥 User Management
        </h1>

        <input
          type="text"
          placeholder="Search user..."
          className="searchBar"
          value={search}
          onChange={(e)=>

            setSearch(
              e.target.value
            )

          }
        />

      </div>

      <table className="usersTable">

        <thead>

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

            <th>Created</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredUsers.map(
            user => (

              <tr key={user.id}>

                <td>
                  {user.id}
                </td>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                {/* <td>
                  {user.role}
                </td> */}
                <td>
  <span
    className={
      user.role === "ADMIN"
        ? "roleBadgeAdmin"
        : "roleBadgeUser"
    }
  >
    {user.role}
  </span>
</td>

                <td>
                  {user.created_at}
                </td>

                <td>

                  <button
                    className="roleBtn"
                    onClick={() =>
                      handleRole(
                        user.id
                      )
                    }
                  >

                    Change Role

                  </button>

                  <button
                    className="deleteBtn"
                    onClick={() =>
                      handleDelete(
                        user.id
                      )
                    }
                  >

                    Delete

                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}

export default AdminUsers;