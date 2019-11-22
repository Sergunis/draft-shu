import React from "react"
import css from '../css-modules/Table.css'

function TableRow(props) {
  return <tr>
    <td>
      {props.value1}
    </td>
    <td>
      {props.value2.toFixed(4)}
    </td>
  </tr>
}

function Table(props) {

  const rows = props.data
    .filter((element) => {
      return element.length === 2
    })
    .map((element, index) => {
      return <TableRow
        key={'row' + element[0]}
        value1={element[0]}
        value2={element[1]}
      />
    })

  const cssHide = !props.show === true ? css.hide : ''

  return (
    <div className={css.container + ' ' + cssHide}>
      <table className={css.table}>
        <thead>
        <tr>
          <th>№</th>
          <th>Значение</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    </div>
  )

}

export default Table