function init() {

  const grid = document.querySelector('.grid')
  
  const width = 8
  const height = 8
  const mines = 10
  let count = 0
  const cellCount = width * height
  // const newClass = 'blue'
  const cells = []
  // function createGrid(){
  //   for (let i = 0; i < cellCount; i++){
  //     let columnSum = (parseFloat(i)+1)/parseFloat(width)
  //     let column = Math.ceil(columnSum)
  //     let row = parseFloat(i)%(parseFloat(width))+1
  //     let rowColumnString = row.toString()+',' + column.toString()
  //     console.log(rowColumnString)
  //     const cell = document.createElement('button')
  //     cell.innerText = [row,column]
  //     cell.dataset.index = i
  //     cell.setAttribute('id','tile')
  //     cell.setAttribute('value', rowColumnString)
  //     cells.push(cell)
  //     grid.appendChild(cell)
  //   }
  // }
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      let columnSum = (parseFloat(i)+1)/parseFloat(width)
      // let column = Math.ceil(columnSum)
      // let row = parseFloat(i)%(parseFloat(width))+1
      // let rowColumnString = row.toString()+',' + column.toString()
      // console.log(rowColumnString)
      const cell = document.createElement('button')
      // cell.innerText = [i]
      cell.dataset.index = i
      cell.setAttribute('id','tile')
      cell.setAttribute('value', i)
      cells.push(cell)
      grid.appendChild(cell)
    }
  }
  function createMines(position){
      cells[position].classList.add('mine')
    }
   function left(){
    if(cells[parseFloat(event.target.value)-1].classList.contains('mine')){
      count+=1} 
  }
  function right(){
    if(cells[parseFloat(event.target.value)+1].classList.contains('mine')){
    count+=1} 
  }
  function below(){
    if(cells[parseFloat(event.target.value)+parseFloat(width)].classList.contains('mine')){
      count+=1} 
  }
  function over(){
    if (cells[parseFloat(event.target.value)-parseFloat(width)].classList.contains('mine')){
      count+=1} 
  }

  function belowLeft(){
    if(cells[parseFloat(event.target.value)+parseFloat(width)-1].classList.contains('mine')){
      count+=1} 
  }

  function belowRight(){
    if(cells[parseFloat(event.target.value)+parseFloat(width)+1].classList.contains('mine')){
      count+=1}
  }

  function overLeft(){
    if(cells[parseFloat(event.target.value)-parseFloat(width)-1].classList.contains('mine')){
      count+=1} 
  }
  
  function overRight(){
    if(cells[parseFloat(event.target.value)-parseFloat(width)+1].classList.contains('mine')){
      count+=1} 
  }

  // function rowColumnTest(event){
    // console.log(event.target.value)
    // if(event.target.classList.contains('mine')){
    //   console.log('lose')
    // }
  //   if (cells[parseFloat(event.target.value)-1].classList.contains('mine')){
  //     //   count+=1} 
  //   let row = parseFloat(event.target.value)%(parseFloat(width))+1
  //   console.log(`row --> ${row}`)
  //   let column = Math.ceil(parseFloat(parseFloat(event.target.value) + 1)/parseFloat(width))
  //   console.log(`column --> ${column}`)
  // }
  function consoleLogTest(event){
    if (event.target.classList.contains('mine')){
      count=''
      console.log('lose')
      cells[event.target.value].style.background = 'red'}
    else if (event.target.value === '0'){
       // console.log('top left')
      count = 0
      right()
      belowRight()
      below()
      console.log(count)
    } else if (parseFloat(event.target.value) === cellCount-1){
       // console.log('bottom right')
      count = 0
      over()
      overLeft()
      left()
      console.log(count)
    } else if (parseFloat(event.target.value)=== cellCount-width){
       // console.log('bottom left')
      count = 0
      over()
      overRight()
      right()
      console.log(count)
    } else if (parseFloat(event.target.value) === width-1){
      // console.log('top right')
      count = 0
      below()
      left()
      belowLeft()
      console.log(count)
    } else if (event.target.value <= width-1){
      // console.log('top row')
      count = 0
      right()
      left()
      below()
      belowLeft()
      belowRight()
      console.log(count)
    } else if (event.target.value >= cellCount - width){
      // console.log('bottom')
      count = 0
      over()
      overLeft()
      overRight()
      left()
      right()
      console.log(count)
    } else if (event.target.value % width === width-1){
      // console.log('right')
      count = 0
      left()
      overLeft()
      belowLeft()
      over()
      below()
      console.log(count)
    } else if (event.target.value % (width) === 0){
      // console.log('left')
      count = 0
      right()
      over()
      below()
      overRight()
      belowRight()
      console.log(count)
    } else {
      count=0
      right()
      left()
      over()
      overRight()
      overLeft()
      below()
      belowRight()
      belowLeft()
      console.log(count)

   }
   cells[event.target.value].innerText = count
  }
  createGrid()
  const buttonSelected = document.querySelectorAll('#tile')
  // console.log(buttonSelected)
  const countAll = document.querySelectorAll('#tile').length
  // console.log(countAll)

  let createMineArray =[]
  while (createMineArray.length != 10){
    const randomNumberMine = Math.floor(Math.random() * cells.length)
    if (!createMineArray.includes(randomNumberMine)){
      createMineArray.push(randomNumberMine)
      createMines(randomNumberMine)
      cells[randomNumberMine].setAttribute('mine',true)
      // console.log(cells[randomNumberMine])
    }}

  // console.log(cells)
// buttonSelected.forEach(div => div.addEventListener('click', rowColumnTest))
buttonSelected.forEach(div => div.addEventListener('click', consoleLogTest))


}

