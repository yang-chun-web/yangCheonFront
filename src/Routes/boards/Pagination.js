import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  button {
    border: none;
    padding: 0;
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    background-color: #1f1f1f;
    border-radius: 5px;
    color: #e2e2e2;
    font-size: 1rem;
    font-weight: bold;
    &:active {
      color: white;
      background-color: #4e6c86;
    }
    &:active,
    &:hover {
      color: #ffffff;
    }
    &:disabled {
      background-color: #4e6c86;
    }
    &:first-child {
      background-color: #1f1f1f;
    }
    &:last-child {
      background-color: #1f1f1f;
    }
  }
`;

const Pagination = ({ total, limit, page, setPage }) => {
  const pages = Math.ceil(total / limit);
  return (
    <Wrapper>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array(pages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === pages}>
        &gt;
      </button>
    </Wrapper>
  );
};

export default Pagination;
