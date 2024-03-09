import { useEffect, useState } from "react";

const defaultSquareSize = 15;
const initialBodyCount = 3;
const foodBodySizeBonus = initialBodyCount * 2;

const defaultPositionOffset = defaultSquareSize;
const updateIntervalMilli = 35;

const foodAtEdgeProbability = 0.0;
const edgeSize = 200;

export default function Game() {
  const [foodPosition, setFoodPosition] = useState(getRandomPosition());

  const [snakeDirection, setSnakeDirection] = useState("right");
  const [snakePosition, setSnakePosition] = useState({
    x: windowWidth() / 2,
    y: windowHeight() / 2,
  });

  const [snakePositionHistory, setSnakePositionHistory] = useState([]);
  const [bodyCount, setBodyCount] = useState(initialBodyCount);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newPosition = updatePosition(snakePosition, snakeDirection);
      setSnakePosition(newPosition);

      if (isSnakeOutOfBounds(newPosition)) {
        resetGame();
        return;
      }

      if (doesSnakeTouchItself(snakePositionHistory, newPosition)) {
        // O(N)
        console.log(
          `About to reset game due to self touching. New position: ${positionToString(
            newPosition
          )}, history size: ${snakePositionHistory.length}`
        );
        resetGame();
        return;
      }

      setSnakePositionHistory(
        addToSnakePositionHistory(snakePositionHistory, newPosition, bodyCount)
      );

      if (doSquaresTouch(snakePosition, foodPosition)) {
        setFoodPosition(getRandomPosition());

        setBodyCount(bodyCount + foodBodySizeBonus);
      }
    }, updateIntervalMilli);

    return () => clearInterval(intervalId);
  }, [snakePosition]);

  function changeSnakeDirection(newDirection) {
    setSnakeDirection((snakeDirection) => {
      if (areDirectionsOpposite(snakeDirection, newDirection)) {
        console.log(
          `Not resetting due to opposite directions: (Snake's direction: ${snakeDirection}) and (New direction: ${newDirection})`
        );
        return snakeDirection;
      }

      console.log(
        `New direction: ${newDirection}, old direction: ${snakeDirection}`
      );

      return newDirection;
    });
  }

  function doesSnakeTouchItself(snakePositionHistory, snakePosition) {
    for (let i = 0; i < snakePositionHistory.length - 1; i++) {
      if (arePositionsEqual(snakePosition, snakePositionHistory[i])) {
        console.log(
          `Positions (${snakePosition.x}, ${snakePosition.y}) and (${snakePositionHistory[i].x}, ${snakePositionHistory[i].y} are equal)`
        );
        return true;
      }
    }

    return false;
  }

  function isSnakeOutOfBounds(position) {
    if (position.y < 0 || position.x < 0) {
      return true;
    }

    if (
      position.y + defaultSquareSize > windowHeight() ||
      position.x + defaultSquareSize > windowWidth()
    ) {
      return true;
    }
  }

  function resetGame() {
    setBodyCount(initialBodyCount);
    setSnakePositionHistory([]);

    setSnakePosition({
      x: windowWidth() / 2,
      y: windowHeight() / 2,
    });
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(`Keydown: ${event.key}`);
      if (event.key === "ArrowLeft") {
        changeSnakeDirection("left");
      } else if (event.key === "ArrowRight") {
        changeSnakeDirection("right");
      } else if (event.key === "ArrowUp") {
        changeSnakeDirection("up");
      } else if (event.key === "ArrowDown") {
        changeSnakeDirection("down");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Square position={foodPosition} background="orange" />

      {snakePositionHistory.map(
        (
          position // O(N)
        ) => (
          <Square position={position} background="black" />
        )
      )}
    </>
  );
}

function addToSnakePositionHistory(
  snakePositionHistory,
  newPosition,
  numberPositionsToKeep
) {
  if (snakePositionHistory.length > numberPositionsToKeep) {
    snakePositionHistory.shift();
  }

  snakePositionHistory.push(newPosition);
  return snakePositionHistory;
}

function Square({ position, background }) {
  return (
    <div
      className="square"
      style={{
        background: background,
        width: `${defaultSquareSize}px`,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}

function updatePosition(position, direction) {
  if (direction == "left")
    return { x: position.x - defaultPositionOffset, y: position.y };
  if (direction == "right")
    return { x: position.x + defaultPositionOffset, y: position.y };
  if (direction == "up")
    return { x: position.x, y: position.y - defaultPositionOffset };
  if (direction == "down")
    return { x: position.x, y: position.y + defaultPositionOffset };
}

function getRandomPosition() {
  const height = windowHeight();
  const width = windowWidth();

  if (Math.random() < foodAtEdgeProbability) {
    return {
      x: getRandomNumberBetween(width - edgeSize, width - defaultSquareSize),
      y: getRandomNumberBetween(height - edgeSize, height - defaultSquareSize),
    };
  }

  return {
    x: Math.random() * (width - defaultSquareSize),
    y: Math.random() * (height - defaultSquareSize),
  };
}

function doSquaresTouch(position1, position2) {
  const distanceX = Math.abs(position1.x - position2.x);
  const distanceY = Math.abs(position1.y - position2.y);

  // Calculate the sum of half of their side lengths
  const sumOfHalfSideLengths = defaultSquareSize / 2 + defaultSquareSize / 2;

  // Check if the distance is less than or equal to the sum of half side lengths
  return distanceX <= sumOfHalfSideLengths && distanceY <= sumOfHalfSideLengths;
}

function arePositionsEqual(position1, position2) {
  if (position1 == null || position2 == null) return false;
  return position1.x == position2.x && position1.y == position2.y;
}

function areDirectionsOpposite(direction1, direction2) {
  switch (direction1) {
    case "left":
      return direction2 == "right";
    case "right":
      return direction2 == "left";
    case "up":
      return direction2 == "down";
    case "down":
      return direction2 == "up";
    default:
      return false;
  }
}

function positionToString(position) {
  return `(${position.x}, ${position.y})`;
}

function windowHeight() {
  return window.innerHeight;
}

function windowWidth() {
  return window.innerWidth;
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
