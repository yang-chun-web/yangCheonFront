const Pagination = ({ total, limit, page, setPage }) => {
  const pages = Math.ceil(total / limit);
  return (
    <div>
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
    </div>
  );
};

export default Pagination;
