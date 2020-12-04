const inputFile = "./aoc2020_day1_input.txt";
let array = [];

fetch(inputFile)
  .then(response => response.text())
  .then((data) => {
    array = data.split("\n").map(Number);
  })

const target = 2020;

// Part 1 solution
const findTwoNumbers = () => {
  for (n1 = 0; n1 < array.length; n1++) {
    for (n2 = 1; n2 < array.length; n2++) {
      if (array[n1] + array[n2] === target) {
        let sum = array[n1] * array[n2];
        return `The two numbers in the array which add up to ${target} are: ${array[n1]} and ${array[n2]}. The product of these numbers and solution to this challenge is therefore: ${sum}.`;
      }
    }
  }
};

// Part 2 solution
const findThreeNumbers = () => {
  for (n1 = 0; n1 < array.length; n1++) {
    for (n2 = 1; n2 < array.length; n2++) {
      if (array[n1] + array[n2] < target) {
        let partialSum = array[n1] + array[n2];
        for (n3 = 2; n3 < array.length; n3++) {
          if (partialSum + array[n3] === target) {
            let finalSum = array[n1] * array[n2] * array[n3];
            return `The three numbers in the array which add up to ${target} are: ${array[n1]}, ${array[n2]} and ${array[n3]}. The product of these numbers and solution to this challenge is therefore: ${finalSum}.`;
          }
        }
      }
    }
  }
};