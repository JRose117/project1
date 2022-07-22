function init() {
  const grid = document.querySelector('.grid')
  const minesLeftHTML = document.querySelector('.minesLeftTop')
  const resetButton = document.querySelector('.restart button')
  const title = document.querySelector('.title')
  const timerDisplay = document.querySelector('.timer')
  const instructionsTop = document.querySelector('.levelTop')
  const instructionsBelow = document.querySelector('.levelBottom')
  let width
  let height
  let mines
  let timer
  let timerCount
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
  let buttonSelected
  let looping = 1
  let difficulty = parseFloat(prompt('Type 1 for Easy Mode or 2 for Challenge Mode'))
  while (looping === 1) {
    if (difficulty > 2 || difficulty < 1 || Number.isNaN(difficulty) || difficulty % 1 !== 0) {
      console.log(difficulty)
      difficulty = parseFloat(prompt('Enter 1 for Easy Mode or 2 for Challenge Mode'))
    } else {
      looping = 2
    }
  }
  function createGrid() {
    if (difficulty === 1) {
      width = 8
      height = 8
      mines = 10
    } else if (difficulty === 2) {
      width = 16
      height = 16
      mines = 40
    }
    cellCount = width * height
    minesLeft = mines
    const styleHeight = 100 / height
    const styleWidth = 100 / width
    for (let i = 0; i < cellCount; i++) {
      const ySum = ((i + 1) / (width)) - 1
      const y = Math.ceil(ySum)
      const x = i % width
      const cell = document.createElement('button')
      cell.style.height = `${styleHeight}%`
      cell.style.width = `${styleWidth}%`
      if (difficulty === 2) {
        cell.style.border = '2px solid #1b7123'
      }
      cell.setAttribute('id', 'tile')
      cell.dataset.x = x
      cell.dataset.y = y
      cell.setAttribute('value', i)
      cells.push(cell)
      grid.appendChild(cell)

    }
    minesLeft = mines
    minesLeftHTML.innerHTML = minesLeft
    buttonSelected = document.querySelectorAll('#tile')
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
        firstClick = 2
      }
      while (createMineArray.length != mines + 1) {
        const randomNumberMine = Math.floor(Math.random() * cells.length)
        if (!createMineArray.includes(randomNumberMine || parseFloat(event.target.value))) {
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
        } else {
          return
        }
      } else if (flag === true) {
        cells[event.target.value].innerHTML = '🚩'
        event.target.classList.add('flagged')
        minesLeft -= 1
      } else if (event.target.classList.contains('mine')) {
        cells[event.target.value].innerHTML = '💣'
        title.innerHTML = 'YOU LOSE 😢'
        for (let i = 0; i < cellCount; i++) {
          if (cells[i].classList.contains('mine')) {
            cells[i].innerText = '💣'
          }
        }
        gameRunning = 2
        event.target.removeAttribute('mine')
        event.target.classList.remove('mine')
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
      flagButtonSelected.style.background = '#2a8a33'
      flagButtonSelected.style.border = '5px solid #1b7123'
      instructionsTop.innerHTML = 'Pick'
      instructionsBelow.innerHTML = 'Tiles'
    } else {
      flag = true
      flagButtonSelected.style.background = '#94aa5f'
      flagButtonSelected.style.border = '1px solid #7c9444'
      instructionsTop.innerHTML = 'Place'
      instructionsBelow.innerHTML = 'Flags'
    }
  }
  function checkArea(event) {
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
    const iFromCoordinates = ((width * y) + x)
    const left = x - 1
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
    coordinatesArray = coordinatesArray.filter(i => cells[i])
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
      count += 1
    }
    if (event === 0) {
      if (!cells[event].classList.contains('revealed')) {
        cells[event].classList.add('revealed')
        revealed += 1
      }
    }
    cells[iFromCoordinates].innerHTML = count
    cells[iFromCoordinates].dataset.count = count
    if (count === 0) {
      cells[iFromCoordinates].innerHTML = ''
    } else if (count === 1) {
      cells[iFromCoordinates].style.color = 'blue'
    } else if (count === 2) {
      cells[iFromCoordinates].style.color = 'green'
    } else if (count === 3) {
      cells[iFromCoordinates].style.color = 'red'
    } else if (count === 4) {
      cells[iFromCoordinates].style.color = 'navy'
    } else if (count === 5) {
      cells[iFromCoordinates].style.color = 'maroon'
    } else if (count === 6) {
      cells[iFromCoordinates].style.color = 'teal'
    } else if (count === 7) {
      cells[iFromCoordinates].style.color = 'purple'
    } else if (count === 8) {
      cells[iFromCoordinates].style.color = 'grey'
    }
    if (cells[iFromCoordinates].classList.contains('flagged')) {
      cells[iFromCoordinates].classList.remove('flagged')
      minesLeft += 1
      minesLeftHTML.innerHTML = minesLeft
    }
    if (cells.length - mines === revealed) {
      title.innerHTML = 'YOU WON 🎉'
      minesLeft = 0
      minesLeftHTML.innerHTML = '0'
      for (let i = 0; i < cellCount; i++) {
        cells[i].innerText = '🎉'
      }
      gameRunning = 2
      clearTimeout(timer)
      timerRunning = false
    }
    if (count === 0) {
      if (!(top < 0)) {
        checkArea(topCoordinate)
      }
      if (!(left < 0)) {
        checkArea(leftCoordinate)
      }
      if (!(right >= width)) {
        checkArea(rightCoordinate)
      }
      if (!(below >= height)) {
        checkArea(belowCoordinate)
      }
      if (!(top < 0 || left < 0)) {
        checkArea(topLeftCoordinate)
      }
      if (!(top < 0 || right >= width)) {
        checkArea(topRightCoordinate)
      }
      if (!(below >= height || left < 0)) {
        checkArea(belowLeftCoordinate)
      }
      if (!(below >= height || right >= width)) {
        checkArea(belowRightCoordinate)
      }
    }
  }
  const flagButtonSelected = document.querySelector('#flag')
  flagButtonSelected.addEventListener('click', addFlag)
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
      cells[i].style.color = 'black'
    }
  }
  function startTimer() {
    if (timerRunning === false) {
      timerCount = 1
      clearInterval(timer)
      timer = setInterval(() => {
        timerDisplay.innerHTML = timerCount
        timerCount += 1
      }, 1000)
      timerRunning = true
    }
  }
  buttonSelected.forEach(div => div.addEventListener('click', runGame))

  resetButton.addEventListener('click', reset)
}
window.addEventListener('DOMContentLoaded', init)