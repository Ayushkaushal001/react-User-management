import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = ({ users = [], setUsers = () => {}, setReload = () => {} }) => {  
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://reqres.in/api/users/${id}`);
        if (res.data && res.data.data) {
          setUserData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://reqres.in/api/users/${id}`, userData);
      if (res.status === 200) {
        alert("User updated successfully!");
        navigate("/users");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="text-center">Loading user data...</p>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center text-primary mb-3">Edit User</h2>
        <form onSubmit={updateUser}>
          <div className="mb-3">
            <label className="form-label fw-bold">First Name</label>
            <input  type="text" name="first_name" className="form-control"  value={userData.first_name || ""}  onChange={handleChange}  />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Last Name</label>
            <input  type="text"  name="last_name" className="form-control"  value={userData.last_name || ""} onChange={handleChange}  />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input type="email"   name="email" className="form-control"  value={userData.email || ""}  onChange={handleChange}  />
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/users")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success"> Update User </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
