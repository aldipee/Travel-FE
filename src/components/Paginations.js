import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export default function Paginations(props) {
  const pageLinks = []
  for (let page = 1; page <= props.totalPages; page++) {
    let active = props.currentPage === page ? true : null
    pageLinks.push(
      <PaginationItem active={active}>
        <PaginationLink href="#" key={page} onClick={() => props.movePage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    )
  }
  return (
    <Pagination aria-label="Page navigation example">
      {props.currentPage > 1 && (
        <PaginationItem>
          <PaginationLink previous href="#" onClick={() => props.movePage(props.currentPage - 1)} />
        </PaginationItem>
      )}
      {pageLinks}
      {props.currentPage < props.totalPages && (
        <PaginationItem>
          <PaginationLink next href="#" onClick={() => props.movePage(props.currentPage + 1)} />
        </PaginationItem>
      )}
    </Pagination>
  )
}
