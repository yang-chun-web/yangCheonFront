import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./Routes/board/List";
import Register from "./Routes/board/Register";
import Home from "./Routes/Home";
import Login from "./Routes/user/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/board/list" element={<List />} />
        <Route path="/board/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
