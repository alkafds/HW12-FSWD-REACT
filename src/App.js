import * as React from "react";
import { useState } from "react";

import {
  Button,
  Center,
  isLoading,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [isLoading, setIsLoading] = useState(false);

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[square] = calculateNextValue(squares);
    setSquares(newSquares);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the timeout duration as needed
  }

  function renderSquare(i) {
    return (
      <GridItem key={i}>
        <center>
          <Button
            colorScheme="blue"
            variant="outline"
            className="square"
            size="lg"
            width={{ base: "150px" }}
            height={{ base: "150px" }}
            onClick={() => selectSquare(i)}
            disabled={!!squares[i] || calculateWinner(squares)}
            style={{ fontSize: "100px" }}
          >
            {squares[i]}
          </Button>
        </center>
      </GridItem>
    );
  }

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <Container p={4}>
      <Center mb={4} fontFamily="Roboto" fontWeight="bold" fontSize="xl">
        {status}
      </Center>

      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {squares.map((_, index) => renderSquare(index))}
      </Grid>
      <Center mt={4}>
        <Button
          colorScheme="blue"
          size="lg"
          isLoading={isLoading}
          onClick={restart}
          loadingText="Resetting"
          variant="outline"
        >
          Reset
        </Button>
      </Center>
    </Container>
  );
}

function Game() {
  return (
    <div>
      <Board />
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Draw!`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <ChakraProvider>
      <Game />
    </ChakraProvider>
  );
}

export default App;
