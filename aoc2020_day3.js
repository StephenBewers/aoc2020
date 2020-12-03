const inputFile = "./aoc2020_day3_input.txt";
let array = [];

fetch(inputFile)
  .then(response => response.text())
  .then((data) => {
    array = data.split("\n");
  })


// Solution to Part 1. Pass in the number of steps to the right and down.
const countTrees = (right, down) => {
    let charIndex = 0;
    let treeCount = 0;

    for (i = 0; i < array.length; i += down) {
        if (array[i].charAt(charIndex) === "#") {
            treeCount++;
        }
        charIndex += right;
        if (charIndex > 30) {
            charIndex -= 31;
        }
    }
    return treeCount;
}

// Solution for Part 2. You will be prompted for further input.
// Also works as a solution to Part 1 if you check 1 route.
const checkRoutes = () => {
    const numberOfRoutes = prompt("How many routes do you want to check?");
    if (numberOfRoutes === '') {
        return "Sorry, you need to enter a valid number of routes."
    }
    const numberOfRoutesInt = parseInt(numberOfRoutes);

    let treeCountArray = [];

    for (route = 1; route < (numberOfRoutesInt + 1); route++) {
        let right = prompt(`For Route ${route}, how many steps to the right?`);
        if (right === '') {
            return "Sorry, you need to enter a valid number of steps."
        }
        let rightInt = parseInt(right);

        let down = prompt(`For Route ${route}, how many steps down?`);
        if (down === '') {
            return "Sorry, you need to enter a valid number of steps."
        }
        let downInt = parseInt(down);

        let treeCount = countTrees(rightInt, downInt);
        treeCountArray.push(treeCount);

        right = '';
        down = '';
    }

    return treeCountArray.reduce(multiplyTrees);

}

const multiplyTrees = (a, b) => {
    return a * b;
}