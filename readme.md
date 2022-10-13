ReadMe Sections


## Description

After three weeks on the General Assembly Software Engineering Immersive course, I have completed my first project. So far, classes have focussed on HTML, CSS and JavaScript. Using these, we were assigned a brief of creating a grid-based game. I chose to create the game Minesweeper as it was presented as one of the most challenging options available.


## Deployment link


https://jrose117.github.io/project1/


## Overview

!(./ReadMe1/1.gif)


### Timeframe & Working Team (Solo/Pair/Group)
 
Solo
I worked independently, and the project had a one-week deadline. 


### Technologies Used
 
JavaScript
HTML
CSS
Excalidraw
GitHub

### Brief

!(./ReadMe1/2.png)

### Planning

Whenever you click a tile on minesweeper, either a mine or a number is revealed. The number revealed tells you how many mines that tile is touching. If the tile you click on isn’t touching any mines, it is blank and the surrounding tiles are revealed, in this project I called these ‘zero’ tiles. The big challenge with this project would be how to manage the tiles which surround ‘zero’ tiles. I was aware of the potential problems that could occur especially when it came to infinite loops between two ‘zero’ tiles next to each other. I decided to streamline my planning by focusing on the big parts of the game, as if this didn’t work, nothing else would. Once I had created an MVP which would manage the ‘zero’ tiles, I would then plan how to add extra features. 
 
My initial plan to make an MVP was to -> 
 
1)    Create a grid made up of cells
2)    Add values to each cell
3)    Randomly assign mines
4)    Create a function to count the number of mines around each cell (count value)
5)    Add a ‘lose’ function if a mine is clicked
 
My first idea was to find the count value of every cell as the game loads. I would then create arrays, and ‘zero’ cells touching and the surrounding numbers would be added to the array. I would start on the top left of the grid and make my way to the bottom right. If the user clicked on a cell, then the whole array would reveal. 

The problem was I couldn’t find an efficient method to create the correct number of arrays. 
 
I then changed my idea to include recursion. I knew that I needed to add extra features (win conditions, flags, timers) but my MVP just needed to show that the ‘zero’ tiles would show when they were supposed to. 

Once this feature works, I could add features to check for win conditions (does number of cells minus revealed tiles = mines?). I could add flags (if flags are switched on it places a flag on the tile, or if there is already a flag it removes a flag. When there is a flag on a tile, it cannot be clicked.) I could add a timer (the timer should start on the player’s first click and end at game over – win or lose). I could add a reset button (This would mean the player could restart without having to refresh the page). If I was feeling ambitious, I could also add difficulty levels which would add more mines. I also needed to add the extra rules Minesweeper has – for example a condition to check that the player’s first click is never a mine. 
 
I drew out the process that every click would trigger, see below:

!(./ReadMe1/3.png)

### Build/Code Process

My Code breaks down into three main functions
1)    createGrid 
2)    runGame (including createMines)
3) 
i) checkArea (tile count > 0 || mine)
ii)checkArea (tile count === 0)
 
 
#### createGrid

This function created our grid. The grid changed size based on the difficulty level with easy being 8 x 8 and challenge being 16 x 16.
 
It went through and gave each cell an ‘i’ value (the first cell had an i value of 0 and the last cell had an i value of width * height– 1), an ‘x’ value (its x coordinate) and a ‘y’ value (its y coordinate)

!(./ReadMe1/4.png)

####  runGame

When runGame was triggered, it checked multiple conditions. Is the game running?  Has the tile already been revealed? Is it the player’s first click? Are flags on? Is there a Mine?
 
If the game was running, the process continued, otherwise it returned, ending the process.
If the tile had not yet been revealed, the process continued, otherwise it returned, ending the process. 
If flags were on, if the tile clicked was a flag it turned the flag off then returned, and if the tile clicked was not a flag it became a flag, then returned. 
If there was a mine on the tile selected, the game stopped running and the player lost. 
If it was the players first click, it added the current tile to the createMineArray then ran the createMines function and then continued. 
 
#### createMines
 
