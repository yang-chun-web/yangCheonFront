import React, { useState, useEffect } from "react";
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

  const fetchList = async () => {
    const response = await fetch("/board/board-search-list");
    const body = await response.json();
    console.log(body);
    setList(body);
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
          : list.map((item) => (
              <TextCard to={`/board/${item._id}`} key={item._id}>
                <Title>{item.title}</Title>
                <CreatedAt>
                  {new Date(item.createdAt).toLocaleDateString()}
                </CreatedAt>
              </TextCard>
            ))}
      </Wrapper>
    </Block>
  );
};

export default List;
