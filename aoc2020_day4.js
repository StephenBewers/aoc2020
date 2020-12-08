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

// Part 2 validation functions

const checkByr = (byr) => {
    let byrInt = parseInt(byr, 10);
    return (byrInt > 1919 && byrInt < 2003) ? true : false;
}

const checkIyr = (iyr) => {
    let iyrInt = parseInt(iyr, 10);
    return (iyrInt > 2009 && iyrInt < 2021) ? true : false;
}

const checkEyr = (eyr) => {
    let eyrInt = parseInt(eyr, 10);
    return (eyrInt > 2019 && eyrInt < 2031) ? true : false;
}

const checkHgt = (hgt) => {
    let hgtArr = hgt.match(/[a-z]+|[^a-z]+/gi);
    if (hgtArr[1] !== undefined && hgtArr[1] === "cm") {
        let hgtInt = parseInt(hgtArr[0], 10);
        return (hgtInt > 149 && hgtInt < 194) ? true : false;
    } else if (hgtArr[1] !== undefined && hgtArr[1] === "in") {
        let hgtInt = parseInt(hgtArr[0], 10);
        return (hgtInt > 58 && hgtInt < 77) ? true : false;
    } else {
        return false;
    }
}

const checkHcl = (hcl) => {
    if (hcl.charAt(0) === "#") {
        let regex = /[0-9A-Fa-f]{6}/g;
        return (regex.test(hcl)) ? true : false;
    }
    else {
        return false;
    }
}

const checkEcl = (ecl) => {
    switch(ecl) {
        case "amb":
            return true;
        case "blu":
            return true;
        case "brn":
            return true;
        case "gry":
            return true;
        case "grn":
            return true;
        case "hzl":
            return true;
        case "oth":
            return true;
        default:
            return false;
    }
}

const checkPid = (pid) => {
    return (pid.length === 9) ? true : false;
}

// Returns the answer for both parts

const countValidPassports = () => {
    const passports = parseInput(array);
    let counter = 0;
    let checked = 0;
    for (item of passports) {
        if (Object.keys(item).length > 7 || (Object.keys(item).length > 6 && item.cid === undefined )) {
            checked ++;
            if (
                checkByr(item.byr.trim()) &&
                checkEcl(item.ecl.trim()) &&
                checkEyr(item.eyr.trim()) &&
                checkHcl(item.hcl.trim()) &&
                checkHgt(item.hgt.trim()) &&
                checkIyr(item.iyr.trim()) &&
                checkPid(item.pid.trim())
            ) {
                counter++;
            }
        }
    }
    return `There are ${checked} valid passports for the Part 1 rules.\nThere are ${counter} valid passports for the Part 2 rules.`;
}