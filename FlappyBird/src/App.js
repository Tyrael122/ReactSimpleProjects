import { useEffect, useState } from "react";

const defaultPipeWidth = 100;
const defaultSquareSize = 15;

const gravityForce = 0.05;
const liftForce = 80 * gravityForce;

const canvasSize = { height: 700, width: 1000 };

export default function Game() {
  const [squareYCoordinate, setSquareYCoordinate] = useState(
    canvasHeight() / 2
  );
  const [squareSpeed, setSquareSpeed] = useState(0);

  const squarePosition = { x: canvasWidth() / 2, y: squareYCoordinate };

  const [pipeHeight, setPipeHeight] = useState(getRandomPipeHeight());

  const [pipeXCoordinate, setPipeXCoordinate] = useState(canvasWidth());

  const upperPipePosition = { x: pipeXCoordinate, y: 0 };
  const bottomPipePosition = {
    x: pipeXCoordinate,
    y: canvasHeight() - pipeHeight,
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPipeXCoordinate((oldCoordinate) => {
        const newCoordinate = updatePipeXCoordinate(oldCoordinate);
        if (newCoordinate == canvasWidth()) {
          setPipeHeight(getRandomPipeHeight());
        }

        return newCoordinate;
      });

      setSquareSpeed((squareSpeed) => {
        const newSpeed = squareSpeed + gravityForce;

        setSquareYCoordinate((oldCoordinate) =>
          updateSquareYCoordinate(oldCoordinate, newSpeed)
        );

        return newSpeed;
      });

      if (
        isSquareCollidingWithPipes(
          squarePosition,
          upperPipePosition,
          bottomPipePosition,
          pipeHeight
        )
      ) {
        resetGame();

        return;
      }
    });

    return () => clearInterval(intervalId);
  }, [squarePosition, upperPipePosition, bottomPipePosition, pipeHeight]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(`Keydown: ${event.key}`);
      if (event.key === " ") {
        setSquareSpeed(liftSquareUp());
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function liftSquareUp() {
    const newSquareSpeed = -liftForce;

    console.log(`New square speed: ${newSquareSpeed}`);

    return newSquareSpeed;
  }

  function resetGame() {
    setPipeXCoordinate(canvasWidth());
    setSquareYCoordinate(canvasHeight() / 2);
  }

  return (
    <div
      className="center"
      style={{
        height: canvasHeight(),
        width: canvasWidth(),
      }}
    >
      <Pipe position={upperPipePosition} height={pipeHeight} />

      <Square position={squarePosition} />

      <Pipe position={bottomPipePosition} height={pipeHeight} />
    </div>
  );
}

function Square({ position }) {
  return (
    <div
      className="square"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}

function Pipe({ position, height }) {
  return (
    <div
      className="pipe"
      style={{
        position: "absolute",
        height: height,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}

function updatePipeXCoordinate(oldCoordinate) {
  const defaultPipeWidth = 100;
  if (oldCoordinate + defaultPipeWidth <= 0) {
    return canvasWidth();
  }

  return oldCoordinate - 3;
}

function updateSquareYCoordinate(oldCoordinate, squareSpeed) {
  const newCoordinate = oldCoordinate + squareSpeed;

  if (isSquareYCoordinateAtBottom(newCoordinate)) {
    return canvasHeight() - defaultSquareSize;
  }

  return newCoordinate;
}

function isSquareCollidingWithPipes(square, upperPipe, bottomPipe, pipeHeight) {
  if (isSquareCollidingWithPipe(square, upperPipe, pipeHeight)) return true;
  if (isSquareCollidingWithPipe(square, bottomPipe, pipeHeight)) return true;

  return false;
}

function isSquareCollidingWithPipe(squarePosition, pipePosition, pipeHeight) {
  if (
    squarePosition.x > pipePosition.x + defaultPipeWidth ||
    squarePosition.x + defaultSquareSize < pipePosition.x
  ) {
    return false;
  }

  if (
    squarePosition.y > pipePosition.y + pipeHeight ||
    squarePosition.y + defaultSquareSize < pipePosition.y
  ) {
    return false;
  }

  return true;
}

function isSquareYCoordinateAtBottom(coordinate) {
  return coordinate + defaultSquareSize >= canvasHeight();
}

function canvasHeight() {
  return canvasSize.height;
}

function canvasWidth() {
  return canvasSize.width;
}

function getRandomPipeHeight() {
  return getRandomNumberBetween(150, 250);
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
