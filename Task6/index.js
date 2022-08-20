const express = require(`express`)
const { v4: uuid} = require(`uuid`)

class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "") {
        this.id = uuid(),
        this.title = title,
        this.description = description,
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName
    }
}

const library = {
    books: []
}

const app = express()
app.use(express.json())

app.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json({
        id: 1,
        mail: "test@mail.ru"
    })
})

app.get('/api/books', (req, res) => {
    const {books} = library
    res.json(books)
})

app.get('/api/books/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.post('/api/books', (req, res) => {
    const {books} = library
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)

    books.push(newBook)

    res.status(201)
    res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
    const {title, description, authors, favorite, fileCover, fileName} = req.body

    if( idx !== -1) {
        books[idx].title = title
        books[idx].description = description
        books[idx].authors = authors
        books[idx].favorite = favorite
        books[idx].fileCover = fileCover
        books[idx].fileName = fileName

        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.json("ok")
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

})

const PORT = process.env.PORT || 3001
app.listen(PORT)
