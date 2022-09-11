const express = require(`express`)
const { v4: uuid} = require(`uuid`)
const os = require('os')

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "") {
        this.id = uuid(),
        this.title = title,
        this.description = description,
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName,
        this.fileBook = fileBook
    }
}

const library = {
    books: []
}

const router = express.Router()

router.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json({
        id: 1,
        mail: "test@mail.ru"
    })
})

router.get('/api/books', (req, res) => {
    const {books} = library
    res.json(books)
})

router.get('/api/books/:id', (req, res) => {
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

router.post('/api/books', upload.single('uploadFile'), (req, res) => {
   
    const {books} = library

    const {title, description, authors, favorite, fileCover, fileName} = JSON.parse(req.body.book)
    
    let fileBook = ""
    if(req.file) {
        fileBook = req.file.path
    }

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)

    books.push(newBook)

    res.status(201)
    res.json(newBook)

})

router.put('/api/books/:id', upload.single('uploadFile'), (req, res) => {

    const {books} = library

    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
    
    const {title, description, authors, favorite, fileCover, fileName} = JSON.parse(req.body.book)
    
    let fileBook = ""
    if(req.file) {
        fileBook = req.file.path
    }

    if( idx !== -1) {
        books[idx].title = title
        books[idx].description = description
        books[idx].authors = authors
        books[idx].favorite = favorite
        books[idx].fileCover = fileCover
        books[idx].fileName = fileName
        books[idx].fileBook = fileBook

        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

router.delete('/api/books/:id', (req, res) => {
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

router.get('/api/books/:id/download', (req, res) => {
    
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
    console.log(__dirname.replace('routes', '') + books[idx].fileBook)
    if( idx !== -1) {
        res.sendFile(__dirname.replace('routes', '') + books[idx].fileBook)
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

module.exports = router