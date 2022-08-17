
//++ define file name
const yargs = require(`yargs`)
const { hideBin } = require(`yargs/helpers`)
const argv = yargs(hideBin(process.argv)).argv

let name = `log`
if(argv.name 
    && (typeof argv.name === `string` || typeof argv.name === `number`)) {    
        name = argv.name
} else {
    console.log(`Не задано имя файла`)
    return
}

//++ define dir
const path = require(`path`)
let dir = path.join(__filename, `..`, name.toString() + `.txt`)

//++ write file
const readline = require(`readline`)
const fs = require(`fs`)

const rl = readline.createInterface(
process.stdin, process.stdout)

const writeStream = fs.createWriteStream(dir)
writeStream.write('{"result":[', 'utf-8')

let question = rl.on('line', (input) => {
    if(input === `0` || input === `1`) {
        let random = Math.floor(Math.random() * 2)
        console.log(`Загадано ${random} Выбрано ${input}`);
        
        writeStream.write(JSON.stringify({
            random: random,
            result: Number(input)
        }), 'utf-8')

        writeStream.write(`,`)
        
        question()
    } else {
        rl.close()
        writeStream.write(']}', 'utf-8')
        writeStream.end()
    }
});

