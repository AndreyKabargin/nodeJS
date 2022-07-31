//++ define file name
const yargs = require(`yargs`)
const { hideBin } = require(`yargs/helpers`)
const argv = yargs(hideBin(process.argv)).argv

//++ define path
let path = ``
if(argv.path) {    
    path = argv.path
} 

//++ execute prog
const fs = require(`fs`)
const readStream = fs.createReadStream(path) 
let data
readStream
.on('data', (chank) => {
    data += chank
})
.on('end', () => {
    data = data.replace(`,]}`, `]}`)
    data = data.replace(`undefined`, ``)

    obj = JSON.parse(data).result

    let commonQuantity = 0
    let quantityWin = 0
    let quantityLose = 0
    let percent = 0

    for(let el in obj) {
        if(el.random === el.result) {
            quantityWin++
        } else {
            quantityLose++
        }
        commonQuantity++
    }

    console.log(`Oбщее количество партий `, commonQuantity)
    console.log(`Количество выигранных `, quantityWin)
    console.log(`Количество проигранных партий `, quantityLose)
    console.log(`Процентное соотношение выигранных партий `, (commonQuantity === 0 ? 0 : quantityWin / commonQuantity * 100))
    //let resol = JSON.parse(data)
})
