function init() {

  const grid = document.querySelector('.grid')

  const width = 8
  const height = 9
  const mines = 10
  let count = 0
  let globalCount
  const cellCount = width * height
  const cells = []
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      let ySum = (((parseFloat(i) + 1) / parseFloat(width)) - 1)
      let y = Math.ceil(ySum)
      let x = parseFloat((i) % (parseFloat(width)))
      let xyString = x.toString() + ',' + y.toString()
      console.log(xyString)
      const cell = document.createElement('button')
      cell.innerText = `x:${x},y:${y},i:${i}`
      cell.dataset.index = i
      cell.setAttribute('id', 'tile')
      cell.setAttribute('value', xyString)
      cells.push(cell)
      grid.appendChild(cell)
    }
  }
  createGrid()
  function createMines(position) {
    cells[position].classList.add('mine')
  }
  let createMineArray = []
  while (createMineArray.length != 10) {
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
    } else{
   checkArea(event)
   if (globalCount === 0){
    console.log('start recursion')
   }
    }

    // access value using
    // 

  }

  function checkArea(event){
    const x = parseFloat(event.target.value[0])
    const y = parseFloat(event.target.value[event.target.value.length - 1])
    const iFromCoordinates = ((width * y) + x)
    const Left = x - 1
    const Right = x + 1
    const Top = y - 1
    const Below = y + 1
    let newCoordinate
    let count = 0
     // top left
     if (!(Top < 0 || Left < 0)) {
      newCoordinate = ((width * Top) + Left)
      if (cells[newCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    // top 
    if (!(Top < 0)) {
      newCoordinate = ((width * Top) + x)
      if (cells[newCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    // top right
    if (!(Top < 0 || Right >= width)) {
      newCoordinate = ((width * Top) + Right)
      if (cells[newCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    // left 
    if (!(Left < 0)) {
      newCoordinate = ((width * y) + Left)
      if (cells[newCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    // right 
    if (!(Right >= width)) {
      newCoordinate = ((width * y) + Right)
      if (cells[newCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    // Below left
    if (!(Below >= height || Left < 0)) {
      newCoordinate = ((width * Below) + Left)
      if (cells[newCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    // Below 
    if (!(Below >= height)) {
      newCoordinate = ((width * Below) + x)
      if (cells[newCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    // Below right
    if (!(Below >= height || Right >= width)) {
      newCoordinate = ((width * Below) + Right)
      if (cells[newCoordinate].classList.contains('mine')) {
        count += 1
      }
    }
    // console.log(`Count --> ${count}`)
    cells[iFromCoordinates].innerText = count
    globalCount = count
  }

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