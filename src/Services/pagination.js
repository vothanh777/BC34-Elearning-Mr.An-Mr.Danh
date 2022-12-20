export const _paginate = (
  [count, setCount],
  totalCount,
  pageSize,
  totalPages,
  [currentPage, setCurrentPage],
  getCoursePageChange
) => {
  const onPageChange = (isNext) => {
    let currentPg = 1;
    if (isNext) {
      currentPg = currentPage < totalPages ? currentPage + 1 : currentPage;
    } else {
      currentPg = currentPage === 1 ? 1 : currentPage - 1;
    }
    getCoursePageChange(currentPg);
    setCurrentPage(currentPg);

    const _count = pageSize * (currentPg - 1) + 1;
    setCount(_count);
  };

  return (
    <div
      className="text-right"
      style={{ display: totalCount === 0 ? "none" : "block" }}
    >
      <span className="text-info">
        {count}-
        {count + pageSize - 1 > totalCount ? totalCount : count + pageSize - 1}{" "}
        trong số {totalCount}
      </span>
      <button
        onClick={() => onPageChange(false)}
        className="btn btn-light text-dark"
        style={{ borderRadius: "50%" }}
        disabled={currentPage === 1 ? "disabled" : ""}
      >
        <i className="fa fa-angle-left"></i>
      </button>
      <button
        onClick={() => onPageChange(true)}
        className="btn btn-light text-dark"
        style={{ borderRadius: "50%" }}
        disabled={currentPage === totalPages ? "disabled" : ""}
      >
        <i className="fa fa-angle-right"></i>
      </button>
    </div>
  );
};
