const ListPagination = () => {
  const totalPages = 3;
  const currentPage = 1;

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button key={num} type="button" disabled={num === currentPage}>
          {num}
        </button>
      ))}
    </div>
  );
};

export default ListPagination;
