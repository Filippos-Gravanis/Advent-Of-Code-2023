let fs = require("fs")

let input = fs.readFileSync('input.txt', "utf-8")
input = input.split("\n")
input =input.map(inputItem => {
    inputItem =  inputItem.replace(/\s+/g, ' ');
    inputItem = inputItem.split(" ")
    console.log(inputItem)
    return inputItem
    
})
let index = 1
let roundsWinsSum = []  
while (index<input[0].length){
    let buttonPressDuration = 1
    let remainingTime = parseInt(input[0][index])
    let roundWinsSum = 0
    while (buttonPressDuration < remainingTime) {
        if (buttonPressDuration * (remainingTime - buttonPressDuration)  > input[1][index] ){
            roundWinsSum++
            
        }
            
        buttonPressDuration++
    }
    roundsWinsSum.push(roundWinsSum)
    index++
}

let RoundsSum = 1 
roundsWinsSum.forEach(sum =>{
    RoundsSum *= sum
})
console.log(RoundsSum);
