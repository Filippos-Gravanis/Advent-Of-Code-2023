let fs = require("fs")
const { type } = require("os")
const { parse } = require("path/posix")

let input = fs.readFileSync('input.txt', "utf-8")

input = input.split("\n\n")
input = input.map(line => {
    return line.split('\n')
})

let firstLine = input[0][0].split(":")
input = input.slice(1, input.length)
input.unshift(firstLine)

function findMatches(items, map) {
    let matches = []
    items.forEach(item => {
        let match
        map.forEach(mapItem => {
            mapItem = mapItem.split(" ")
            if (parseInt(item) >= parseInt(mapItem[1]) && parseInt(item) < parseInt(mapItem[1]) + parseInt(mapItem[2])) {
                match = parseInt(mapItem[0]) + (parseInt(item) - parseInt(mapItem[1]))
            }
        })
        if (match) {
            matches.push(match)
        }
        else {
            matches.push(parseInt(item))
        }

    })
    return matches
}


function findRangeMatches(items) {
    let minLocation = findLocation(items[0][0])
    items.forEach(item => {
        for (let index = parseInt(item[0]); index < parseInt(item[0]) + parseInt(item[1]); index++) {
            indexNumberLocation = findLocation(index)
            if (indexNumberLocation < minLocation) {
                minLocation = indexNumberLocation
            }
        }
    })
    console.log(minLocation, "minLocation")
}



function findLocation(item) {
    let soil = findMatches([item], input[1].slice(1, input[1].length))
    let fertilizer = findMatches(soil, input[2].slice(1, input[2].length))
    let water = findMatches(fertilizer, input[3].slice(1, input[3].length))
    let light = findMatches(water, input[4].slice(1, input[4].length))
    let temperature = findMatches(light, input[5].slice(1, input[5].length))
    let humidity = findMatches(temperature, input[6].slice(1, input[6].length))
    let location = findMatches(humidity, input[7].slice(1, input[7].length))
    return location
}



let rangeSeeds = []
let index = 0
let rangeInput = input[0][1].trim().split(" ")
let pairIndex = 1
let pair = []
while (index < rangeInput.length) {

    if (pairIndex == 2) {
        pair.push(rangeInput[index])
        rangeSeeds.push(pair)
        pairIndex = 0
        pair = []
    }
    else {
        pair.push(rangeInput[index])
    }
    pairIndex++
    index++
}
console.log(rangeSeeds)

function findMinLocationRanges(seedRangesArray) {
    let soil = findRangesMatches(seedRangesArray, input[1].splice(1, input[1].length))
    let fertilizer = findRangesMatches(soil, input[2].splice(1, input[2].length))
    console.log(fertilizer,"fert")
     let water = findRangesMatches(fertilizer, input[3].splice(1, input[3].length))
     console.log(water,"water")
     let light = findRangesMatches(water, input[4].splice(1, input[4].length))    
     console.log(light,"lightt")
     let temperature = findRangesMatches(light, input[5].splice(1, input[5].length)) 
    let humidity =  findRangesMatches(temperature, input[6].splice(1, input[6].length))
     let location = findRangesMatches(humidity, input[7].splice(1, input[7].length))
    console.log(location)
    let min = location[0][0]
    location.forEach(l => {
        if (l[0] < min){
            min = l[0]
        }
    })
    console.log(min)
}

function findRangesMatches(inputMap, searchMap) {
    let matches = []
    inputMap.forEach(inputItem => {
        mapsChecked = 0
        while (inputItem.length != 0 && mapsChecked < searchMap.length) {
            console.log(inputItem)
            searchMap.forEach(searchItem => {
                searchItem = searchItem.split(" ")
                let inputStart = inputItem[0]
                let inputLength = inputItem[1]
                let searchStart = searchItem[1]
                let searchLength = searchItem[2]
                if (inputItem[2]){
                    inputItem.shift()
                    inputItem.shift()
                }
                if (parseInt(inputStart) >= parseInt(searchStart)
                    && parseInt(inputStart) <= parseInt(searchStart) + parseInt(searchLength)) {
                    

                    if (parseInt(inputStart) + parseInt(inputLength)
                        <= parseInt(searchStart) + parseInt(searchLength)) {

                        let matchedRangeDifference = parseInt(inputStart) - parseInt(searchStart)
                        let destinationStart = parseInt(searchItem[0])
                        matches.push([destinationStart + matchedRangeDifference, parseInt(inputLength)])
                        inputItem = []
                    }
                    else {
                        let destinationStart = parseInt(searchItem[0])
                        let matchedRangeDifference = parseInt(inputStart) - parseInt(searchStart)
                        matches.push([destinationStart + matchedRangeDifference,parseInt(inputStart) - parseInt(searchStart)])
                        inputItem = [parseInt(searchStart)+parseInt(searchLength),parseInt(inputStart)+parseInt(inputLength)
                        -(parseInt(searchStart)+parseInt(searchLength))]
                        console.log(parseInt(searchStart)+parseInt(searchLength),parseInt(inputStart)+parseInt(inputLength))
                    }
                }
                else if (parseInt(inputStart) < parseInt(searchStart)) {
                    if
                        (
                        parseInt(inputStart) + parseInt(inputLength)
                        >= parseInt(searchStart) && parseInt(inputStart) + parseInt(inputLength)
                        <= parseInt(searchStart) + parseInt(searchLength)) {
                            let destinationStart = parseInt(searchItem[0])
                            matches.push([destinationStart,parseInt(inputStart)+parseInt(inputLength)-parseInt(searchStart)])
                            inputItem = [inputStart,parseInt(searchStart)-parseInt(inputStart)]
                            console.log(destinationStart,destinationStart+parseInt(searchLength))
                            console.log( parseInt(inputStart) ,parseInt(inputLength),parseInt(searchStart))
                            }
                    else if
                        (
                        parseInt(inputStart) + parseInt(inputLength)
                        >= parseInt(searchStart) + parseInt(searchLength)) { 
                            let destinationStart = parseInt(searchItem[0])
                            matches.push([destinationStart,searchLength])
                            inputItem = [[inputStart,parseInt(searchStart)-parseInt(inputStart)],[
                            parseInt(inputStart)+parseInt(inputLength)
                        -(parseInt(searchStart)+parseInt(searchLength))]]
                            console.log(1)
                         }
                }
                mapsChecked++
            })
        }
        if (inputItem.length !=0) {
            matches.push(inputItem)
            console.log(inputItem, "leftovers")
        }
    })
    return matches
}

findMinLocationRanges(rangeSeeds)
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


let soils = findMatches(input[0][1].trim().split(" "), input[1].slice(1, input[1].length))
let fertilizer = findMatches(soils, input[2].slice(1, input[2].length))
let water = findMatches(fertilizer, input[3].slice(1, input[3].length))
let light = findMatches(water, input[4].slice(1, input[4].length))
let temperature = findMatches(light, input[5].slice(1, input[5].length))
let humidity = findMatches(temperature, input[6].slice(1, input[6].length))
let location = findMatches(humidity, input[7].slice(1, input[7].length))


//console.log(Math.min(...location))
