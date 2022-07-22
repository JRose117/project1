function init() {

  const grid = document.querySelector('.grid')
  const minesLeftHTML = document.querySelector('.minesLeftTop')
  const resetButton = document.querySelector('.restart button')
  const title = document.querySelector('.title')
  const timerDisplay = document.querySelector('.timer')
  const instructionsTop = document.querySelector('.levelTop')
  const instructionsBelow = document.querySelector('.levelBottom')

  let width = 8
  let height = 8
  let mines = 10
  let timer
  let firstClick = 1
  let timerRunning = false
  let minesLeft = mines
  let revealed = 0
  let gameRunning = 3
  let resetTest = false
  let flag = false
  let cellCount
  const cells = []
  let createMineArray = []

  function createGrid() {
    cellCount = width * height
    const styleHeight = 100 / height
    const styleWidth = 100 / width
    for (let i = 0; i < cellCount; i++) {
      const ySum = ((i + 1) / (width)) - 1
      const y = Math.ceil(ySum)
      const x = i % width
      const cell = document.createElement('button')
      cell.style.height = `${styleHeight}%`
      cell.style.width = `${styleWidth}%`
      // cell.innerText = `x:${x},y:${y},i:${i}`
      cell.setAttribute('id', 'tile')
      cell.dataset.x = x
      cell.dataset.y = y
      cell.setAttribute('value', i)
      cells.push(cell)
      grid.appendChild(cell)
    }
    minesLeft = mines
    minesLeftHTML.innerHTML = minesLeft
  }
  createGrid()
  function createMines(position) {
    cells[position].classList.add('mine')
  }

  function runGame(event) {
    if (gameRunning === 2) {
      return
    } 
    startTimer()
    if (event.target.classList.contains('revealed')) {
      return
    } else {
      if (firstClick === 1) {
        createMineArray.push(parseFloat(event.target.value))
        firstClick = 2}
      while (createMineArray.length != mines + 1) {
        const randomNumberMine = Math.floor(Math.random() * cells.length)
        if (!createMineArray.includes(randomNumberMine||parseFloat(event.target.value))) {
          createMineArray.push(randomNumberMine)
          createMines(randomNumberMine)
          cells[randomNumberMine].setAttribute('mine', true)
        }
      }
      if (resetTest === true) {
        resetTest = false
      }
      if (event.target.classList.contains('flagged')) {
        if (flag === true) {
          cells[event.target.value].innerHTML = ''
          event.target.classList.remove('flagged')
          minesLeft += 1
          minesLeftHTML.innerHTML = minesLeft
          return
        }
        else {
          return
        }
      } else if (flag === true) {
        cells[event.target.value].innerHTML = '🚩'
        event.target.classList.add('flagged')
        minesLeft -= 1
      } else if (event.target.classList.contains('mine')) {
        cells[event.target.value].innerHTML = '💣'
        cells[event.target.value].style.fontSize = '50px'
        console.log('lose')
        title.innerHTML = 'YOU LOSE 😢'

        gameRunning = 2
        clearTimeout(timer)
        timerRunning = false

      } else if (event.target.classList.contains('restart')) {
        return
      } else if (event.target.classList.contains('revealed')) {
        return
      } else {
        checkArea(event)
      }
      minesLeftHTML.innerHTML = minesLeft
    }
  }
  function addFlag() {
    if (gameRunning === 2) {
      return
    }
    else if (flag === true) {
      flag = false
      instructionsTop.innerHTML = 'Pick'
      instructionsBelow.innerHTML = 'Tiles'
    } else {
      flag = true
      instructionsTop.innerHTML = 'Place'
      instructionsBelow.innerHTML = 'Flags'
    }

  }
  function checkArea(event) {
    // console.log(`line 118 gameRunning - > ${gameRunning}`)
    let x = 0
    let y = 0
    if (event.target) {
      if (!event.target.classList.contains('revealed')) {
        event.target.classList.add('revealed')
        revealed += 1
        x = parseFloat(event.target.dataset.x)
        y = parseFloat(event.target.dataset.y)
      }
    } else {
      console.log(`event -> ${event}`)
      if (cells[event].classList.contains('revealed') || (cells[event].classList.contains('mine'))) {
        return
      } else if (event) {
        x = parseFloat(cells[event].dataset.x)
        y = parseFloat(cells[event].dataset.y)
        if (!cells[event].classList.contains('revealed')) {
          cells[event].classList.add('revealed')
          revealed += 1
        }
      }
    }
    let count = 0
    console.log(`x --> ${x}`)
    console.log(`y --> ${y}`)
    console.log(`width --> ${width}`)
    const iFromCoordinates = ((width * y) + x)
    console.log(`iFromCoordinates -> ${iFromCoordinates}`)
    const left = x - 1
    console.log(`left -> ${left}`)
    const right = x + 1
    const top = y - 1
    const below = y + 1
    const topLeftCoordinate = ((width * top) + left)
    const topCoordinate = ((width * top) + x)
    const topRightCoordinate = ((width * top) + right)
    const leftCoordinate = ((width * y) + left)
    const rightCoordinate = ((width * y) + right)
    const belowLeftCoordinate = ((width * below) + left)
    const belowCoordinate = ((width * below) + x)
    const belowRightCoordinate = ((width * below) + right)
    let coordinatesArray = [topLeftCoordinate, topCoordinate, topRightCoordinate, leftCoordinate, rightCoordinate, belowLeftCoordinate, belowCoordinate, belowRightCoordinate]
    console.log(`[topLeftCoordinate -> ${topLeftCoordinate}, topCoordinate -> ${topCoordinate}, topRightCoordinate -> ${topRightCoordinate}, leftCoordinate -> ${leftCoordinate}, rightCoordinate -> ${rightCoordinate}, belowLeftCoordinate -> ${belowLeftCoordinate}, belowCoordinate -> ${belowCoordinate}, belowRightCoordinate -> ${belowRightCoordinate}]`)
    coordinatesArray = coordinatesArray.filter(i => cells[i])
    console.log(coordinatesArray)


    // const count = coordinatesArray.reduce((prev,current) => {
    //   return cells[current].classList.contains('mine') ? prev + 1 : prev
    // }, 0)
    // console.log(count)
    console.log(coordinatesArray.includes(topLeftCoordinate))
    if ((!(top < 0 || left < 0)) && cells[topLeftCoordinate].classList.contains('mine') && coordinatesArray.includes(topLeftCoordinate)) {
      count += 1
    }
    if ((!(top < 0)) && cells[topCoordinate].classList.contains('mine') && coordinatesArray.includes(topCoordinate)) {
      count += 1
    }
    if ((!(top < 0 || right >= width)) && cells[topRightCoordinate].classList.contains('mine') && coordinatesArray.includes(topRightCoordinate)) {
      count += 1
    }
    if ((!(left < 0)) && cells[leftCoordinate].classList.contains('mine') && coordinatesArray.includes(leftCoordinate)) {
      count += 1
    }
    if ((!(right >= width)) && cells[rightCoordinate].classList.contains('mine') && coordinatesArray.includes(rightCoordinate)) {
      count += 1
    }
    if ((!(below >= height || left < 0)) && cells[belowLeftCoordinate].classList.contains('mine') && coordinatesArray.includes(belowLeftCoordinate)) {
      count += 1
    }
    if ((!(below >= height)) && cells[belowCoordinate].classList.contains('mine') && coordinatesArray.includes(belowCoordinate)) {
      count += 1
    }
    if ((!(below >= height || right >= width)) && cells[belowRightCoordinate].classList.contains('mine') && coordinatesArray.includes(belowRightCoordinate)) {
      // console.log(`line 1 ${belowRightCoordinate}`)
      // console.log(`line 2 ${(!(below >= height || right >= width))}`)
      count += 1
    }
    // console.log(`count --> ${count}`)
    // console.log(`event ${event}`)
    cells[iFromCoordinates].innerHTML = count
    cells[iFromCoordinates].dataset.count = count
    if (cells[iFromCoordinates].classList.contains('flagged')) {
      cells[iFromCoordinates].classList.remove('flagged')
      minesLeft += 1
      minesLeftHTML.innerHTML = minesLeft
    }
    console.log(`cells.length -> ${cells.length}`)
    console.log(`mines -> ${mines}`)
    console.log(`revealed -> ${revealed}`)
    console.log(`cells.length-mines === -> ${cells.length-mines === revealed}`)
    if (cells.length - mines === revealed) {
      console.log('won')
      title.innerHTML = 'YOU WON 🎉'
      gameRunning = 2
      clearTimeout(timer)
      timerRunning = false
    }
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
      if (!(below >= height || right >= width)) {
        // console.log(`belowRightCoordinate --> ${belowRightCoordinate}`)
        checkArea(belowRightCoordinate)
      }
    }
  }

  const buttonSelected = document.querySelectorAll('#tile')
  const flagButtonSelected = document.querySelector('#flag')
  flagButtonSelected.addEventListener('click', addFlag)

  buttonSelected.forEach(div => div.addEventListener('click', runGame))

  function reset() {
    resetTest = true
    title.innerHTML = 'MINESWEEPER'
    gameRunning = 3
    revealed = 0
    firstClick = 1
    flag = false
    minesLeft = mines
    minesLeftHTML.innerHTML = minesLeft
    clearTimeout(timer)
    createMineArray = []
    timerRunning = false
    for (let i = 0; i < cellCount; i++) {
      if (cells[i].classList.contains('flagged')) {
        cells[i].classList.remove('flagged')
      }
      if (cells[i].classList.contains('mine')) {
        cells[i].removeAttribute('mine')
        cells[i].classList.remove('mine')
      }
      if (cells[i].classList.contains('revealed')) {
        cells[i].classList.remove('revealed')
      }
      cells[i].innerHTML = ''

      console.log(cells[i])
      //  resetTIMER
    }
  }
  function startTimer() {
    if (timerRunning === false) {
      timerCount = 0
      clearInterval(timer)
      timer = setInterval(() => {
        timerDisplay.innerHTML = timerCount
        timerCount += 1
      }, 1000)
      timerRunning = true
    }
  }

  resetButton.addEventListener('click', reset)
}
window.addEventListener('DOMContentLoaded', init)