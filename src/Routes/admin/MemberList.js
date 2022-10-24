import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import { mediaStyle } from "../../styles/common";
import { deleteUser } from "../../api";
import { useRecoilValue } from "recoil";
import { admin } from "../../atom";

const Block = styled.div`
  ${mediaStyle}
`;

const Wrapper = styled.div`
  position: relative;
  padding: 1rem;
  background-color: #ffffffee;
  z-index: 0;
  height: 100%;
  min-height: 600px;
`;

const TextCard = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
`;

const DeleteBtn = styled.span`
  cursor: pointer;
`;

const MemberList = () => {
  const adminCheck = useRecoilValue(admin);
  const [loading, setLoading] = useState(true);
  const [memberList, setMemberList] = useState([]);

  const fetchMemberList = async () => {
    const reqData = await fetch("/user/memberList");
    const body = await reqData.json();
    setMemberList(body);
  };

  const onDeleteClick = (event) => {
    const target = event.target.id;
    deleteUser({ userObjectId: event.target.id });
    const list = memberList.filter((item) => item._id !== target);
    setMemberList(list);
  };

  useEffect(() => {
    fetchMemberList();
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      {adminCheck ? (
        <Block>
          <Wrapper>
            {loading
              ? ""
              : memberList.map((item) => (
                  <TextCard key={item._id}>
                    <UserInfo>
                      <Title>{item.userId}</Title>
                    </UserInfo>
                    <DeleteBtn id={`${item._id}`} onClick={onDeleteClick}>
                      ❌
                    </DeleteBtn>
                  </TextCard>
                ))}
          </Wrapper>
        </Block>
      ) : (
        ""
      )}
    </>
  );
};

export default MemberList;
