import React from "react";
import "./Tile.css";
interface Props {
  number: number;
  image: string;
}
function Tile({ number, image }: Props) {
  if (number % 2 === 0) {
    return (
      <div className="w-[100px] h-[100px] bg-[#ebecd0] flex items-center justify-center ">
        {image && <div className="w" style={{ backgroundImage: `url(${image})` }}></div>}
      </div>
    );
  } else {
    return (
      <div className="w-[100px] h-[100px] flex items-center justify-center bg-[#779556]">
        {image && <div className="w" style={{ backgroundImage: `url(${image})` }}></div>}
      </div>
    );
  }
}

export default Tile;
