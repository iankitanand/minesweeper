import React from 'react';

function Cell({details, updateFlag, revealCell}){

  //const cssClassesToAdd='singleCell';
  return(
    <div onClick={()=>revealCell(details.x,details.y)} onContextMenu={(e)=>updateFlag(e,details.x,details.y)} className={details.revealed?(details.value === 'X'?('revealed bomb singleCell'):('revealed singleCell')):('singleCell')}>


    {!details.revealed && details.flagged? (
      "🚩"
    ):details.revealed && details.value!==0?(
      details.value === 'X'?(
        "B"
      ) : (
        details.value
      )
    ): (
      ""
    )}
    </div>
  )
}

export default Cell;
