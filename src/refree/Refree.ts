import {
  Piece,
  pieceType,
  teamPlayer,
} from "../Components/Chessboard/Chessboard";

export default class Refree {
  titleOccupied(x: number, y: number, baordState: Piece[]): boolean {
    console.log("Checking if tile is occupied");

    const piece = baordState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else return false;
  }

  tileIsOccupied(
    x: number,
    y: number,
    baordState: Piece[],
    team: teamPlayer
  ): boolean {
    const piece = baordState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: pieceType,
    team: teamPlayer,
    boardState: Piece[]
  ) {
    console.log("refree is checking move");
    console.log(`prev position : (${x} , ${y})`);
    console.log(`prev position : (${px} , ${py})`);
    console.log(`prev position : (${type})`);
    console.log(`prev position : (${team})`);

    if (type === pieceType.PAWN) {
      const specialRow = team === teamPlayer.Player2 ? 1 : 6;
      const pawnDirect = team === teamPlayer.Player2 ? 1 : -1;

      if (px === x && py === specialRow && y - py === 2 * pawnDirect) {
        if (
          !this.titleOccupied(x, y, boardState) &&
          !this.titleOccupied(x, y - pawnDirect, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirect) {
        if (!this.titleOccupied(x, y, boardState)) {
          return true;
        }
      } else if (x - px === -1 && y - py === pawnDirect) {
        // attack in upper or bottom
        console.log("left corner");
        if (this.tileIsOccupied(x, y, boardState, team)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirect) {
        console.log("right corner");
        // attack in the upper or botto right corner
        if (this.tileIsOccupied(x, y, boardState, team)) {
          return true;
        }
      }
    }
    return false;
  }
}
