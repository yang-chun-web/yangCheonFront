import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mediaStyle } from "../../styles/common";
import Pagination from "./Pagination";

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
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const fetchList = async () => {
    const response = await fetch("/board/board-search-list").then((res) =>
      res.json()
    );
    setList(() => response.reverse());
  };

  useEffect(() => {
    fetchList();
    setLoading(false);
  }, []);

  return (
    <Block>
      <Wrapper>
        {loading
          ? ""
          : list.slice(offset, offset + limit).map((item) => (
              <TextCard to={`/boards/${item._id}`} key={item._id}>
                <Title>{item.title}</Title>
                <CreatedAt>
                  {new Date(item.createdAt).toLocaleDateString()}
                </CreatedAt>
              </TextCard>
            ))}
      </Wrapper>
      <footer>
        <Pagination
          total={list.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </Block>
  );
};

export default List;
