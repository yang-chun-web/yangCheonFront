import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./Routes/board/List";
import Home from "./Routes/Home";
import Login from "./Routes/user/Login";

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
