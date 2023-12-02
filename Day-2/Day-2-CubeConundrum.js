let fs = require("node:fs/promises")

let gamesList
async function getData() {
    data = await fs.readFile("input.txt", "utf-8",)
    gamesList = data.split("\n")
    gamesList = gamesList.map((game) => {
        return game.replaceAll(" ", '')
    })

}

function isGameValid(game, balls, mode) {
    game = game.split(":")
    game = game[1]
    game = game.split(";")
    let maxRed = 0
    let maxBlue = 0

    let maxGreen = 0
    game.forEach(subGame => {
        const subGameRed = parseInt(getBallsNumber("red", subGame))
        const subGameBlue = parseInt(getBallsNumber("blue", subGame))
        const subGameGreen = parseInt(getBallsNumber("green", subGame))
        if (subGameRed > maxRed) {
            maxRed = subGameRed
        }
        if (subGameBlue > maxBlue) {
            maxBlue = subGameBlue
        }
        if (subGameGreen > maxGreen) {
            maxGreen = subGameGreen
        }

    });
    if (mode == "valid"){
        if (maxRed > balls.red || maxBlue > balls.blue || maxGreen > balls.green) {
            return false
        }
        else return true
    }
    else{
        return maxBlue * maxRed * maxGreen
    }
}



function getBallsNumber(color, Game) {
    let number = ""
    let found = false
    wordStart = Game.indexOf(color) - 1
    if (wordStart != -1) {
        while (!found) {
            if (Game[wordStart] == "" || Game[wordStart] == "," || wordStart < 0) {
                found = true
                return number
            }
            else {
                number = Game[wordStart] + number
            }
            wordStart--
        }
    }
    return 0

}


async function cubeConundrum() {
    await getData()
    let sum = 0
    const balls = {
        "red": 12,
        "green": 13,
        "blue": 14,

    }
    let mode = "min"
    for (let gameIndex = 0; gameIndex < gamesList.length; gameIndex++) {
        if (mode == "valid"){
        if (isGameValid(gamesList[gameIndex], balls,mode)) {
            sum += gameIndex + 1
        }
    }
    else{
        sum += isGameValid(gamesList[gameIndex], balls,mode)
    }
    }
    console.log(sum)
}

cubeConundrum()



function findMinBalls(game) {
    game = game.split(":")
    game = game[1]
    game = game.split(";")
    let minRed = parseInt(getBallsNumber("red", game[0]))
    let minBlue = parseInt(getBallsNumber("blue", game[0]))
    let minGreen = parseInt(getBallsNumber("green", game[0]))
    game.forEach(subGame => {
        const subGameRed = parseInt(getBallsNumber("red", subGame))
        const subGameBlue = parseInt(getBallsNumber("blue", subGame))
        const subGameGreen = parseInt(getBallsNumber("green", subGame))
        if (subGameRed < minRed) {
            minRed = subGameRed
        }
        if (subGameBlue < minBlue) {
            minBlue = subGameBlue
        }
        if (subGameGreen < minGreen) {
            minGreen = subGameGreen
        }

    });
}