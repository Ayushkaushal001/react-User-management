import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = ({ reload, setReload }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page, reload]);

  const updateUserState = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };


  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, { method: "DELETE" });
      if (response.status === 204) {
        alert("User deleted successfully!");
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  const filteredUsers = users?.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User List</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user?.id} className="col-md-4 mb-4">
              <div className="card shadow-sm p-3 text-center user-card" 
                   style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                   onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                   onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
                <img src={user.avatar} alt={user.first_name} className="rounded-circle mb-2" width="80" />
                <h5 className="mb-1">{user.first_name} {user.last_name}</h5>
                <p className="text-muted">{user.email}</p>
                <div className="d-flex justify-content-center gap-2">
                  <button onClick={() => navigate(`/edit/${user.id}`)} className="btn btn-primary btn-sm">Edit</button>
                  <button onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No users found</p>
        )}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-secondary me-2" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
