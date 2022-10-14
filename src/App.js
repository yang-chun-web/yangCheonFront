import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./board/List";
import Home from "./Home";
import Login from "./user/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/board/list" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
