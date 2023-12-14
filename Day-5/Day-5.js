let fs = require("fs")
const { type } = require("os")

let input = fs.readFileSync('input.txt',"utf-8")

input = input.split("\n\n")
input = input.map(line => {
    return line.split('\n')
})

let firstLine = input[0][0].split(":")
input = input.slice(1,input.length)
input.unshift(firstLine)

function seedToSoil (seeds,soils) {
    let matches = []
    let seedMap= []
    let soilMap=[]
    soils = soils.splice(1,soils.length)
    soils = soils.map(line => {
        return line.split(" ")
    })
    soils.forEach( soil => {
        console.log(soil)
        for (let range = 0 ; range < soil[2] ; range++){
            seedMap.push(parseInt(soil[1])+range)
            soilMap.push(parseInt(soil[0])+range)
        }
    })
    console.log("seedMap",seedMap,"soilMap",soilMap)
    seeds = seeds.split(" ")
    seeds.forEach(seed => {
        console.log(seed)

    })
}
seedToSoil(input[0][1],input[1])

