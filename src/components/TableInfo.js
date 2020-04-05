import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
function TableInfo({ totalData, page, totalPage, title }) {
  return (
    <>
      <Col sm={2}>
        <h4 className='border-gray border-right' style={{ fontSize: '20px' }}>
          <strong className='text-secondary' style={{ fontSize: '19px' }}>
            {totalData}
          </strong>
          {title}
        </h4>
      </Col>
      <Col sm={2}>
        <span className='current-page d-inline-block h-100 pl-4 text-secondary' style={{ fontSize: '16px' }}>
          Page
          <span style={{ fontSize: '16px' }} className='font-weight-bold'>
            {page}
          </span>
          /
          <span style={{ fontSize: '17px' }} className='font-weight-bold'>
            {totalPage}
          </span>
        </span>
      </Col>
    </>
  )
}

TableInfo.propTypes = {
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  totalData: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default TableInfo
