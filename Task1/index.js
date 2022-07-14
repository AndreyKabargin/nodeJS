
const yargs = require('./node_modules/yargs')
const { hideBin } = require('./node_modules/yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

if(argv.add) {
    if(argv.d) {

        let date = new Date()
        date.setDate(date.getDate() + argv.d)
        console.log(date)

    }else if(argv.month){

        let date = new Date()
        date.setMonth(date.getMonth() + argv.month)
        console.log(date)

    }
} else if(argv.sub) {

    if(argv.d) {

        let date = new Date()
        date.setDate(date.getDate() - argv.d)
        console.log(date)

    }else if(argv.month){

        let date = new Date()
        date.setMonth(date.getMonth() - argv.month)
        console.log(date)
        

    }
} else if (argv.year || argv.y) {

    let date = new Date()
    console.log(date.getFullYear())

} else if(argv.month || argv.m) {

    let date = new Date()
    console.log(date.getMonth())

} else {

    let date = new Date()
    console.log(date)

}




