var fs = require('node:fs/promises');

let wordList
async function getData() {
    data = await fs.readFile("input.txt", "utf-8",)
    wordList = data.split("\n")
}

function findLetterNumber (word,index,position) {
    let numbers = ["one","two","three","four","five","six","seven","eight","nine"]
    let foundNumber
    if (position=="first") {
    numbers.forEach((number)=>{
        let testWord = word.slice(index,index+number.length)
        if (testWord == number){
            foundNumber = number

        }
    })}
    else{
        numbers.forEach((number)=>{
            let testWord = word.slice(index-number.length+1,index+1)
            if (testWord == number){
                foundNumber = number
    
            }
        })
    }
    return foundNumber
}


function findDigit(word, position) {
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let letterNumbers = {"one":"1","two":"2","three":"3","four":"4","five":"5","six":"6","seven":"7","eight":"8","nine":"9"}
    if (position == "first") {
        index = 0
        while (index < word.length) {
            if (word[index] in numbers) {
                return word[index]
            }
            else if (['o','t','f','s','e','n'].includes(word[index])){
               let letterFoundNumber = findLetterNumber(word,index,"first")
               if (letterFoundNumber) return letterNumbers[letterFoundNumber]
            }
            index++
        }
    }
    else {
        index = word.length
        while (index >= 0) {
            if (word[index] in numbers) {
                return word[index]
            }
            else if (["o","t","e","n","r","x"].includes(word[index])){
                let foundNumber =findLetterNumber(word,index,"last")

                if (foundNumber) return letterNumbers[foundNumber]
            }
            index--
        }
    }
    return 0

}


async function Trebuchet() {
    await getData()
    let sum = 0
        
    for (let index = 0; index < wordList.length; index++) {
        sum += parseInt(findDigit(wordList[index], "first") + findDigit(wordList[index], "last"))
    }
    console.log(sum)
}

Trebuchet()