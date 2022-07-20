function init() {

  const grid = document.querySelector('.grid')
  const minesLeftHTML = document.querySelector('.minesLeftTop')
  const levelHTML = document.querySelector('.levelBottom')
  const resetButton = document.querySelector('.restart button')
  const title = document.querySelector('.title')
  const timerDisplay = document.querySelector('.timer')

  let width
  let height
  let mines
  let timer
  let timerRunning = false
  let minesLeft = mines
  let revealed = 0
  let gameRunning = 3
  let resetTest = false
  let level = 1
  let flag = false
  let cellCount
  const cells = []
  let gameCreated = false

  function createGrid() {
    console.log(level)
    if (level === 1){
      width = 8
      height = 8
      mines = 1
    } else if (level === 2){
      width = 16
      height = 16
      mines = 40
    } else {
      width = 30
      height = 16
      mines = 99
    }
    cellCount = width * height
    let styleHeight = 100 / height
    let styleWidth = 100 / width
    for (let i = 0; i < cellCount; i++) {
      const ySum = ((i + 1) / (width)) - 1
      const y = Math.ceil(ySum)
      const x = i % width
      const cell = document.createElement('button')
      cell.style.height = `${styleHeight}%`
      cell.style.width = `${styleWidth}%`
      cell.innerText = `x:${x},y:${y},i:${i}`
      cell.setAttribute('id', 'tile')
      cell.dataset.x = x
      cell.dataset.y = y
      cell.setAttribute('value', i)
      cells.push(cell)
      grid.appendChild(cell)
    }
    minesLeft = mines
    minesLeftHTML.innerHTML = minesLeft
    levelHTML.innerHTML = level
  }
  createGrid()
  function createMines(position) {
    cells[position].classList.add('mine')
  }

  function runGame(event) {
    startTimer()
    if (gameRunning === 2) {
      console.log(`line 49, gameRunning -> ${gameRunning}`)
      console.log(`gameRunning - > ${gameRunning}`)
      return
    }
    else {
      if (gameCreated === false) {
        let createMineArray = []
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
      if (resetTest === true) {
        resetTest = false
        return
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
      }
      else if (flag === true) {
        if (event.target.classList.contains('revealed')) {
          return
        }
        cells[event.target.value].innerHTML = '🚩'
        event.target.classList.add('flagged')
        minesLeft -= 1
      }
      else if (event.target.classList.contains('mine')) {
        cells[event.target.value].innerHTML = '💣'
        cells[event.target.value].style.fontSize = '50px'
        console.log('lose')
        console.log(`line 93, gameRunning -> ${gameRunning}`)
        gameRunning = 2
        console.log(`line 95, gameRunning -> ${gameRunning}`)
      } else if (event.target.classList.contains('restart')) {
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
    } else {
      flag = true    
    }

  }
  function checkArea(event) {
    // console.log(`line 118 gameRunning - > ${gameRunning}`)
    if (event.target) {
      if (!event.target.classList.contains('revealed')){
      event.target.classList.add('revealed')
      revealed += 1}
      x = parseFloat(event.target.dataset.x)
      y = parseFloat(event.target.dataset.y)
    }
    else {
      // console.log(`event -> ${event}, cells[event] -> ${cells[event]}`)
      if (cells[event].classList.contains('revealed')) {
        return
      } else if (cells[event].classList.contains('mine')) {
        return
      } else if (event) {
        x = parseFloat(cells[event].dataset.x)
        y = parseFloat(cells[event].dataset.y)
        if (!cells[event].classList.contains('revealed')){
        cells[event].classList.add('revealed')
        revealed += 1}
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
      // console.log(`line 1 ${belowRightCoordinate}`)
      // console.log(`line 2 ${(!(below >= height || right >= width))}`)
      count += 1
    }
    // console.log(`count --> ${count}`)
    // console.log(`event ${event}`)
    cells[iFromCoordinates].innerText = count
    cells[iFromCoordinates].dataset.count = count
    if(cells.length - mines === revealed) {
      console.log('won')
      title.innerHTML = 'YOU WON 🎉'
      resetButton.innerHTML = '⏩'
      resetButton.style.transform = 'rotate(0deg)'
      level+=1
      levelHTML.innerHTML = level
      clearTimeout(timer)
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
    gameCreated = false
    gameRunning = 3
    revealed = 0
    flag = false
    minesLeft = mines
    minesLeftHTML.innerHTML = minesLeft
    // runGame()
    for (let i = 0; i < cellCount; i++) {
      if (cells[i].classList.contains('flagged')) {
        cells[i].classList.remove('flagged')
      }
      if (cells[i].classList.contains('mine')) {
        cells[i].classList.remove('mine')
      }
      if (cells[i].classList.contains('revealed')) {
        cells[i].classList.remove('revealed')
      }
      cells[i].innerHTML = ''
      //  resetTIMER
    }
  }
  function startTimer(){
    if (timerRunning === false){
      timerCount = 0
      clearInterval(timer)
      timer = setInterval(() => {
        timerDisplay.innerHTML = timerCount
        timerCount +=1
      }, 1000)
      timerRunning = true
  }
}

  resetButton.addEventListener('click', reset)
}
window.addEventListener('DOMContentLoaded', init)