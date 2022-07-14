var readline = require('readline')
var rl = readline.createInterface(
process.stdin, process.stdout)

let random = Math.floor(Math.random() * 100)

let max = random + 10
let min = random - 10

console.log(`Загадано число в диапазоне от 0 до 100 ${random}`)

let question = rl.on('line', (input) => {
    if(input > random) {
        console.log(`Меньше`)
        question
    } else if(input < random) {
        console.log(`Больше`)
        question 
    } else {
    console.log(`Отгадано число ${random}`)
    rl.close()
    }
});


