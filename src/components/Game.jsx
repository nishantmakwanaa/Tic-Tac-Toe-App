import { useState } from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

function Game() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [gameOver, setGameOver] = useState(false);
  const [winPositions, setWinPositions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isTransparent, setIsTransparent] = useState(false);

  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const moveSound = new Audio("/sounds/move.mp3");
  const winSound = new Audio("/sounds/win.mp3");

  const handleClick = (index) => {
    if (grid[index] === "" && !gameOver && currentPlayer === "X") {
      const newGrid = [...grid];
      newGrid[index] = currentPlayer;
      setGrid(newGrid);

      moveSound.play();

      const winner = checkWinner(newGrid);
      if (winner) {
        setGameOver(true);
        setWinPositions(winner);
        setWinner(currentPlayer);
        winSound.play();
        setIsTransparent(true);
      } else {
        setCurrentPlayer("O");

        if (!newGrid.includes("") && !winner) {
          setTimeout(() => {
            setGameOver(true);
            setWinner("Draw");
            setIsTransparent(true);
          }, 500);
        } else {
          setTimeout(() => makeComputerMove(newGrid), 1000);
        }
      }
    }
  };

  const makeComputerMove = (newGrid) => {
    const emptyIndexes = newGrid
      .map((value, index) => (value === "" ? index : null))
      .filter((val) => val !== null);

    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    newGrid[randomIndex] = "O";

    setGrid(newGrid);

    moveSound.play();

    const winner = checkWinner(newGrid);
    if (winner) {
      setGameOver(true);
      setWinPositions(winner);
      setWinner("O");
      winSound.play();
      setIsTransparent(true);
    } else {
      setCurrentPlayer("X");
    }
  };

  const checkWinner = (newGrid) => {
    for (let position of winningPositions) {
      const [a, b, c] = position;
      if (
        newGrid[a] &&
        newGrid[a] === newGrid[b] &&
        newGrid[a] === newGrid[c]
      ) {
        return position;
      }
    }
    return null;
  };

  const resetGame = () => {
    setGrid(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameOver(false);
    setWinPositions([]);
    setWinner(null);
    setIsTransparent(false);
    setGameStarted(true);
  };

  return (
    <div
      className={`h-screen w-screen bg-gradient-bg bg-cover flex items-center justify-center ${
        isTransparent ? "bg-transparent" : ""
      }`}
    >
      {winner && isTransparent && (
        <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-3xl text-center py-4">
          {winner === "X"
            ? "You Win ! "
            : winner === "O"
            ? "Computer Wins !"
            : "Draw !"}
        </div>
      )}
      {!gameStarted ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-xl shadow-lg text-2xl font-bold hover:opacity-90"
          onClick={() => setGameStarted(true)}
        >
          Start Game
        </motion.button>
      ) : (
        <div className="relative flex flex-col items-center">
          <div className="text-3xl text-white font-bold mb-4">
            Current Player :{" "}
            <span className="text-yellow-300">
              {currentPlayer === "X" ? "You" : "Computer"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {grid.map((value, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.9 }}
                className={`w-28 h-28 bg-opacity-80 bg-white shadow-lg rounded-lg flex justify-center items-center cursor-pointer text-4xl font-bold ${
                  winPositions.includes(index)
                    ? "bg-green-400 text-white"
                    : "text-black"
                }`}
                onClick={() => handleClick(index)}
              >
                {value}
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white text-lg font-bold rounded-lg shadow-lg hover:opacity-90"
            onClick={resetGame}
          >
            Reset Game
          </motion.button>
        </div>
      )}
      <div className="absolute bottom-6 right-6 flex flex-col space-y-4">
        <motion.a
          href="/"
          whileHover={{ scale: 1.1 }}
          className="p-6 bg-blue-500 text-white rounded-full shadow-lg text-lg font-bold hover:opacity-90 flex justify-center items-center"
        >
          <FaHome size={20} />
        </motion.a>
        <motion.a
          href="https://www.nishantworldwide.in/"
          whileHover={{ scale: 1.1 }}
          className="p-6 bg-green-500 text-white rounded-full shadow-lg text-lg font-bold hover:opacity-90 flex justify-center items-center"
        >
          <FaCode size={20} />
        </motion.a>
      </div>
    </div>
  );
}

export default Game;
