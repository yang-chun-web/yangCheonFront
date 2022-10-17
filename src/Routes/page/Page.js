import React from "react";
import { useState } from "react";
import Pagination from "react-js-pagination";
import Page from "./Page.css";


const Paging = ({page, total, setPage}) => {
    //const [page, setPage] = useState(1);
    // const [totalItemsCount, setTotalItemsCount] = 1;
    // const [itemsCountPerPage, setItemsCountPerPage] = 1;
    


    // const handlePageChange = (page) => {
    //     setPage(page);
    // }

    return(
        <Pagination 
        activePage={page} // 현재 페이지
        //itemsCountPerPage={setItemsCountPerPage} // 한 페이지당 보여줄 리스트 아이템의 개수
        itemsCountPerPage={5} // 한 페이지당 보여줄 리스트 아이템의 개수
        //totalItemsCount={setTotalItemsCount} // 총 아이템의 개수
        totalItemsCount={total} // 총 아이템의 개수
        pageRangeDisplayed={5} // 페이지내에서 보여줄 페이지 범위
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage} // 페이지가 바뀔 때 핸들링해주는 함수
        />

    );
}

export default Paging;











