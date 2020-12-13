import React, {useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import createBoard from '../utilities/createBoard.js'
import revealed from '../utilities/reveal.js'
import Cell from '../components/Cell.js'
import Tryagain from '../components/Tryagain.js'

const Board = () =>{
 const [grid,setGrid]=useState([]);
 const [nonMineCount, setNonMineCount]=useState(0);
 const [mineLocations, setMineLocations]=useState([]);
 const [gameOver, setGameOver]=useState(false);
 const xgrid=10;
 const ygrid=10;
 const mineCount=15
// on component reload and refresh
useEffect(()=>{
   function freshBoard(){
     console.log('useEffect working while grid is being updated');
     // creating a fresh board imported script from utilities folder componentJS
     const newBoard = createBoard(xgrid,ygrid,mineCount);
     setNonMineCount(xgrid*ygrid - 15);
     setMineLocations(newBoard.mineLocation);
     setGrid(newBoard.board)
     //console.log('new board '+newBoard);

   }
   freshBoard();
 },[])

// reset to new game
const resetBoard=()=>{
  const newBoard = createBoard(xgrid,ygrid,mineCount);
  setNonMineCount(xgrid*ygrid - 15);
  setMineLocations(newBoard.mineLocation);
  setGrid(newBoard.board);
  setGameOver(false);
}

// function for right click
const updateFlag = (e,x,y) =>{
   e.preventDefault();
   //console.log('right click');
   let newGrid = JSON.parse(JSON.stringify(grid))
   newGrid[x][y].flagged=true;
   setGrid(newGrid);
   //console.log(newGrid[x][y]);
 }

//

// when clicked on any cell
const revealCell = (x,y) =>{
  if(grid[x][y].revealed || gameOver){
    //console.log('The cell is already revealed, function returing');
    return;
  }
  let newGrid = JSON.parse(JSON.stringify(grid))
  //console.log('ML '+mineLocations);
  if(newGrid[x][y].value==='X'){
    alert('You have clicked a mine, Game over');
    for(let i=0;i<mineLocations.length;i++){
      //console.log('for loop entered');
      newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed=true;
      setGameOver(true);
      //console.log(newGrid);
    }
    setGrid(newGrid);
  } else{
    let newRevealedBoard = revealed(newGrid,x,y,nonMineCount)
    setGrid(newRevealedBoard.arr);
    setNonMineCount(newRevealedBoard.newNonMinesCount);
    if(newRevealedBoard.newNonMinesCount===0){
      setGameOver(true);
    }
    //console.log('new non mine count is '+ nonMineCount)
  }
}

 if(!grid){
   return <div>...loading</div>
 }

  return(
    <div className="board">
    <p>Mine Count: {mineCount}</p>
    <p>Grids without mine: {nonMineCount}</p>
    {gameOver && <Tryagain resetBoard={resetBoard}/>}
    {grid.map((singleRow)=>{
      return(
        <div className="singleBlock">
          {singleRow.map(singleBlock=>{
           return <Cell details={singleBlock} updateFlag={updateFlag} revealCell={revealCell}/>
         })}
        </div>
      )
    })}</div>
  )
}

export default Board;
