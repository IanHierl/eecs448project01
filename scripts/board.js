var w = 20
var gameBoard
var rows
var cols
var totalBoom
function setup(){
    //reset()
    loop()
    let size = (w*Number(document.getElementById("input1").value)+1)
    rows = floor(size/w)
    cols = floor(size/w)
    totalBoom = document.getElementById("input2").value
    let cnv = createCanvas(size, size)
    cnv.parent('board')
    background(255, 0, 200);
    rows = floor(size/w)
    cols = floor(size/w)
    gameBoard = build2DArray(rows, cols)
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          let boom = 0
        gameBoard[i][j] = new Box(i*w, j*w, w, boom)
        }
    }
    //initBoom
    while(totalBoom != 0){
      var randX = Math.floor(Math.random() * rows)
      var randY = Math.floor(Math.random() * cols)
      if(gameBoard[randX][randY].boom == 0){
        gameBoard[randX][randY].boom = -1
      }
      totalBoom--
    }
    //setup value
      for(var i = 0 ; i <rows; i++)
      {
          for(var j = 0; j <cols; j ++ )
          {
              var center = gameBoard[i][j].boom
              if(center == -1)
              {
                  continue
              }
              var centerDisplayNum = getCenterCount(i,j)
              gameBoard[i][j].boom = centerDisplayNum
          }
      }
      

    return(false)
}

function reset() {
  gameBoard = []
  rows = 0
  cols = 0;
  totalBoom = 10
}

function mouseClicked() {
  for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        var myX = gameBoard[i][j].x
        var myY = gameBoard[i][j].y
        if( myX < mouseX)
          if( myX + w > (mouseX) )
            if( myY < mouseY)
              if( myY + w > (mouseY ) ){
                gameBoard[i][j].clicked = true
              }
    }
  }
}

class Box {
    constructor(x, y, w, boom ){
        this.x = x
        this.y = y
        this.w = w
        this.clicked = false
        this.boom = 0
    }

    draw () {
      stroke(255)
      text(this.boom, this.x+this.w*.25, this.y+this.w*.75)
      
      if(this.clicked && this.boom == -1){
        fill(100)
        text(this.boom, this.x+this.w*.25, this.y+this.w*.75)
      }
      else if(this.clicked && this.boom != -1){
        fill(100)
        text(this.boom,this.x+this.w*.25, this.y+this.w*.75)
      }
      else {
        fill(100)
        rect(this.x,this.y,this.w,this.w)
      }
    }
}



function build2DArray (rows, cols){
  var array = new Array(rows);
  for (var i = 0; i < array.length; i++) {
    array[i] = new Array(cols)
  }
  return array
}

function draw() {
    background(500)
    for (var i = 0; i<rows; i++) {
        for (var j=0; j<cols; j++) {
            gameBoard[i][j].draw()
        }
    }
}

function getCenterCount(x,y){
  var position = [
  [x -1, y -1],
  [x -1, y],
  [x -1, y +1],
  [x, y -1],
  [x, y +1],
  [x +1, y -1],
  [x +1, y],
  [x +1, y +1], 
  ]
  var count = 0
  for (var i =0 ; i< position.length ; i++)
  {
      var a = position[i][0]
      var b = position[i][1]
      try{
          count += (gameBoard[a][b].boom == -1)
      }
      catch(e){}
  }
  return count 
}