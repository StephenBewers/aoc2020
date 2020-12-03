const inputFile = "./aoc2020_day3_input.txt";
let array = [];

fetch(inputFile)
  .then(response => response.text())
  .then((data) => {
    array = data.split("\n");
  })

// Part 1 solution
const countTrees = (arr) => {
    let charIndex = 0;
    let treeCount = 0;

    for (i = 0; i < arr.length; i++) {
        if (arr[i].charAt(charIndex) === "#") {
            treeCount++;
        }
        charIndex += 3;
        if (charIndex > 30) {
            charIndex -= 31;
        }
    }
    return treeCount;
}