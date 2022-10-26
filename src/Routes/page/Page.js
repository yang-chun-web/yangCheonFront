import React, { useEffect } from "react";
import { useState } from "react";

const Paging = (pageData,getPageData) => {
  
  const [page, setPage] = useState(pageData.pageData.page); // 현재페이지
  
  // 페이지 숫자 출력
  const pageNumber = (maxPage) => {
    const number = [];
    for (let i = 1; i <= maxPage; i++){
      number.push(
        <button key={i} onClick={ ()=>clickPage(i) }>{i}</button>
      )
    }
    return number;
  }

    
    
    // 이전
    const prevPage = () =>{
      if(page<0 ){
        setPage(1);
      }
      setPage(page=>page-1)
      pageData.parentCallBack(page-1);
    }
    // 다음
    const nextPage = () =>{
      setPage(page=>page+1)
      pageData.parentCallBack(page+1);
      if(page>pageData.pageData.maxPage){
        setPage(pageData.pageData.maxPage);
      }
      console.log(page)
    }
    // 페이지 버튼 누르면
    const clickPage = (i) => {
      setPage(i);
      pageData.parentCallBack(i)
    }
    
    
    
    
    useEffect(() => {
      console.log(page)
    }, [page]);
    
    
    
    return (
      <div>
      <button onClick={()=>prevPage()}>&lt;</button>
      {pageNumber(pageData.pageData.maxPage)}
      <button onClick={()=>nextPage()}>&gt;</button>
    </div>
  );
};

export default Paging;
