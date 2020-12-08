const inputFile = "./aoc2020_day5_input.txt";
let array = [];

fetch(inputFile)
  .then((response) => response.text())
  .then((data) => {
    array = data.split("\n");
  });

// Split a boarding pass ID into a row array and a column array and return both
const getRowAndColumnArrays = (boardingPass) => {
  let charArray = [...boardingPass];
  let rowArray = [];
  let columnArray = [];
  if (charArray.length === 10) {
    rowArray = charArray.slice(0, 7);
    columnArray = charArray.slice(7, 10);
  }
  return [rowArray, columnArray];
};

// Gets the row or column number from a row or column array
const getRowOrColumnNumber = (array, min, max) => {
  for (item of array) {
    if (item === "F" || item === "L") {
      max = max - Math.ceil((max - min) / 2);
    } else if (item === "B" || item === "R") {
      min = min + Math.ceil((max - min) / 2);
    } else {
      throw "Invalid boarding pass!";
    }
  }
  if (min === max) {
    return min;
  } else {
    throw "Invalid boarding pass!";
  }
};

// Gets an array of seat IDs from the array of boarding passes
const getSeatIdArray = (array) => {
  let seatIdArray = [];
  for (boardingPass of array) {
    const rowAndColumnArray = getRowAndColumnArrays(boardingPass.trim());
    let rowNumber = getRowOrColumnNumber(rowAndColumnArray[0], 0, 127);
    let columnNumber = getRowOrColumnNumber(rowAndColumnArray[1], 0, 7);
    let seatId = rowNumber * 8 + columnNumber;
    seatIdArray.push(seatId);
  }
  return seatIdArray;
};

// Gets the highest seat ID in the list - Solution to Part 1
const getMaxSeatId = (array) => {
  const seatIdArray = getSeatIdArray(array);
  return Math.max.apply(Math, seatIdArray);
};

// Gets my seat ID - Solution to Part 2
const getMySeatId = (array) => {
  const seatIdArray = getSeatIdArray(array);
  const sortedSeatIdArray = seatIdArray.sort((a, b) => a - b);
  const minSeatId = sortedSeatIdArray[0];
  let i = 0;
  let currentSeatId = minSeatId;
  while (i < sortedSeatIdArray.length + 1) {
    if (sortedSeatIdArray[i] !== currentSeatId) {
      return currentSeatId;
    }
    i++;
    currentSeatId++;
  }
};
