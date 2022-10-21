import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

const MemberList = () => {
  const [loading, setLoading] = useState(true);
  const [memberList, setMList] = useState([]);

  const fetchMList = async () => {
    const reqData = await fetch("/user/memberList");
    const body = await reqData.json();
    setMList(body);
  };

  useEffect(() => {
    fetchMList();
    setLoading(false);
  }, []);

  return (
    <div>
      <Header />
      <h2>회원 목록</h2>
      <br />
      <h6>아이디</h6>
      {loading
        ? ""
        : memberList.map((item) => (
            <span key={item._id}>
              {item.userId}
              <br />
            </span>
          ))}
    </div>
  );
};

export default MemberList;
