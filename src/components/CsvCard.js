import React from "react"
import Papa from "papaparse"
import css from "../css-modules/CsvCard.css"
import Table from "./Table"
import dataJson from '../data/data.json'


class CsvCard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      hideTextarea: false,
      hideTable: true,
      textareaData: "",
    }

    this.handleChangeTextarea = this.handleChangeTextarea.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
    this.setToggleTable = this.setToggleTable.bind(this)
  }

  componentDidMount() {
    const res = dataJson.rows.map((element) => {
      return '"' + element.d + '"\t"' + element.value + '"'
    })

    this.setState({
      textareaData: res.join("\n")
    })
  }

  handleChangeTextarea(e) {
    this.setState({textareaData: e.target.value})
  }

  handleClickButton(e) {
    this.setState(state => {
      return {hideTextarea: !state.hideTextarea}
    })

    if (!this.state.hideTextarea) {

      // Показываем таблицу
      this.setToggleTable()
      // Парсим CSV из поля и Передаем полученные данные в родителя
      this.props.updateData(this.parseCsv(this.state.textareaData))

    } else {

      this.setState(state => {
        return {hideTable: !state.hideTable}
      })
    }
  }

  parseCsv(textData) {
    return Papa.parse(textData).data
      .filter((curVal) => {
        return curVal.length === 2
      })
      .map((curVal) => {
        return [
          curVal[0],
          parseFloat(curVal[1].toString().replace(/,/, '.'))
        ]
      })
  }

  setToggleTable() {
    this.setState(state => {
      return {hideTable: !state.hideTable}
    })
  }

  render() {
    const textareaCssClasses = !this.state.hideTextarea
      ? css.area
      : css.area + " " + css.hide

    const textButton = (!this.state.hideTextarea)
      ? "обработать"
      : "ввести еще"

    return (
      <div className={css.container}>
        <div className={css.cardTitle}>
          Вставьте данные в формате <strong>CSV</strong>
        </div>
        <div className={css.card}>
          <div className={css.header}>
            <span className={css.title}>№; Значение</span>
            <button
              onClick={this.handleClickButton}
              className={css.computeButton}
            >{textButton}</button>
          </div>

          <textarea
            className={textareaCssClasses}
            onChange={this.handleChangeTextarea}
            value={this.state.textareaData}
          />

          <Table data={this.props.data} show={!this.state.hideTable}/>
        </div>
      </div>
    )
  }
}

export default CsvCard
