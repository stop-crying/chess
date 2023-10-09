import React from 'react';
import './App.css';
import Chessboard from './Components/Chessboard/Chessboard';


function App() {
  return (
    <div className= " bg-gray-900 grid h-screen place-content-center ">
      <Chessboard />
    </div>
  );
}

export default App;
