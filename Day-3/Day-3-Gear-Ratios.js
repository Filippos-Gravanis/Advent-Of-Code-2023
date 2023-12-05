const { log } = require("node:console");
let fs = require("node:fs/promises");

let input;
async function getData() {
  data = await fs.readFile("input.txt", "utf-8");
  input = data.split("\n");
  input = input.map((game) => {
    return game.replaceAll(" ", "");
  });
}

async function gearRatios() {
  await getData();
  let sum = 0;
  input = [
    "467..114...",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "....**....",
    ".664.598..",
  ];

  for (let line = 0; line < input.length; line++) {
    let inputLine = input[line];
    let charIndex = 0;
    while (charIndex < inputLine.length) {
      if (
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(
          inputLine[charIndex]
        )
      ) {
        let PartNumber = false;
        let endIndex = getNumberEndIndex(input[line], charIndex);
        if (line == 0) {
          PartNumber = isPartNumber(charIndex, endIndex, [
            "",
            input[line + 1],
            inputLine,
          ]);
        } else if (line == input.length - 1) {
          PartNumber = isPartNumber(charIndex, endIndex, [
            input[line - 1],
            "",
            inputLine,
          ]);
        } else {
          PartNumber = isPartNumber(charIndex, endIndex, [
            input[line - 1],
            input[line + 1],
            inputLine,
          ]);
        }
        if (PartNumber) {
          sum += parseInt(inputLine.slice(charIndex, endIndex + 1));
        }
        charIndex = endIndex + 1;
      } else {
        charIndex++;
      }
    }
  }
  console.log(sum);
}

async function getAllSymbolsIndex() {
  await getData();
//   input = [
//     "467..114...",
//     "...*......",
//     "..35..633.",
//     "......#...",
//     "617*......",
//     ".....+.58.",
//     "..592.....",
//     "......755.",
//     "...$.*....",
//     ".664.598..",
//   ];
  let indexes = [];
  for (let line = 0; line < input.length; line++) {
    for (let charIndex = 0; charIndex < input[line].length; charIndex++) {
      if (input[line][charIndex]=="*"
      ) {
        indexes.push([line, charIndex]);
      }
    }
  }
  return indexes;
}

async function getGears() {
  await getData()
  let allSumbolsIndexes = await getAllSymbolsIndex();
  let allNumbersIndexes = await getNumbersIndex();
  let gearRatioSum = 0;
  console.log(allNumbersIndexes);
  allSumbolsIndexes.forEach((symbol) => {
    let partNumbers = [];
    allNumbersIndexes.forEach((number) => {
      if (
        number[0] == symbol[0] - 1 ||
        number[0] == symbol[0] ||
        number[0] == symbol[0] + 1
      ) {
        let found = false;
        let searchIndex = number[1][0];
        while (!found && searchIndex <= number[1][1]) {
          if (
            searchIndex == symbol[1] ||
            searchIndex == symbol[1] - 1 ||
            searchIndex == symbol[1] + 1
          ) 
          {
            found = true
            partNumbers.push(input[number[0]].slice( number[1][0] , number[1][1]+1 ))
          }
          searchIndex++
        }
        
      }
    });
    if (partNumbers.length==2){
        console.log(partNumbers)
        gearRatioSum += (partNumbers[0] * partNumbers[1])
    }
  });
  console.log(gearRatioSum)
}

getGears();

async function getNumbersIndex() {
  await getData();
//   input = [
//     "467..114...",
//     "...*......",
//     "..35..633.",
//     "......#...",
//     "617*......",
//     ".....+.58.",
//     "..592.....",
//     "......755.",
//     "....**....",
//     ".664.598..",
//   ];
  let numbersIndex = [];
  for (let line = 0; line < input.length; line++) {
    let inputLine = input[line];
    let charIndex = 0;
    while (charIndex < inputLine.length) {
      if (
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(
          inputLine[charIndex]
        )
      ) {
        let endIndex = getNumberEndIndex(input[line], charIndex);
        numbersIndex.push([line, [charIndex, endIndex]]);
        charIndex = endIndex + 1;
      } else {
        charIndex++;
      }
    }
  }
  return numbersIndex;
}

function getNumberEndIndex(line, startIndex) {
  let endIndex = startIndex + 1;
  found = false;
  while (!found && endIndex < line.length) {
    if (
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(
        line[endIndex]
      )
    ) {
      endIndex++;
    } else {
      found = true;
    }
  }
  return endIndex - 1;
}

function isPartNumber(
  startIndex,
  endIndex,
  [aboveLine, belowLine, currentLine]
) {
  let isPartNumber = false;

  if (aboveLine == "") {
    getSymbolsIndex(belowLine).forEach((symbolIndex) => {
      if (symbolIndex >= startIndex - 1 && symbolIndex <= endIndex + 1) {
        isPartNumber = true;
      }
    });

    getSymbolsIndex(currentLine).forEach((element) => {
      if (element >= startIndex - 1 && element <= endIndex + 1) {
        isPartNumber = true;
      }
    });
  } else if (belowLine == "") {
    getSymbolsIndex(aboveLine).forEach((element) => {
      if (element >= startIndex - 1 && element <= endIndex + 1) {
        isPartNumber = true;
      }
    });

    getSymbolsIndex(currentLine).forEach((element) => {
      if (element >= startIndex - 1 && element <= endIndex + 1) {
        isPartNumber = true;
      }
    });
  } else {
    getSymbolsIndex(aboveLine).forEach((element) => {
      if (element >= startIndex - 1 && element <= endIndex + 1) {
        isPartNumber = true;
      }
    });

    getSymbolsIndex(currentLine).forEach((element) => {
      if (element >= startIndex - 1 && element <= endIndex + 1) {
        isPartNumber = true;
      }
    });
    getSymbolsIndex(belowLine).forEach((element) => {
      if (element >= startIndex - 1 && element <= endIndex + 1) {
        isPartNumber = true;
      }
    });
  }
  return isPartNumber;
}

function getSymbolsIndex(line) {
  let indexes = [];
  for (let charIndex = 0; charIndex < line.length; charIndex++) {
    if (
      !["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(
        line[charIndex]
      ) &&
      line[charIndex] != "."
    ) {
      indexes.push(charIndex);
    }
  }
  return indexes;
}

gearRatios();
