import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Block = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px #5e5e5e86;
  z-index: 5;
`;

const Wrapper = styled.div`
  padding: 1rem;
  background-color: #ffffffee;
  height: 88vh;
  z-index: 0;
  overflow-y: scroll;
`;

const TextCard = styled(Link)`
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: #000000dd;
    color: white;
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CreatedAt = styled.span`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;



const List = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [page,setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [cPage, setCpage] = useState(5);
  const [findStr, setFindStr] = useState("");


    // 토탈값 가져오기
    const getTotal = async () => {
      const pageData = {
        page : page,
        cPage : cPage,
        findStr : findStr,
      };
      const reqData = await fetch("/board/board-paging",{
        method : "POST",
        body: JSON.stringify(pageData),
        headers: {
        'Content-Type': 'application/json'
    }
      });
      const total = await reqData.json();
      let tn = total.length;
      setTotal(tn);
    }
    
    // 페이지 숫자 누르면 실행
    const handlePageChange = async (page) => {
      
      const pageData = {
        page : page,
        cPage : cPage,
        findStr : findStr,
      };

      const reqData = await fetch("/board/board-nextPage",{
        method : "POST",
        body: JSON.stringify(pageData),
        headers: {
        'Content-Type': 'application/json'
    }
      });
      
      const body = await reqData.json();
      setList(body);

      setPage(page);
      setCpage(cPage);
    }
    
    // 검색 글자 변경 가능
    const onChangeFind = async(e) => {
      setFindStr(e.target.value);
    }

    // 검색하기
    const search = async(e) => {
      
      const findData = {
        findStr : findStr,
        page : page,
        cPage : cPage,
      }
      const response = await fetch("/board/board-search",{
        method:"POST",
        body: JSON.stringify(findData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const body = await response.json();
      const totpage = body.length;
      console.log(totpage);
      
      getTotal();
      setTotal(totpage);
      setPage(page);
      setList(body);

  }
  // 처음에 리스트 출력
  const fetchList = async () => {
    // const response = await fetch("/board/board-search-list");
    const findData = {
      findStr : findStr,
      page : page,
      cPage : cPage,
    }

    const response = await fetch("/board/board-search",{
      method:"POST",
      body: JSON.stringify(findData),
        headers: {
        'Content-Type': 'application/json'
    }
  });
    const body = await response.json();
    setList(body);
  };

 
  useEffect(() => {
    getTotal();
    fetchList();
    setLoading(false);
  }, []);
  
  return (
    <Block>
      <Wrapper>
        
              <input value={findStr} onChange={onChangeFind}></input>
              <button onClick={(e)=>search(e)}>검색</button>
            
        {loading
          ? ""
          : list.map((item) => (
              <TextCard to={`/boards/${item._id}`} key={item._id}>
                <Title>{item.title}</Title>
                <CreatedAt>
                  {new Date(item.createdAt).toLocaleDateString()}
                </CreatedAt>
              </TextCard>
            ))}
            <Pagination
              activePage={page} // 현재 페이지
              itemsCountPerPage={cPage} // 한 페이지당 보여줄 리스트 아이템의 개수 백에서도 offset변경해야 한다. 
              totalItemsCount={total} // 총 아이템의 개수
              pageRangeDisplayed={5} // 페이지내에서 보여줄 페이지 범위
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange} // 페이지가 바뀔 때 핸들링해주는 함수
            />
      </Wrapper>
    </Block>
  );
};

export default List;