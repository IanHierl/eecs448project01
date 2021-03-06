/** @fileOverview This class describes boxes and the definitions of their traits
  * @author Kevin Dinh, Eric Seals, Eric D. Fan, Evan Trout
  * @constructor
  * @property boom boolean to decide if the box is a bomb
  * @property revealed boolean to decide if the box has been revealed
  * @property flagged boolean to decided if the box has a flag
  */
class Box {
    constructor(x, y, w, boom ){
        this.x = x
        this.y = y
        this.w = w
        this.boom = 0
        this.revealed = false
	      this.flagged = false
    }

    draw () {
      stroke(50, 50, 70)
      if(this.revealed && this.boom == -1){
        fill(255, 255, 255)
        stroke(255, 255, 255)
        circle(this.x+10,this.y+10, 3);
        //text(this.boom, this.x+this.w*.25, this.y+this.w*.75)
      }
      else if(this.revealed && this.boom != -1){
        fill(216, 186, 255)
        stroke(216, 186, 255)
        if (this.boom > 0) {
          text(this.boom,this.x+this.w*.25, this.y+this.w*.75)
        }
      }
      else if (this.flagged){
         fill(107, 220, 254)
	      triangle(this.x+5, this.y+15, this.x+10, this.y, this.x+15, this.y+15)
      }
      else {
        fill(107, 220, 254)
        //text(this.boom,this.x+this.w*.25, this.y+this.w*.75)
        rect(this.x,this.y,19,this.w,6)
      }
    }
}

/**Places a flag to indicate there is a bomb in the box
  *@function endGameWin checks win condition
  */
function flagBox(i, j)
{
  gameBoard[i][j].flagged = true
  flagPool--
  if (gameBoard[i][j].boom == -1)
  {
    correctFlags++
    if (correctFlags == flagGoal)
    {
      endGameWin()
    }
  }
}

/**Removes a flag
  */
function unFlagBox(i, j)
{
  if (gameBoard[i][j].boom == -1)
  {
    correctFlags--
  }
  gameBoard[i][j].flagged = false
  flagPool++
}

/**Checks surrounding boxes for bombs and reveals them if they are not
  * @param {number} i row of gameBoard
  * @param {number} j column of gameBoard
  * @function recurseReveal checks surrounding boxes
  * @function endGameLose checks losing condition
  */
function reveal(i, j)
{
  if (gameBoard[i][j].boom == 0 && !gameBoard[i][j].revealed && !gameBoard[i][j].flagged)
  {
    gameBoard[i][j].revealed = true
    recurseReveal(i, j)
  }
  else if (gameBoard[i][j].boom == -1 && !gameBoard[i][j].flagged)
  {
    gameBoard[i][j].revealed = true
    endGameLose()
  }
  else if (!gameBoard[i][j].flagged)
  {
    gameBoard[i][j].revealed = true
  }
}

/**Recursion function to check surrounding boxes for bombs
  * @param {number} curI row of gameBoard
  * @param {number} curJ column of gameBoard
  * @function reveal checks the next bomb in the recursion
  */
function recurseReveal(curI, curJ)
{
  if (gameBoard[curI][curJ].boom == 0)
  {
    for (let i = -1; i <= 1; i++)
    {
      for (let j = -1; j <= 1; j++)
      {
        let newI = curI + i
        let newJ = curJ + j
        if (newI >= 0 && newI < rows)
        {
          if (newJ >= 0 && newJ < cols)
          {
            reveal(newI, newJ)
          }
        }
      }
    }
  }
}
