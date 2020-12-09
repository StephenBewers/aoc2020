const inputFile = "./aoc2020_day6_input.txt";
let array = [];

fetch(inputFile)
  .then((response) => response.text())
  .then((data) => {
    array = data.split("\n");
  });

// Parses the input file into an array of arrays - each array containing the unique questions for that group
const parseInput = (array) => {
  let allGroupsArray = [];
  let singleGroupArray = [];
  for (item of array) {
    if (item.trim().length > 0) {
      singleGroupArray.push(item);
    } else {
      let groupCharArray = [];
      for (item of singleGroupArray) {
        let charArray = [...item];
        for (item of charArray) {
          if (item.trim().length > 0) {
            groupCharArray.push(item);
          }
        }
      }
      let groupUniqueCharArray = [...new Set(groupCharArray)];
      allGroupsArray.push(groupUniqueCharArray);
      singleGroupArray = [];
    }
  }
  return allGroupsArray;
};

// Gets the sum of questions for all groups - Solution to Part 1
const getSumOfQuestions = (array) => {
  const parsedInputArray = parseInput(array);
  let sumOfQuestions = 0;
  debugger;
  for (item of parsedInputArray) {
    sumOfQuestions = sumOfQuestions + item.length;
  }
  return sumOfQuestions;
};
