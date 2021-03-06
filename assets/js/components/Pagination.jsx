import React from "react";

//currentPage = { currentPage } itemsPerPage = { itemsPerPage } length = { customers.length } onPageChanged = { handlPageChange }

const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {
  let nbPages = Math.ceil(length / itemsPerPage);
  const delta = 2;
  const left = currentPage - delta;
  const right = currentPage + delta + 1;
  const pages = [];
  const pagesWithDots = [];
  let l;

  for (let i = 1; i <= nbPages; i++) {
    if (i == 1 || i == nbPages || (i >= left && i < right)) {
      pages.push(i);
    }
  }
  console.log(pages);

  for (let i of pages) {
    console.log(l);
    if (l) {
      if (i - l === 2) {
        pagesWithDots.push(l + 1);
      } else if (i - l !== 1) {
        pagesWithDots.push("...");
      }
    }
    pagesWithDots.push(i);
    l = i;
  }

  return (
    <div>
      <ul className="pagination pagination-sm">
        <li className={"page-item" + (currentPage === 1 && " disabled")}>
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {pagesWithDots.map((page) => (
          <li
            key={page}
            className={"page-item" + (currentPage === page && " active")}
          >
            <button className="page-link" onClick={() => onPageChanged(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={"page-item" + (currentPage === nbPages && " disabled")}>
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};

export default Pagination;
