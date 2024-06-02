import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { twMerge } from "tailwind-merge";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [itemOffset, setItemOffset] = useState(currentPage);

  const handlePageClick = (data: { selected: number }) => {
    const selected = data.selected;
    const offset = Math.ceil(selected * 24);
    setItemOffset(offset);
    onPageChange(selected);
  };
  const paginationButtonStyle = twMerge(
    "border p-2 rounded h-10 min-w-10 items-center justify-center flex dark:text-primary-100 dark:bg-primary-800 dark:border-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-500 dark:hover:bg-primary-500 dark:hover:text-white dark:hover:border-primary-500"
  );
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      containerClassName="flex justify-center"
      className="flex gap-2 justify-center"
      nextLinkClassName={paginationButtonStyle}
      previousLinkClassName={paginationButtonStyle}
      breakLinkClassName={paginationButtonStyle}
      pageLinkClassName={paginationButtonStyle}
      pageClassName="bg-white dark:bg-primary-800"
      nextClassName="bg-white dark:bg-primary-800"
      previousClassName="bg-white dark:bg-primary-800"
      breakClassName="bg-white dark:bg-primary-800"
      activeLinkClassName="bg-primary-500 text-white dark:bg-primary-500"
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      initialPage={currentPage}
      pageCount={totalPages}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
