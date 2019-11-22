import React from "react"
import css from "../css-modules/Controls.css"

class Controls extends React.Component {
  constructor(props) {
    super(props)

    // Эта привязка обязательна для работы `this` в колбэке.
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const value = e.target.valueAsNumber

    this.props.updateRate(value)
  }

  render() {
    const rate = this.props.rate

    return (
      <div className={css.container}>
        <div className={css.title}>Входные параметры</div>
        <div className={css.card}>
          Кол-во элементо в подгруппе
          <div>
            1{" "}
            <input
              type="range"
              min="1"
              max="11"
              value={rate.k}
              step="1"
              onChange={e => this.handleChange(e)}
            />{" "}
            11
          </div>
          <div>
            k = <span>{rate.k}</span>
            <br/> A2 = <span>{rate.A2}</span>
            <br/> D3 = <span>{rate.D3}</span>
            <br/> D4 = <span>{rate.D4}</span>
            <br/> d2 = <span>{rate.d2}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Controls
