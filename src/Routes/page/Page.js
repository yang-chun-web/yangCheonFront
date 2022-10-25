import React, { useEffect } from "react";
import { useState } from "react";

const Paging = (pageData,getPageData) => {
  console.log(getPageData)
  
  const [page, setPage] = useState(pageData.pageData.page); // 현재페이지
  const [total, setTotal] = useState(pageData.pageData.total); // 전체 페이지
  const [maxPage, setMaxPage] = useState(pageData.pageData.maxPage); // 한 페이지에 보여줄 아이템의 개수
    // 글 목록 리스트 가져오는 api를 최대한 한번에 써서 페이징 처리를 하기. 
    // 현재 페이지 값만 받아서 백단에서 계산 및 
    
    // 페이지 숫자 출력
    const pageNumber = (maxPage) => {
      const number = [];
      for (let i = 1; i <= maxPage; i++){
        number.push(<button key={i} onClick={()=>clcikPage(i)}>{i}</button>)
      }
      return number;
    }
    // 값 세팅  
    const setting = (pageData) => {
      setPage(pageData.pageData.page); 
      setTotal(pageData.pageData.total);
      setMaxPage(pageData.pageData.maxPage);
    }

    
    // 맨앞
    const firstPage = () =>{
      setPage(1);
      console.log("맨앞",maxPage)
      console.log("맨앞",page)
      
    } 
    // 맨끝
    const lastPage = (pageData) =>{
      console.log(pageData);
      setPage(pageData);
      console.log(page)
    }
    // 이전
    const prevPage = () =>{
      if(page<=0){
        setPage(1);
      }else{
        setPage(page-1)
      }
      console.log(page)
    }
    // 다음
    const nextPage = () =>{
      setPage(page+1)
      console.log(page)
    }

    const clcikPage = (i) => {
      console.log(i)
      getPageData = i;
      console.log(getPageData)
    }
    
    
    
    
    useEffect(() => {
      setting(pageData);
    }, []);
    


    return (
      <div>
      <button onClick={()=>firstPage()}>맨앞</button>
      <button onClick={()=>prevPage()}>이전</button>
      {pageNumber(pageData.pageData.maxPage)}
      <button onClick={()=>nextPage()} >다음</button>
      <button onClick={()=>lastPage(pageData.pageData.total)}>맨끝</button>
      <input value={pageData.pageData.total}></input>
    </div>
  );
};

export default Paging;
