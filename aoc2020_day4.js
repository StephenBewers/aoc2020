const inputFile = "./aoc2020_day4_input.txt";
let array = [];

fetch(inputFile)
  .then(response => response.text())
  .then((data) => {
    array = data.split("\n");
  })

Object.fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({[k]: v}) ));

// Parse the input data to an array of passport Objects
const parseInput = (arr) => {
    let passports = [];
    let inputArray = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i].length <= 1) {
            continue;
        }

        let next = i + 1;

        if (arr[i].includes(" ")){
            let splitArray = arr[i].split(" ");
            inputArray.push(splitArray);
        } else {
            inputArray.push(arr[i]);
        }
        if ((arr[next] !== undefined && arr[next].length <= 1) || arr[next] == undefined) {
            let currentPassportArray = inputArray.reduce((acc, val) => acc.concat(val), []);
            let currentPassport = [];
            for (a = 0; a < currentPassportArray.length; a++) {
                let splitAttributes = currentPassportArray[a].split(":");
                currentPassport.push(splitAttributes);
            }
            let passport = Object.fromEntries(currentPassport);
            passports.push(passport);
            inputArray = [];
        } 
    }
    return passports;
}

// Solution to Part 1
const countValidPassports = () => {
    const passports = parseInput(array);
    let counter = 0;
    for (item of passports) {
        if (Object.keys(item).length > 7 || (Object.keys(item).length > 6 && item.cid === undefined )) {
            counter++;
        }
    }
    return counter;
}