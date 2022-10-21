import React, { useEffect } from "react";
import { useState } from "react";
import Pagination from "react-js-pagination";

const Paging = () => {
  const [page, setPage] = useState(1);
  /*
    let [total, setTotal] = useState(0);

    // 토탈값 가져오기
    const getTotal = async () => {
        const reqData = await fetch("/board/board-paging");
        const total = await reqData.json();
        let tn = total.length;
        setTotal(tn);
    } */

  const handlePageChange = (page) => {
    setPage(page);
  };

  // 토탈 페이지를 얻어서 넣고 다시 백앤드로 넘겨서 알맞게 페이지를 출력해준다.
  // 토탈 획득 성공.
  // 이제 버튼 누르면 현재 페이지 값을 넘겨서 순서에 맞게 조절

  useEffect(() => {
    //getTotal();
  }, []);

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={5} // 한 페이지당 보여줄 리스트 아이템의 개수
      totalItemsCount={123} // 총 아이템의 개수
      pageRangeDisplayed={5} // 페이지내에서 보여줄 페이지 범위
      prevPageText={"<"}
      nextPageText={"›"}
      onChange={handlePageChange} // 페이지가 바뀔 때 핸들링해주는 함수
    />
  );
};

export default Paging;
