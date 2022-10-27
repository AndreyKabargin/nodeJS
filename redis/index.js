const express = require('express')

const redis = require('redis')

const client = redis.createClient({ url: 'redis://localhost:3000' })

client.connect()

const app = express()

app.get('/', async (req, res) => {
    try {

        const count = await client.incr('count')

        res.json({ 'Count': count})
        
    } catch(e) {
        console.error(e);
        res.json({ 'Error': e})
    }
})

app.listen(3001)
