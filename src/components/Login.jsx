import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://reqres.in/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>

      {error && <p className="text-danger text-center">{error}</p>}

    
      <form onSubmit={handleLogin} className="border p-4 shadow rounded bg-light">
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            Email
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input type="email" id="email"placeholder="Enter your email" className="form-control"value={email} onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
        </div>

     
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input type="password" id="password" placeholder="Enter your password" className="form-control"value={password}onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        <button className="btn btn-primary w-100 fw-bold" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
