import React from 'react'

export default function TableLoading(props) {
  const TableHead = []
  for (let index = 0; index < props.tableHead; index++) {
    TableHead.push(
      <th>
        <div className="placeholder"></div>
      </th>
    )
  }

  const Body = []
  const colTd = []
  for (let td = 0; td < props.cols; td++) {
    colTd.push(
      <td>
        <div className="placeholder"></div>
      </td>
    )
  }
  for (let index = 0; index < props.rows; index++) {
    Body.push(<tr>{colTd.map(data => data)}</tr>)
  }

  return (
    <>
      <thead>
        <tr>{TableHead.map((data, index) => data)}</tr>
      </thead>
      <tbody>
        {Body.map((data, index) => {
          console.log(data)
          return data
        })}
      </tbody>
    </>
  )
}
