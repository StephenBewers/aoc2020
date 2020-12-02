const inputFile = "./aoc2020_day1_input.txt";
let array = [];

fetch(inputFile)
  .then(response => response.text())
  .then((data) => {
    array = data.split("\n").map(Number);
  })

const target = 2020;

// Part 1 solution
const findTwoNumbers = (arr) => {
  for (n1 = 0; n1 < arr.length; n1++) {
    for (n2 = 1; n2 < arr.length; n2++) {
      if (arr[n1] + arr[n2] === target) {
        let sum = arr[n1] * arr[n2];
        return `The two numbers in the array which add up to ${target} are: ${arr[n1]} and ${arr[n2]}. The product of these numbers and solution to this challenge is therefore: ${sum}.`;
      }
    }
  }
};

// Part 2 solution
const findThreeNumbers = (arr) => {
  for (n1 = 0; n1 < arr.length; n1++) {
    for (n2 = 1; n2 < arr.length; n2++) {
      if (arr[n1] + arr[n2] < target) {
        let partialSum = arr[n1] + arr[n2];
        for (n3 = 2; n3 < arr.length; n3++) {
          if (partialSum + arr[n3] === target) {
            let finalSum = arr[n1] * arr[n2] * arr[n3];
            return `The three numbers in the array which add up to ${target} are: ${arr[n1]}, ${arr[n2]} and ${arr[n3]}. The product of these numbers and solution to this challenge is therefore: ${finalSum}.`;
          }
        }
      }
    }
  }
};