import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";

function App() {
  const [reload, setReload] = useState(false); // ✅ Reload state for refreshing users

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList reload={reload} setReload={setReload} />} />
        <Route path="/edit/:id" element={<EditUser setReload={setReload} />} />
      </Routes>
    </Router>
  );
}

export default App;
