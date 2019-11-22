import ReactDOM from 'react-dom'
import React from 'react'

import Rate from "./tools/rate"
import CsvCard from "./components/CsvCard"
import Controls from "./components/Controls"
import Chart from "./components/Chart"

import styles from './css-modules/index.css'

function H1(props) {
  return <h1>{props.text}</h1>
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.r = new Rate()

    const k = 7

    this.state = {
      data: [], // Спарсенные и обработанные данные из textarea
      rate: {
        k: k,
        A2: this.r.getA2(k),
        D3: this.r.getD3(k),
        D4: this.r.getD4(k),
        d2: this.r.getd2(k),
      },
    }

    this.updateData = this.updateData.bind(this)
    this.updateRate = this.updateRate.bind(this)
  }

  updateData(value) {
    this.setState({data: value})
  }

  updateRate(value) {
    this.setState({
      rate: {
        k: value,
        A2: this.r.getA2(value),
        D3: this.r.getD3(value),
        D4: this.r.getD4(value),
        d2: this.r.getd2(value),
      },
    })
  }

  render() {
    return (
      <div>
        <H1 text="Калькулятор для ККШ +"/>
        <main className={styles.main}>
          <CsvCard updateData={this.updateData} data={this.state.data}/>
          <Controls updateRate={this.updateRate} rate={this.state.rate}/>
          <Chart data={this.state.data} rate={this.state.rate}/>
        </main>
      </div>
    )
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('root')
)