The createMines function ran whilst the length of the createMineArray did not equal the number of mines + 1. Each time, it chose a random number and checked to see if it is already in createMineArray. If it is not already in the array, it added it to the array and then ran the function on that number. It then added the attribute mine to that randomly chosen cell value. 
 
!(./ReadMe1/5.png)
 
#### checkArea
 
Within checkArea, x and y values are used. This was done to make sure that only tiles next to our selected tiles were checked and not tiles numerically next to our selected tile. Without this, tile 7 (end of row 0 – coordinate 7,0) would check tile 8 (start of row 1 – coordinate 0,1)
 
!(./ReadMe1/6.png)
 
I then used a filter to make sure only coordinates within our grid were accepted (preventing invalid coordinates such as -1,-1 from being checked.) and then used count to add 1 every time one of the surrounding cells contained a mine. I would add a ‘revealed’ class when the tiles had been checked, and added 1 to the ‘revealed’ count. 
 
If the count value was greater than zero, the innerHTML would change to the tile’s count value, the check win function would check if number of cells minus revealed tiles = mines and if it did the game would end.

!(./ReadMe1/7.png)

checkArea -> count value === 0
 
If the count value === 0, the function would rerun, but instead of taking the event.target.value, it would take the surrounding coordinates as values. If the surrounding coordinate had already been revealed it would skip the process for that tile. This meant it would repeat until every touching ‘zero’ or number had been revealed. 
 
!(./ReadMe1/8.png)
 
### Challenges


The challenges were:
 
- having to add bounds to stop the cells counting the cells numerically next to them, instead of actually next to them.
- preventing endless loops during the recursion step – this was prevented by adding that it should only check surrounding tiles which had not been revealed.
- making sure only tiles within the grid were checked – this was managed by checking that only tiles within our filtered array were checked.
- making sure that tiles touching were checked instead of the numerically touching tiles – this was achieved using coordinates.


### Wins

This was my first major project at General Assembly. It was my first time having to plan ahead for a full week’s worth of work. The initial brief felt overwhelming, we had been learning JavaScript for only two weeks when this project was set. In that time we had completed a few ‘Codewars’ style logic problems and learnt how to make a grid - creating something as complicated as minesweeper was a huge step up. 

In this context, every small success felt like a huge win. I celebrated when I made a grid, celebrated again when I made the grid dynamic, and celebrated when my “console log” command showed that I was clicking tiles. 

I chose to complete Minesweeper because it was a “level 3” project (level 3 being the most difficult) and was one of a small handful of people on the course to aim so high. Not only was I able to get the game working, including getting the “0 tiles” to work without any bugs, but I was actually able to achieve my stretch goals. 

I added a working timer and flags. I added a restart button, so the player can reset without having to refresh the page. There were points, especially at the start of the project, where I didn’t think I would be able to get any of it working and so I am very happy with the end result. 

### Key Learnings/Takeaways


I learnt how to use recursion. This isn’t the most transferable skill but what was helpful was having to learn to be adaptable with my thinking and having to quickly adjust to new ways of applying logic. 

I learnt the importance of a strong plan - I broke down every single step of code I would need to write and thought carefully about how I would tackle every stage of each  problem. This involved writing pseudocode before I started coding.

I worked out how to turn logical ideas into a working programme.

The most useful takeaway, however, came in the middle of the project. I hit a complete dead end and didn’t understand why my code wasn’t working when I was sure my logic made sense. The reason I didn’t understand why my code was not working was because I didn’t understand my code. Over the past few days, I had written so much and was so keen to keep adding ideas that my code had become a mess. There was too much of it and I had lost track of what each line was doing. This meant that whilst my plan was good, and my idea was good, my execution prevented my game from running properly. 

I fixed this by going through every single line, asking myself what it did, and if it was needed. I slimmed down my code, simplified it, and once I had done this, it worked. This taught me the importance of keeping my code and ideas simple. 

### Bugs

Unfortunately, still new to coding, and focussing so much on the logic, I forgot to make my game mobile friendly. This means it doesn’t appear to work properly on mobile on challenge mode as it adds extra tiles and the grid is the wrong size. 

### Future Improvements
 
I would like to have a level system – when you beat the game on easy mode, it will automatically change the grid to challenge mode. 


