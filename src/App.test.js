// src/App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Tic Tac Toe', () => {
    test('renders Tic Tac Toe title', () => {
        render(<App />);
        const titleElement = screen.getByText(/Tic Tac Toe/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('initial status shows player X turn', () => {
        render(<App />);
        const statusText = screen.getByText(/X's turn/i);
        expect(statusText).toBeInTheDocument();
    });

    test('clicking a cell updates the cell', () => {
        render(<App />);
        const cells = screen.getAllByRole('button');
        fireEvent.click(cells[0]);
        expect(cells[0]).toHaveTextContent('X');
    });

    test('player X wins', () => {
        render(<App />);
        const cells = screen.getAllByRole('button');
        
        fireEvent.click(cells[0]); // X
        fireEvent.click(cells[3]); // O
        fireEvent.click(cells[1]); // X
        fireEvent.click(cells[4]); // O
        fireEvent.click(cells[2]); // X (X wins)

        const statusText = screen.getByText(/X wins!/i);
        expect(statusText).toBeInTheDocument();
    });

    test('restart button resets the game', () => {
        render(<App />);
        const cells = screen.getAllByRole('button');

        // Simulate a few moves
        fireEvent.click(cells[0]); // X
        fireEvent.click(cells[1]); // O

        // Click the restart button
        const restartButton = screen.getByText(/Restart/i);
        fireEvent.click(restartButton);

        // Check that the status text is back to X's turn
        const statusText = screen.getByText(/X's turn/i);
        expect(statusText).toBeInTheDocument();

        // Ensure all cells are empty
        const updatedCells = screen.getAllByRole('button');
        updatedCells.forEach(cell => {
            expect(cell).toHaveTextContent(''); // Ensure all cells are empty
        });

        // Ensure the current player is reset to X
        expect(updatedCells[0]).toHaveTextContent(''); // Cell 0 should be empty
        expect(updatedCells[1]).toHaveTextContent(''); // Cell 1 should be empty
        expect(updatedCells[2]).toHaveTextContent(''); // Cell 2 should be empty
    });
});

