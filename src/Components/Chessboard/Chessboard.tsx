import React, { useRef, useState } from "react";
import Tile from "./Tile";
import Refree from "../../refree/Refree";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horixontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: pieceType;
  team: teamPlayer;
}

export enum teamPlayer {
  Player1,
  Player2,
}

export enum pieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  CASTLE,
  KING,
  QUEEN,
}

const inititalPieces: Piece[] = [];
for (let p = 0; p < 2; p++) {
  const teamType = p === 0 ? teamPlayer.Player1 : teamPlayer.Player2;
  const type = teamType === teamPlayer.Player1 ? "d" : "l";
  const y = teamType === teamPlayer.Player1 ? 7 : 0;
  inititalPieces.push({
    image: `../assets/images/Chess_r${type}t60.png`,
    x: 0,
    y: y,
    type: pieceType.CASTLE,
    team: teamType,
  });
  inititalPieces.push({
    image: `../assets/images/Chess_r${type}t60.png`,
    x: 7,
    y: y,
    type: pieceType.CASTLE,
    team: teamType,
  });
  inititalPieces.push({
    image: `../assets/images/Chess_n${type}t60.png`,
    x: 1,
    y: y,
    type: pieceType.KNIGHT,
    team: teamType,
  });
  inititalPieces.push({
    image: `../assets/images/Chess_n${type}t60.png`,
    x: 6,
    y: y,
    type: pieceType.KNIGHT,
    team: teamType,
  });
  inititalPieces.push({
    image: `../assets/images/Chess_b${type}t60.png`,
    x: 2,
    y: y,
    type: pieceType.BISHOP,
    team: teamType,
  });
  inititalPieces.push({
    image: `../assets/images/Chess_b${type}t60.png`,
    x: 5,
    y: y,
    type: pieceType.BISHOP,
    team: teamType,
  });
  inititalPieces.push({
    image: `../assets/images/Chess_k${type}t60.png`,
    x: 3,
    y: y,
    type: pieceType.KING,
    team: teamType,
  });
  inititalPieces.push({
    image: `../assets/images/Chess_q${type}t60.png`,
    x: 4,
    y: y,
    type: pieceType.QUEEN,
    team: teamType,
  });
}

for (let i = 0; i < 8; i++) {
  inititalPieces.push({
    image: "../assets/images/Chess_pdt60.png",
    x: i,
    y: 6,
    type: pieceType.PAWN,
    team: teamPlayer.Player1,
  });
}
for (let i = 0; i < 8; i++) {
  inititalPieces.push({
    image: "../assets/images/Chess_plt60.png",
    x: i,
    y: 1,
    type: pieceType.PAWN,
    team: teamPlayer.Player2,
  });
}

function Chessboard() {
  const [activePiece, setAtctivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const refree = new Refree();

  const [pieces, setPieces] = useState<Piece[]>(inititalPieces);
  console.log(pieces);

  const chessBoard = useRef<HTMLDivElement>(null);

  function grabPiece(e: React.MouseEvent<HTMLDivElement>) {
    const element = e.target as HTMLElement;
    const Board = chessBoard.current;

    if (element.classList.contains("w") && Board) {
      setGridX(Math.floor((e.clientX - Board.offsetLeft) / 100));
      setGridY(Math.abs(Math.ceil((e.clientY - Board.offsetTop - 800) / 100)));

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setAtctivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const Board = chessBoard.current;
    if (activePiece && Board) {
      const winX = Board.offsetLeft - 25;
      const winY = Board.offsetTop - 25;
      const maxX = Board.offsetLeft + Board.clientWidth - 75;
      const maxY = Board.offsetTop + Board.clientWidth - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < winX) {
        activePiece.style.left = `${winX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < winY) {
        activePiece.style.top = `${winY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const Board = chessBoard.current;

    if (activePiece && Board) {
      const x = Math.floor((e.clientX - Board.offsetLeft) / 100);
      const y = Math.abs(Math.ceil((e.clientY - Board.offsetTop - 800) / 100));

      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const attackPiece = pieces.find((p) => p.x === x && p.y === y);

      if (currentPiece) {
        const validMove = refree.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        if (validMove) {
          const updatePieces = pieces.reduce((results, piece) => {
            if (piece.x === currentPiece.x && piece.y === currentPiece.y) {
              piece.x = x;
              piece.y = y;
              results.push(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatePieces);

          //  setPieces((value) => {
          //  const pieces = value.reduce((results, piece) => {
          //    if (piece.x === currentPiece.x && piece.y === currentPiece.y) {
          //      piece.x = x;
          //      piece.y = y;
          //      results.push(piece);
          //    } else if (!(piece.x === x && piece.y === y)) {
          //      results.push(piece);
          //    }
 
          //    return results;
          //  }, [] as Piece[]);

          //  return pieces;
          //});
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setAtctivePiece(null);
    }
  }

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horixontalAxis.length; i++) {
      const number = j + i + 2;
      let image: string = "";

      inititalPieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${j}, ${i}`} image={image} number={number} />);
    }
  }

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessBoard}
      className="w-[800px] grid grid-cols-8 grid-rows-[8] place-content-center h-[800px] ring-4 ring-green-400 bg-[#779556]"
    >
      {board}
    </div>
  );
}

export default Chessboard;
