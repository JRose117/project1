function init() {

  const grid = document.querySelector('.grid')

  const width = 8
  const height = 8
  const mines = 10
  let revealed = 0
  const cellCount = width * height
  const cells = []
  let gameCreated = false
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const ySum = ((i + 1) / (width)) - 1
      const y = Math.ceil(ySum)
      const x = i % width
      const cell = document.createElement('button')
      cell.innerText = `x:${x},y:${y},i:${i}`
      cell.setAttribute('id', 'tile')
      cell.dataset.x = x
      cell.dataset.y = y
      cell.setAttribute('value', i)
      cells.push(cell)
      grid.appendChild(cell)
    }
  }
  createGrid()
  function createMines(position) {
    cells[position].classList.add('mine')
  }

  function runGame(event) {
    if (gameCreated === false) {
      const createMineArray = []
      while (createMineArray.length != mines) {
        const randomNumberMine = Math.floor(Math.random() * cells.length)
        if (!createMineArray.includes(randomNumberMine)) {
          createMineArray.push(randomNumberMine)
          createMines(randomNumberMine)
          cells[randomNumberMine].setAttribute('mine', true)
        }
        gameCreated = true
      }
    }
    if (event.target.classList.contains('mine')) {
      cells[event.target.value].style.background = 'red'
      // console.log('lose')
    } else {
      checkArea(event)
    }
  }

  function checkArea(event) {
    if (event.target) {
      event.target.classList.add('revealed')
      revealed += 1
      x = parseFloat(event.target.dataset.x)
      y = parseFloat(event.target.dataset.y)
    }
    else {
      console.log(`event -> ${event}, cells[event] -> ${cells[event]}`)
      if (cells[event].classList.contains('revealed')) {
        return
      } else if (cells[event].classList.contains('mine')) {
        return
      } else if(event){
        x = parseFloat(cells[event].dataset.x)
        y = parseFloat(cells[event].dataset.y)
        cells[event].classList.add('revealed')
        revealed += 1
      } 
    }

    // console.log(`x --> ${x}`)
    // console.log(`y --> ${y}`)
    const iFromCoordinates = ((width * y) + x)
    const left = x - 1
    const right = x + 1
    const top = y - 1
    const below = y + 1
    let count = 0
    const topLeftCoordinate = ((width * top) + left)
    const topCoordinate = ((width * top) + x)
    const topRightCoordinate = ((width * top) + right)
    const leftCoordinate = ((width * y) + left)
    const rightCoordinate = ((width * y) + right)
    const belowLeftCoordinate = ((width * below) + left)
    const belowCoordinate = ((width * below) + x)
    const belowRightCoordinate = ((width * below) + right)
    if ((!(top < 0 || left < 0)) && cells[topLeftCoordinate].classList.contains('mine')) {
      count += 1
    }
    if ((!(top < 0)) && cells[topCoordinate].classList.contains('mine')) {
      count += 1
    }
    if ((!(top < 0 || right >= width)) && cells[topRightCoordinate].classList.contains('mine')) {
      count += 1
    }
    if ((!(left < 0)) && cells[leftCoordinate].classList.contains('mine')) {
      count += 1
    }
    if ((!(right >= width)) && cells[rightCoordinate].classList.contains('mine')) {
      count += 1
    }
    if ((!(below >= height || left < 0)) && cells[belowLeftCoordinate].classList.contains('mine')) {
      count += 1
    }
    if ((!(below >= height)) && cells[belowCoordinate].classList.contains('mine')) {
      count += 1
    }
    if ((!(below >= height || right >= width)) && cells[belowRightCoordinate].classList.contains('mine')) {
      console.log(`line 1 ${belowRightCoordinate}`)
      console.log(`line 2 ${(!(below >= height || right >= width))}`)
      count += 1
    }
    // console.log(`count --> ${count}`)
    // console.log(`event ${event}`)
    cells[iFromCoordinates].innerText = count
    cells[iFromCoordinates].dataset.count = count
    // if (event.target){
    // const countCheck = parseFloat(event.target.dataset.count)}
    // else{const countCheck = parseFloat(event.target.dataset.count)}
    // console.log(countCheck)
    if (count === 0) {
      
      
      // console.log(`topCoordinate --> ${topCoordinate}`)
      // console.log(`rightCoordinate --> ${rightCoordinate}`)
      // console.log(`leftCoordinate --> ${leftCoordinate}`)
      // console.log(`belowCoordinate --> ${belowCoordinate}`)
      // console.log(`belowLeftCoordinate --> ${belowLeftCoordinate}`)
      // console.log(`belowRightCoordinate --> ${belowRightCoordinate}`)
      // console.log(`cellCount --> ${cellCount}`)
      if (!(top < 0)) {
        // console.log(`topCoordinate --> ${topCoordinate}`)
        checkArea(topCoordinate)
      }
      if (!(left < 0)) {
        // console.log(`leftCoordinate --> ${leftCoordinate}`)
        checkArea(leftCoordinate)
      }
      if (!(right >= width)) {
        // console.log(`rightCoordinate --> ${rightCoordinate}`)
        checkArea(rightCoordinate)
      }
      if (!(below >= height)) {
        // console.log(`belowCoordinate --> ${belowCoordinate}`)
        checkArea(belowCoordinate)
      }
      if (!(top < 0 || left < 0)) {
        // console.log(`topLeftCoordinate --> ${topLeftCoordinate}`)
        checkArea(topLeftCoordinate)
      }
      if (!(top < 0 || right >= width)) {
        // console.log(`topRightCoordinate --> ${topRightCoordinate}`)
        checkArea(topRightCoordinate)
      }
      if (!(below >= height || left < 0)) {
        // console.log(`belowLeftCoordinate --> ${belowLeftCoordinate}`)
        checkArea(belowLeftCoordinate)
      }
      if (!(below >= height || right >= width)){
        // console.log(`belowRightCoordinate --> ${belowRightCoordinate}`)
        checkArea(belowRightCoordinate)
      }
    }
  }
  const buttonSelected = document.querySelectorAll('#tile')


  buttonSelected.forEach(div => div.addEventListener('click', runGame))
}
window.addEventListener('DOMContentLoaded', init)