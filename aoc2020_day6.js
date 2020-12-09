const inputFile = "./aoc2020_day6_input.txt";
let array = [];

fetch(inputFile)
  .then((response) => response.text())
  .then((data) => {
    array = data.split("\n");
  });

// Gets the sum of questions anyone answered yes to for all groups - Solution to Part 1
const getSumOfQuestionsForAnyone = (array) => {
  let allGroupsArray = [];
  let singleGroupArray = [];
  for (item of array) {
    if (item.trim().length > 0) {
      singleGroupArray.push(item);
    } else {
      let groupQuestionArray = [];
      for (person of singleGroupArray) {
        let personQuestionArray = [...person];
        for (question of personQuestionArray) {
          if (question.trim().length > 0) {
            groupQuestionArray.push(question);
          }
        }
      }
      let groupUniqueQuestionSet = [...new Set(groupQuestionArray)];
      allGroupsArray.push(groupUniqueQuestionSet);
      singleGroupArray = [];
    }
  }
  return getSumOfQuestions(allGroupsArray);
};

// Gets the sum of questions everyone answered yes to for all groups - Solution to Part 2
const getSumOfQuestionsForEveryone = (array) => {
  let allGroupsArray = [];
  let singleGroupArray = [];
  let groupSize = 0;
  for (item of array) {
    if (item.trim().length > 0) {
      singleGroupArray.push(item);
      groupSize++;
    } else {
      let groupQuestionArray = [];
      for (person of singleGroupArray) {
        let personQuestionArray = [...person];
        for (question of personQuestionArray) {
          if (question.trim().length > 0) {
            groupQuestionArray.push(question);
          }
        }
      }
      let wholeGroupQuestionsArray = [];
      for (question of groupQuestionArray) {
        if (
          countOccurrences(groupQuestionArray, question) === groupSize &&
          !wholeGroupQuestionsArray.includes(question)
        ) {
          wholeGroupQuestionsArray.push(question);
        }
      }
      allGroupsArray.push(wholeGroupQuestionsArray);
      singleGroupArray = [];
      groupSize = 0;
    }
  }
  return getSumOfQuestions(allGroupsArray);
};

// Gets the sum of questions within an array
const getSumOfQuestions = (array) => {
  let sumOfQuestions = 0;
  for (item of array) {
    sumOfQuestions = sumOfQuestions + item.length;
  }
  return sumOfQuestions;
};

// Counts the occurrences of an item within an array
const countOccurrences = (array, value) =>
  array.reduce((a, v) => (v === value ? a + 1 : a), 0);
