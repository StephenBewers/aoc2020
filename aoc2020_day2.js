const inputFile = "./aoc2020_day2_input.txt";
let array = [];

fetch(inputFile)
  .then(response => response.text())
  .then((data) => {
    array = data.split("\n");
  })

// Pass in the array and either "Part 1" or "Part 2" to get the answer to the relevant part
const countValidPasswords = (arr, str) => {
    let passwords = parseInput(arr);
    let passwordValidityArray = [];
    switch (str) {
        case "Part 1":
            for (password of passwords) {
                let isPasswordValid = checkValidityPart1(password);
                passwordValidityArray.push(isPasswordValid);
            }
            break;
        case "Part 2":
            for (password of passwords) {
                let isPasswordValid = checkValidityPart2(password);
                passwordValidityArray.push(isPasswordValid);
            }
            break;
        default:
            return "Please enter a valid Part number.";
    }
    const validityCount = passwordValidityArray.filter(Boolean).length;
    return validityCount;
}


// Helper function required for both solutions
const parseInput = (arr) => {
    let passwords = [];
    for (item of arr) {
        let passwordArray = item.replace(": ", "-");
        passwordArray = passwordArray.replace(" ", "-");
        passwordArray = passwordArray.split("-");
        passwords.push(passwordArray);
    }
    return passwords;
}

// Part 1 solution
const checkValidityPart1 = (arr) => {
    let count = 0;
    for (i = 0; i < arr[3].length; i++) {
        if (arr[3].charAt(i) == arr[2]) {
            count++;
        }
    }
    return (count >= arr[0] && count <= arr[1]) ? true : false;
}

// Part 2 solution
const checkValidityPart2 = (arr) => {
    let count = 0;
    if (arr[3].charAt(arr[0]-1) == arr[2]) {
        count++;
    }
    if (arr[3].charAt(arr[1]-1) == arr[2]) {
        count++;
    }
    return (count === 1) ? true : false;
}