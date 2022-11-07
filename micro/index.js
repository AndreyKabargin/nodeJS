const redis = require('redis')

let client = undefined

async function redisConnect() {

    try 
    {
        const REDIS_URL = process.env.REDIS_URL||'redis://localhost:6379'
        console.log(REDIS_URL)
        client = redis.createClient( {url : REDIS_URL} )
        await client.connect()
    } 
    catch (err) {
        console.log('Redis error.')
    }
}

redisConnect()

//client.on('error', (err) => {
//    client = undefined
//})



const express = require('express')

const app = express()

app.use(express.json())

app.post('/counter/:bookId/incr', async (req, res) => {

    const { bookId } = req.params

    let count = 0

    try 
    {
        count = await client.incr(bookId)
    }
    catch 
    {
        console.log('Redis client error.')
    }    

    res.json({ count: count })

})

app.get('/counter/:bookId', async (req, res) => {

    const { bookId } = req.params

    let count = 0

    try 
    {
        count = await client.get(bookId)
    }
    catch 
    {
        console.log('Redis client error.')
    }    

    res.json({ count: count })

})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running in port - ${PORT}`)
}
)
