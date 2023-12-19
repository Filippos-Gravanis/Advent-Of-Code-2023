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

function findMatches (items,map) {
    let matches = []
    items.forEach( item  => {
        let match 
        map.forEach(mapItem => {
            mapItem = mapItem.split(" ")
            if ( parseInt(item) >= parseInt(mapItem[1]) && parseInt(item) < parseInt( mapItem[1])+ parseInt(mapItem[2]) ){
                match =  parseInt(mapItem[0]) + (parseInt(item) - parseInt(mapItem[1]))
            }
        })
        if (match){
        matches.push(match)
        }
        else{
            matches.push(parseInt(item))
        }
        
    })
    return matches
}


function findRangeMatches (items) {
    let minLocation = findLocation(items[0][0])
    items.forEach(item => {
        for (let index = parseInt(item[0]) ; index < parseInt(item[0])+parseInt(item[1]); index++ ){
            indexNumberLocation =  findLocation(index)
            if (indexNumberLocation < minLocation){
                minLocation = indexNumberLocation
            }
        }
    })
    console.log(minLocation,"minLocation")
}



function findLocation (item ) {
   let soil = findMatches([item],input[1].slice(1,input[1].length))
   let fertilizer = findMatches(soil,input[2].slice(1,input[2].length))
   let water = findMatches(fertilizer,input[3].slice(1,input[3].length))
   let light = findMatches(water,input[4].slice(1,input[4].length))
   let  temperature = findMatches(light,input[5].slice(1,input[5].length))
   let humidity = findMatches(temperature,input[6].slice(1,input[6].length))
   let location  = findMatches(humidity,input[7].slice(1,input[7].length))
   return location
}



let rangeSeeds = []
let index = 0
let rangeInput = input[0][1].trim().split(" ")
let pairIndex = 1
let pair = []
while (index<rangeInput.length){
    
    if (pairIndex == 2){
        pair.push(rangeInput[index])
        rangeSeeds.push(pair)
        pairIndex = 0
        pair = []
    }
    else{
        pair.push(rangeInput[index])
    }
    pairIndex++
    index++
}

findRangeMatches(rangeSeeds)

// let seedList = []
// for (let listIndex = 0 ; listIndex < rangeSeeds.length; listIndex++){
//     console.log(parseInt(rangeSeeds[listIndex][0]))
//     for (let numberIndex = parseInt(rangeSeeds[listIndex][0]) ; numberIndex < parseInt(rangeSeeds[listIndex][0]) + 
//     parseInt(rangeSeeds[listIndex][1]) ;
//      numberIndex++)
//     {
//         seedList.h(numberIndex)
//     }
// }


let soils = findMatches(input[0][1].trim().split(" "),input[1].slice(1,input[1].length))
let fertilizer = findMatches(soils,input[2].slice(1,input[2].length))
let water = findMatches(fertilizer,input[3].slice(1,input[3].length))
let light = findMatches(water,input[4].slice(1,input[4].length))
let temperature = findMatches(light,input[5].slice(1,input[5].length))
let humidity = findMatches(temperature,input[6].slice(1,input[6].length))
let location = findMatches(humidity,input[7].slice(1,input[7].length))


console.log (Math.min(...location))