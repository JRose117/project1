function init() {

  const grid = document.querySelector('.grid')

  const width = 8
  const height = 9
  const mines = 10
  const cellCount = width * height
  const cells = []
  const xValuesArray = []
  const yValuesArray = []
  const iValuesArray = []
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const ySum = ((i + 1) / (width)) - 1
      const y = Math.ceil(ySum)
      const x = i % width
      const xyString = x.toString() + ',' + y.toString()
      console.log(xyString)
      const cell = document.createElement('button')
      cell.innerText = `x:${x},y:${y},i:${i}`
      xValuesArray.push(x)
      yValuesArray.push(y)
      iValuesArray.push(i)
      cell.dataset.index = i
      cell.setAttribute('id', 'tile')
      cell.dataset.x = x
      cell.dataset.y = y
      cell.setAttribute('value', xyString)
      cells.push(cell)
      grid.appendChild(cell)
    }
  }
  createGrid()
  function createMines(position) {
    cells[position].classList.add('mine')
  }
  const createMineArray = []
  while (createMineArray.length != mines) {
    const randomNumberMine = Math.floor(Math.random() * cells.length)
    if (!createMineArray.includes(randomNumberMine)) {
      createMineArray.push(randomNumberMine)
      createMines(randomNumberMine)
      cells[randomNumberMine].setAttribute('mine', true)
    }
  }
  function xyTest(event) {
    const x = parseFloat(event.target.value[0])
    const y = parseFloat(event.target.value[event.target.value.length - 1])
    const iFromCoordinates = ((width * y) + x)
    // const x = parseFloat(event.target.value[0])
    // const y = parseFloat(event.target.value[event.target.value.length - 1])
    // const iFromCoordinates = ((width * y) + x)
    // let count = 0
    // console.log(x)
    // console.log(y)
    // console.log(`type of x --> ${typeof x}`)
    // console.log(`type of y --> ${typeof y}`)
    // console.log(`x --> ${x}`)
    // console.log(`y --> ${y}`)
    // console.log(`y+1 --> ${y+1}`)
    // console.log(`event --> ${event}`)
    // console.log(`event.target --> ${event.target}`)
    // console.log(`event.target.value --> ${event.target.value}`)
    // console.log(`event.target.value[0] --> ${event.target.value[0]}`)
    // console.log(`event.target.value[2] --> ${event.target.value[2]}`)
    // console.log(`typeof parseFloat(event.target.value[0]) --> ${typeof parseFloat(event.target.value[0])}`)
    // console.log(`typeof parseFloat(event.target.value[2]) --> ${typeof parseFloat(event.target.value[2])}`)
    // console.log(`(Object.values(event.target.dataset)[0]) --> ${(Object.values(event.target.dataset)[0])}`)
    // console.log(`(Object.values(event.target.dataset)) --> ${(Object.values(event.target.dataset))}`)
    // console.log(`(Object.values(event.target.dataset)[0]) --> ${(Object.values(event.target.dataset)[0])}`)
    // console.log(`(Object.values(event.target.dataset)) --> ${(Object.values(event.target.dataset))}`)
    // console.log(`(Object.values) --> ${(Object.values)}`)
    // console.log(`(iFromCoordinates) --> ${(iFromCoordinates)}`)
    // console.log(`(typeof iFromCoordinates) --> ${(typeof iFromCoordinates)}`)
    // console.log(`(cells[iFromCoordinates]) --> ${(cells[iFromCoordinates])}`)
    // let Left = x - 1
    // let Right = x + 1
    // let Top = y - 1
    // let Below = y + 1
    // let newCoordinate = 0
    // console.log(`Left --> ${Left}`)
    // console.log(`Right --> ${Right}`)
    // console.log(`Top --> ${Top}`)
    // console.log(`Below --> ${Below}`)
    // console.log(`newCoordinate --> ${newCoordinate}`)
    // if (iFromCoordinates === (Object.values(event.target.dataset))) {
    //   console.log('true')

    if (event.target.classList.contains('mine')) {
      cells[iFromCoordinates].style.background = 'red'
      console.log('lose')
    } else {
      checkArea(event)
    }
  }

  // access value using
  // 

  function checkArea(event) {
    if (event.target){
      console.log('this happened on click')
    } else {
      console.log('else statement in checkArea')
      return
    }

    // const x = parseFloat(event.target.value[0])
    // const y = parseFloat(event.target.value[event.target.value.length - 1])
    const x = parseFloat(event.target.dataset.x)
    const y = parseFloat(event.target.dataset.y)
    console.log(`x --> ${x}`)
    console.log(`y --> ${y}`)
    const iFromCoordinates = ((width * y) + x)
    const Left = x - 1
    const Right = x + 1
    const Top = y - 1
    const Below = y + 1
    let count = 0
    const topLeftCoordinate = ((width * Top) + Left)
    console.log(`topLeftCoordinate --> ${topLeftCoordinate}`)
    const topCoordinate = ((width * Top) + x)
    const topRightCoordinate = ((width * Top) + Right)
    const leftCoordinate = ((width * y) + Left)
    const rightCoordinate = ((width * y) + Right)
    const belowLeftCoordinate = ((width * Below) + Left)
    const belowCoordinate = ((width * Below) + x)
    const belowRightCoordinate = ((width * Below) + Right)
    // top left
    if (!(Top < 0 || Left < 0)) {
      if (cells[topLeftCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    if (!(Top < 0)) {
      console.log(`top ${Top}`)
      console.log(!(Top < 0))
      console.log(`topCoordinate --> ${topCoordinate}`)
      if (cells[topCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    if (!(Top < 0 || Right >= width)) {
      if (cells[topRightCoordinate])
      if (cells[topRightCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    if (!(Left < 0)) {
      if (cells[leftCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    if (!(Right >= width)) {
      if (cells[rightCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    if (!(Below >= height || Left < 0)) {
      if (cells[belowLeftCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    if (!(Below >= height)) {
      if (cells[belowCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    if (!(Below >= height || Right >= width)) {
      if (cells[belowRightCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    console.log(`Count --> ${count}`)
    cells[iFromCoordinates].innerText = count
    if (count === 0) {
      checkArea(topCoordinate)
      // checkArea(topLeftCoordinate)
      // checkArea(topRightCoordinate)
      // checkArea(leftCoordinate)
      // checkArea(rightCoordinate)
      // checkArea(belowLeftCoordinate)
      // checkArea(belowCoordinate)
      // checkArea(belowRightCoordinate)
      // checkArea(topCoordinate)
    }
  }
  console.log(`xValuesArray --> ${xValuesArray}`)
  console.log(`yValuesArray --> ${yValuesArray}`)
  console.log(`iValuesArray --> ${iValuesArray}`)

  // to target tile 11 
  // console.log(parseFloat(cells[10].value[0]))
  // to target generic coordinates of 3rd tile
  // console.log(cells[2].value)

  // function up(){
  //   console.log(`x --> ${x}`)
  //   console.log(`y --> ${y}`)
  //   let newCoordinate = []
  //   newCoordinate.push(x)
  //   newCoordinate.push(y)
  //     console.log(newCoordinate)
  // }



  // function consoleLogTest(event){
  //   if (event.target.classList.contains('mine')){
  //     count=''
  //     console.log('lose')
  //     cells[event.target.value].style.background = 'red'}
  //   else if (event.target.value === '0'){
  //  }
  //  cells[event.target.value].innerText = count
  // }
  const buttonSelected = document.querySelectorAll('#tile')
  // // console.log(buttonSelected)
  // const countAll = document.querySelectorAll('#tile').length
  // // console.log(countAll)

  // console.log(cells[randomNumberMine])

  buttonSelected.forEach(div => div.addEventListener('click', xyTest))
  // buttonSelected.forEach(div => div.addEventListener('click', consoleLogTest))

}
window.addEventListener('DOMContentLoaded', init)