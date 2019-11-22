import React from "react"
import css from "../css-modules/Chart.css"
import GoogleChart from "react-google-charts"
import calcControlLines from "../tools/controlLines"

function arrIndividual(data, UNPLX, LNPLX, CLX) {
  return data
    .map((currentValue) => {
      return [
        currentValue[0],
        currentValue[1],
        UNPLX,
        LNPLX,
        CLX,
      ]
    })
}

function arrAverageValues(data, UCLX, LCLX, CLX) {
  return data
    .map((currentValue, index) => {
      return [
        index,
        currentValue.avg,
        UCLX,
        LCLX,
        CLX,
      ]
    })
}

function arrRazmahValues(data, UCLR, LCLR, CLR) {
  return data
    .map((currentValue, index) => {
      return [
        index,
        currentValue.razmah,
        UCLR,
        LCLR,
        CLR,
      ]
    })
}

function arrmRValues(data, CLR2, UCLR2) {
  return data
    .map((currentValue, index) => {
      return [
        index,
        currentValue,
        CLR2,
        UCLR2,
      ]
    })
}

class Chart extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      CLR: 0.0,
      CLX: 0.0,
      UCLR: 0.0,
      UCLX: 0.0,
      LCLR: 0.0,
      LCLX: 0.0,
      UNPLX: 0.0,
      LNPLX: 0.0,
      mR: [],
      data: [],
      dataAvg: [],
      dataRazmah: [],
      UCLR2: 0.0,
      CLR2: 0.0,
      hist: [],
    }
  }

  static getDerivedStateFromProps(props) {

    if (props.data.length === 0) {
      return {}
    }

    const cLines = calcControlLines(props.rate, props.data)

    const arr = arrIndividual(props.data, cLines.UNPLX, cLines.LNPLX, cLines.CLX)

    const arrAvg = arrAverageValues(cLines.data, cLines.UCLX, cLines.LCLX, cLines.CLX)

    const arrRazmah = arrRazmahValues(cLines.data, cLines.UCLR, cLines.LCLR, cLines.CLR)

    const arrmR = arrmRValues(cLines.mR, cLines.CLR2, cLines.UCLR2)

    const hist = props.data
      .map((currentValue, index) => {
        return [
          currentValue[0],
          currentValue[1],
        ]
      })

    // Возваращем новое значение для State
    return {
      CLR: cLines.CLR,
      CLX: cLines.CLX,
      UCLX: cLines.UCLX,
      LCLX: cLines.LCLX,
      data: [['x', 'value', 'UCLX', 'UCLX', 'CLX']].concat(arr),
      dataAvg: [['x', 'value', 'UCLX', 'LCLX', 'CLX']].concat(arrAvg),
      dataRazmah: [['x', 'value', 'UCLR', 'LCLR', 'CLR']].concat(arrRazmah),
      mR: [['x', 'value', 'CLR2', 'UCLR2']].concat(arrmR),
      hist: [['x', 'value']].concat(hist),
    }
  }

  render() {

    const canShow = (this.props.data.length > 0)

    const chart = <GoogleChart
      width={500}
      height={300}
      chartType="LineChart"
      loader={<div>Loading chart...</div>}
      data={this.state.data}
      options={{
        title: "X",
        chartArea: {
          width: '90%',
          height: '70%'
        },
        legend: 'none',
        hAxis: {
          textPosition: 'out'
        },
        vAxis: {
          textPosition: 'out',
          viewWindow: {
            // min: 40,
            // max: 110
          },
        },
      }}
    />


    const chartmR = <GoogleChart
      width={500}
      height={300}
      chartType="LineChart"
      loader={<div>Loading chart...</div>}
      data={this.state.mR}
      options={{
        title: "mR",
        chartArea: {
          width: '90%',
          height: '70%'
        },
        legend: 'none',
        hAxis: {
          textPosition: 'out'
        },
        vAxis: {
          textPosition: 'out',
        },
      }}
    />

    const chartAvg = <GoogleChart
      width={500}
      height={300}
      chartType={"LineChart"}
      data={this.state.dataAvg}
      options={{
        "title": "Average values of groups",
      }}
    />

    const chartRazmah = <GoogleChart
      width={500}
      height={300}
      chartType={"LineChart"}
      data={this.state.dataRazmah}
      options={{
        "title": "Razmah values of groups",
      }}
    />

    const hist = <GoogleChart
      width={500}
      height={300}
      chartType={"Histogram"}
      data={this.state.hist}
      options={{
        title: "Histogram(X)",
        chartArea: {
          width: '90%',
          height: '70%'
        },
        legend: 'none',
        hAxis: {
          textPosition: 'out'
        },
        vAxis: {
          textPosition: 'out',
        },
      }}
    />

    const emptyMessage = "Нечего показывать. Введите данные и нажмите кнопку ОБРАБОТАТЬ."

    return (
      <div className={css.container}>
        <div className={css.title}>График</div>
        <div className={css.card}>

          <div className={css.allCharts}>
            <div className={css.chart1}>{canShow ? chart : emptyMessage}</div>

            <div className={css.chart4}>{canShow ? chartmR : emptyMessage}</div>

            <div className={css.chart5}>{canShow ? hist : emptyMessage}</div>

            <div className={css.chart2}>{canShow ? chartAvg : emptyMessage}</div>

            <div className={css.chart3}>  {canShow ? chartRazmah : emptyMessage}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chart
