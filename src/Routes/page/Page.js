import React, { useEffect } from "react";
import { useState } from "react";
import { paging } from "../../api";

const Paging = ( ) => {

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [countPage, setCountPage] = useState(5); // 한 페이지에 보여줄 아이템의 개수
  const [rangePage, setRangePage] = useState(0); // 페이지내에서 보여줄 범위
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);

    // 글 목록 리스트 가져오는 api를 최대한 한번에 써서 페이징 처리를 하기. 

    // 토탈값 가져오기
    const getTotal = async () => {
        const reqData = await paging();
        // const total = await reqData.json();
        console.log(reqData);
        // let totalNumber = total.length;
        // setTotal(totalNumber);

    }
    // 맨앞
    const firstPage = () =>{
      setPage(1);

    } 
    // 맨끝
    const lastPage = () =>{
      setPage(total);
    }
    // 이전
    const prevPage = () =>{
      
    }
    // 다음
    const nextPage = () =>{
      
    }
    // 보여줄 페이지 계산





  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div>
      <button>맨앞</button>
      <button>이전</button>

      <button>페이지</button>

      <button>다음</button>
      <button>맨끝</button>
    </div>
  );
};

export default Paging;