window.addEventListener('DOMContentLoaded', init)

   // console.log(`bottom right -> ${parseFloat(event.target.value)+ parseFloat(width) +1}`)
      // console.log(`bottom left -> ${parseFloat(event.target.value)+ parseFloat(width) -1}`)
      // console.log(`bottom -> ${parseFloat(event.target.value)+ parseFloat(width)}`)
      // console.log(`right -> ${parseFloat(event.target.value)+1}`)
      // console.log(`left -> ${parseFloat(event.target.value)-1}`)
      // console.log(`top -> ${parseFloat(event.target.value)- parseFloat(width)}`)
      // console.log(`top right -> ${parseFloat(event.target.value)- parseFloat(width) +1}`)
      // console.log(`top left -> ${parseFloat(event.target.value)-parseFloat(width)-1}`)
      // if (cells[parseFloat(event.target.value)-parseFloat(width)].classList.contains('mine')){
      //   count+=1} 
      // if(cells[parseFloat(event.target.value)-parseFloat(width)-1].classList.contains('mine')){
      //   count+=1} 
      // if(cells[parseFloat(event.target.value)-parseFloat(width)+1].classList.contains('mine')){
      //   count+=1} 
      // if(cells[parseFloat(event.target.value)-1].classList.contains('mine')){
      //   count+=1} 
      // if(cells[parseFloat(event.target.value)+1].classList.contains('mine')){
      //   count+=1} 
      // if(cells[parseFloat(event.target.value)+parseFloat(width)].classList.contains('mine')){
      //   count+=1} 
      // if(cells[parseFloat(event.target.value)+parseFloat(width)-1].classList.contains('mine')){
      //   count+=1} 
      // if(cells[parseFloat(event.target.value)+parseFloat(width)+1].classList.contains('mine')){
      //   count+=1}
      // right()
      // left()
      // below()
      // over()

      // ! working method for counting squares around

       // function left(){
  //   if(cells[parseFloat(event.target.value)-1].classList.contains('mine')){
  //     count+=1} 
  // }
  // function right(){
  //   if(cells[parseFloat(event.target.value)+1].classList.contains('mine')){
  //   count+=1} 
  // }
  // function below(){
  //   if(cells[parseFloat(event.target.value)+parseFloat(width)].classList.contains('mine')){
  //     count+=1} 
  // }
  // function over(){
  //   if (cells[parseFloat(event.target.value)-parseFloat(width)].classList.contains('mine')){
  //     count+=1} 
  // }

  // function belowLeft(){
  //   if(cells[parseFloat(event.target.value)+parseFloat(width)-1].classList.contains('mine')){
  //     count+=1} 
  // }

  // function belowRight(){
  //   if(cells[parseFloat(event.target.value)+parseFloat(width)+1].classList.contains('mine')){
  //     count+=1}
  // }

  // function overLeft(){
  //   if(cells[parseFloat(event.target.value)-parseFloat(width)-1].classList.contains('mine')){
  //     count+=1} 
  // }
  
  // function overRight(){
  //   if(cells[parseFloat(event.target.value)-parseFloat(width)+1].classList.contains('mine')){
  //     count+=1} 
  // }
  // function consoleLogTest(event){
  //   if (event.target.classList.contains('mine')){
  //     console.log('lose')}
  //   else if (event.target.value === '0'){
  //      // console.log('top left')
  //     count = 0
  //     right()
  //     belowRight()
  //     below()
  //     console.log(count)
  //   } else if (parseFloat(event.target.value) === cellCount-1){
  //      // console.log('bottom right')
  //     count = 0
  //     over()
  //     overLeft()
  //     left()
  //     console.log(count)
  //   } else if (parseFloat(event.target.value)=== cellCount-width){
  //      // console.log('bottom left')
  //     count = 0
  //     over()
  //     overRight()
  //     right()
  //     console.log(count)
  //   } else if (parseFloat(event.target.value) === width-1){
  //     // console.log('top right')
  //     count = 0
  //     below()
  //     left()
  //     belowLeft()
  //     console.log(count)
  //   } else if (event.target.value <= width-1){
  //     // console.log('top row')
  //     count = 0
  //     right()
  //     left()
  //     below()
  //     belowLeft()
  //     belowRight()
  //     console.log(count)
  //   } else if (event.target.value >= cellCount - width){
  //     // console.log('bottom')
  //     count = 0
  //     over()
  //     overLeft()
  //     overRight()
  //     left()
  //     right()
  //     console.log(count)
  //   } else if (event.target.value % width === width-1){
  //     // console.log('right')
  //     count = 0
  //     left()
  //     overLeft()
  //     belowLeft()
  //     over()
  //     below()
  //     console.log(count)
  //   } else if (event.target.value % (width) === 0){
  //     // console.log('left')
  //     count = 0
  //     right()
  //     over()
  //     below()
  //     overRight()
  //     belowRight()
  //     console.log(count)
  //   } else {
  //     count=0
  //     right()
  //     left()
  //     over()
  //     overRight()
  //     overLeft()
  //     below()
  //     belowRight()
  //     belowLeft()
  //     console.log(count)

   // }if (count === 1){
    //     console.log('one')
    //   }

  // ! testing to makes squares red or blue
     // for (let i = 0; i < cells.length; i++){
    //   if (parseFloat(i) % 2){
    //     console.log(i)
    //     cells[i].classList.add(newClass)
    //     console.log(i)
    // }
    // }
  // a function that adds the character class to a given cell
  // function makeBlue(){
  //   if position % 2 === 0 ? cells[position].classList.add('blue'): 
  // }