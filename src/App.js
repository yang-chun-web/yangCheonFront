import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Detail from "./Routes/boards/Detail";
import Edit from "./Routes/boards/Edit";
import List from "./Routes/boards/List";
import Register from "./Routes/boards/Register";
import Home from "./Routes/Home";
import Login from "./Routes/user/Login";
import SignUp from "./Routes/admin/SignUp";
import MemberList from "./Routes/admin/MemberList";

import { useSetRecoilState } from "recoil";
import { access, admin } from "./atom";
import Paging from "./Routes/page/Page";

function App() {
  const setActiveUser = useSetRecoilState(access);
  const setAdmin = useSetRecoilState(admin);
  useEffect(() => {
    const refresh = async () => {
      const jsonResult = await fetch("/user/refresh")
        .then((res) => res.json())
        .catch((error) => console.log(error));
      if (jsonResult.admin) {
        setActiveUser(() => true);
        setAdmin(() => jsonResult.admin);
      }
    };
    refresh();
  }, [setActiveUser, setAdmin]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/boards/list" element={<List />} />
        <Route path="/boards/register" element={<Register />} />
        <Route path="/admin/signup" element={<SignUp />} />
        <Route path="/admin/memberList" element={<MemberList />} />
        <Route path="/user/paging" element={<Paging/>} />
        <Route path="/boards/:id" element={<Detail />} />
        <Route path="/boards/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
