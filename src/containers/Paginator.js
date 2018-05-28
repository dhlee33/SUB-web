import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import qs from 'qs';
import {withRouter} from 'react-router-dom';

const splitPagesToLimit = (total, current, limit = 5) => {
  let pages = [1];
  if (total <= 1) {
    return pages;
  }

  if (total <= limit + 1) {
    pages = Array(total).fill().map((val, page) => (
      page + 1),
    );
  } else {
    // total > limit. need to truncate
    const offset = Math.floor(limit / 2);
    if ((current + offset) - 1 <= limit) {
      // truncate tail
      const head = Array(limit).fill().map((val, page) => (
        page + 1),
      );
      pages = [...head, '...', total];
    } else if ((current + offset + 1) >= total) {
      // truncate head
      const tail = Array(limit).fill().map((val, page) => (
        total - (limit - (page + 1))),
      );
      pages = [1, '...', ...tail];
    } else {
      // truncate both head and tail
      const centers = Array(limit).fill().map((val, page) => (
        current - (offset - page)),
      );
      pages = [1, '...', ...centers, '...', total];
    }
  }

  return pages;
};
const Paginator = ({search, total, current, history}: {
  search: Object,
  total: number,
  current: number,
  history: Object,
}) => (
  <nav>
    <Pagination>
      <PaginationItem disabled={current === 1}>
        <PaginationLink
          previous
          href=""
          onClick={(e) => {
            e.preventDefault();
            history.push({
              search: qs.stringify({
                ...search,
                page: Math.max(current - 1, 1),
              }),
            });
          }}
        >Prev</PaginationLink>
      </PaginationItem>
      {
        splitPagesToLimit(Number(total), Number(current)).map((page, idx) => ( // eslint-disable-next-line react/no-array-index-key
          <PaginationItem key={idx} active={Number(current) === page} disabled={page === '...'}>
            <PaginationLink
              href=""
              onClick={(e) => {
                e.preventDefault();
                e.target.blur();
                history.push({search: qs.stringify({...search, page})});
              }}
            >{page}</PaginationLink>
          </PaginationItem>
        ))
      }
      <PaginationItem disabled={current >= total}>
        <PaginationLink
          next
          href=""
          onClick={(e) => {
            e.preventDefault();
            history.push({
              search: qs.stringify({
                ...search,
                page: Math.min(current + 1, total),
              }),
            });
          }}
        >Next</PaginationLink>
      </PaginationItem>
    </Pagination>
  </nav>
);

export default withRouter(Paginator);
