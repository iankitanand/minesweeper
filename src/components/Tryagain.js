import React from 'react';

const Tryagain=({resetBoard})=>{
  return(
    <div>
      <a className="tryAgainButton" onClick={resetBoard}>Try Again</a>
    </div>
  )
}

export default Tryagain;
