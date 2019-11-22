/**
 * Функция находи среднее переданного массива
 * @param arr
 * @returns {number}
 */
function average(arr) {
  return arr.reduce((a, b) => a + b) / arr.length
}

/**
 * Функция находи разницу между Максимальным и Минимальным занчением в переданном массиве
 * @param arr
 * @returns {number}
 */
function razmah(arr) {
  return arr.reduce((a, b) => (a > b) ? a : b) - arr.reduce((a, b) => (a < b) ? a : b)
}

/**
 * Перегрупирует переданный массив в подмассивы по k элементов
 * @param arr
 * @param k
 * @returns {Array|Buffer | SharedArrayBuffer | any[] | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | Float32Array | string | Uint16Array | ArrayBuffer | Int32Array | BigInt64Array | Uint8Array | Int8Array[]}
 */
function regroup(arr, k) {
  const length = arr.length

  if (length <= 0 || length < k)
    return []
  else
    return [arr.slice(0, k)].concat(regroup(arr.slice(k, length), k))
}

/**
 * Вычисляем скользящий размах
 * @param arr
 * @param k
 */
function mRazmah(arr) {
  const length = arr.length
  if (length >= 2) {
    return [Math.abs(arr[0] - arr[1])].concat(mRazmah(arr.slice(1, length)))
  } else
    return []
}

function getAvg(element) {
  return element.avg
}

function getRazmah(element) {
  return element.razmah
}

function getValue1(element) {
  return element[1]
}


function CalcControlLines(rate, data) {

  const values = data.map(getValue1)

  const dataArr = regroup(values, rate.k) // Делим массив на подгруппы в k штук
    .map((curArr) => {
      return {
        data: curArr,
        avg: average(curArr), // считаем средне для каждой группы
        razmah: razmah(curArr), // считаем размах для каждой группы
      }
    })

  // Считаем скользящий размах для набора данных
  const datamR = mRazmah(values)
  const mRAvg = average(datamR)
  const avg = average(values)

  // Центральная линия для Карты Средних
  const CLX = average(dataArr.map(getAvg))
  // Центральная линия для Карты Размахов
  const CLR = average(dataArr.map(getRazmah))

  return {
    data: dataArr,
    CLX: CLX,
    CLR: CLR,
    // Верхняя граница средних
    UCLX: CLX + rate.A2 * CLR,
    // Нижняя граница средних
    LCLX: CLX - rate.A2 * CLR,
    // Верхняя граница размахов
    UCLR: rate.D4 * CLR,
    // Нижняя граница размахов
    LCLR: rate.D3 * CLR,
    UNPLX: avg + 2.66 * mRAvg,
    LNPLX: avg - 2.66 * mRAvg,
    UCLR2: 3.268 * mRAvg,
    CLR2: mRAvg,
    mR: datamR,
  }
}

module.exports = CalcControlLines
