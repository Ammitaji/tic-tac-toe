import React, { useEffect, useState } from 'react';
import './App.css';

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const App = () => {
    const [options, setOptions] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [statusText, setStatusText] = useState("X's turn");
    const [running, setRunning] = useState(true);

    const initializeGame = () => {
        setOptions(Array(9).fill(""));
        setCurrentPlayer("X");
        setStatusText("X's turn");
        setRunning(true);
    };

    const cellClicked = (index) => {
        if (options[index] !== "" || !running) return;

        const newOptions = [...options];
        newOptions[index] = currentPlayer;
        setOptions(newOptions);
        checkWinner(newOptions);
    };

    const checkWinner = (newOptions) => {
        let roundWon = false;

        for (let [a, b, c] of winConditions) {
            if (newOptions[a] === "" || newOptions[b] === "" || newOptions[c] === "") continue;
            if (newOptions[a] === newOptions[b] && newOptions[b] === newOptions[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            setStatusText(`${currentPlayer} wins!`);
            setRunning(false);
        } else if (!newOptions.includes("")) {
            setStatusText("Draw!");
            setRunning(false);
        } else {
            changePlayer();
        }
    };

    const changePlayer = () => {
        setCurrentPlayer((prevPlayer) => {
            const newPlayer = prevPlayer === "X" ? "O" : "X";
            setStatusText(`${newPlayer}'s turn`);
            return newPlayer;
        });
    };

    useEffect(() => {
        initializeGame();
    }, []);

    return (
        <div id="gameContainer">
            <h1>Tic Tac Toe</h1>
            <div id="cellContainer">
                {options.map((cell, index) => (
                    <div
                        key={index}
                        className="cell"
                        onClick={() => cellClicked(index)}
                        role="button"
                        tabIndex={0}
                    >
                        {cell}
                    </div>
                ))}
            </div>
            <h2 id="statusText">{statusText}</h2>
            <button id="restartBtn" onClick={initializeGame}>Restart</button>
        </div>
    );
};

export default App;
