import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import { mediaStyle } from "../../styles/common";
import { deleteUser, TestMember} from "../../api";
import { useRecoilValue } from "recoil";
import { admin } from "../../atom";
import Paging from "../page/Page";

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
  const [page, setPage] = useState(1); // 현재페이지
  const [total, setTotal] = useState(0); // 전체 페이지
  const [size, setSize] = useState(2); // 보여줄 항목 개수
  const [maxPage, setMaxPage] = useState(0); // 한 페이지에 보여줄 페이지 개수
  //const [getData, setData] = useState(0);

  const pageData = {
    page : page,
    total : total,
    size : size,
    maxPage : maxPage
  }

  const fetchMemberList = async () => {
    const reqData = await fetch("/user/memberList");
    const body = await reqData.json();
    setMemberList(body);
  };
  
  const TestMemberList = async () => {
    const reqData = await TestMember(pageData);
    console.log(reqData);
    const body = await reqData.data.listData;
    const reqPageData = reqData.data.pageData;
    setMemberList(body);

    setPage(reqPageData.page);
    setTotal(reqPageData.total);
    setSize(reqPageData.size);
    setMaxPage(reqPageData.maxPage);

  };

  const getData = (getData) => {
    setPage(getData);
    console(getData);
  }


  const onDeleteClick = (event) => {
    const target = event.target.id;
    deleteUser({ userObjectId: event.target.id });
    const list = memberList.filter((item) => item._id !== target);
    setMemberList(list);
  };

  useEffect(() => {
    // fetchMemberList();
    TestMemberList();
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      {/* {adminCheck ? ( */}
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
        <Paging pageData={pageData} getData={getData}  />
      {/* ) : ( */}
        {/* "" */}
      {/* )} */}
    </>
  );
};

export default MemberList;
