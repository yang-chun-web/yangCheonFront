import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./Routes/boards/Detail";
import Edit from "./Routes/boards/Edit";
import List from "./Routes/boards/List";
import Register from "./Routes/boards/Register";
import Home from "./Routes/Home";
import Login from "./Routes/user/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/boards/list" element={<List />} />
        <Route path="/boards/register" element={<Register />} />
        <Route path="/boards/:id" element={<Detail />} />
        <Route path="/boards/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
