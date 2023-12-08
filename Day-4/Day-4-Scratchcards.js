
var fs = require('node:fs/promises');

let input
async function getData() {
    data = await fs.readFile("input.txt", "utf-8",)
    input = data.split("\n")
}

async function ScratchCards() {
    await getData()
    // let input = ["Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    //     "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    //     "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    //     "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    //     "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    //     "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"]
    let winningNumbers = []
    let pickedNumbers = []
    let sum = 0
    let scratchCardsSum= 0
    console.log(input.length)
    let linesCardCount = new Array(input.length).fill(1)
    const cardsLength = input.length
    input.forEach(line => {
        [ card , line] = line.split(":")
        card = parseInt(card.replace(/\s+/g, " ").trim().split(" ")[1])
        line = line.split("|")
        winningNumbers = line[0].replace(/\s+/g, " ").trim().split(" ")
        pickedNumbers = line[1].replace(/\s+/g, " ").trim().split(" ")
        let equalNumbers = 0

        pickedNumbers.forEach(number => {
            winningNumbers.forEach(winningNumber => {
                //
                //
                if (winningNumber == number) {
                    equalNumbers++
                }
            })

        })
        if (equalNumbers == 1) {
            sum += 1
            console.log("Card",card)
           // console.log(linesCardCount,"linesCardCount")
           if (card<cardsLength+2){
            linesCardCount[card] = linesCardCount[card] + linesCardCount[card-1]
           }
            //console.log(linesCardCount,"linesCardCount")
        }
        else if (equalNumbers > 1) {
            let index = 0 
            console.log("Card",card)
            while (card+index < cardsLength && index < equalNumbers ){
                // console.log("cardNumber",index+card+1)
                // console.log(linesCardCount,"linesCardCount","before")
                // console.log("added",linesCardCount[card-1])
                linesCardCount[index+card] = linesCardCount[index+card] + linesCardCount[card-1]
               // console.log(linesCardCount,"linesCardCount","after")
                index++
            }

            //console.log(linesCardCount[card],winningNumbers)
            sum += 2 ** (equalNumbers - 1)
        }

    })
    linesCardCount.forEach(cardCount => {
        scratchCardsSum += cardCount
    })
    //console.log(sum)
    console.log(scratchCardsSum)
}
ScratchCards()