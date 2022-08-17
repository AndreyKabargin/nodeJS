
let city = process.argv.slice(2)
city = city.join(` `)

if(city === ``) {
    console.log(`City is undefined`)
    return
}

const config = require(`./config`)
let url = `http://api.weatherstack.com/current?access_key=${config.myAPIKey}&query=${city}`
console.log(url)


const http = require('http')

http.get(url, (res) => {
    const {statusCode} = res
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        console.log(parseData.current.temperature)
    })
}).on('error', (err) => {
    console.error(err)
})
