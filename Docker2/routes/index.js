//++
const multer = require('multer')

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
    cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
    }

})

const upload = multer({ storage: storage })

//++
const { v4: uuidv4 } = require('uuid')

//++
//const redis = require('redis')

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379' 
const redis = require('redis');

const client = redis.createClient({ url : REDIS_URL });
//const client = redis.createClient();

async function connectRedis()  {
    await client.connect()
}
connectRedis()


//++
const express = require('express')

const router = express.Router()

class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "") {
        this.id          = uuidv4(),
        this.title       = title,
        this.description = description,
        this.authors     = authors,
        this.favorite    = favorite,
        this.fileCover   = fileCover,
        this.fileName    = fileName,
        this.fileBook    = fileBook
    }
}

const library = {
    books: []
}

{
    library.books.push(new Book("Война и мир", "", "Лев Толстой", "", "", "", ""))
    library.books.push(new Book("Мастер и Маргарита", "", "Михаил Булгаков", "", "", "", ""))
    library.books.push(new Book("Преступление и наказание", "", "Федор Достаевский", "", "", "", ""))
}

router.get('/', (req, res) => {

    res.render('index', {
        title: 'Главная'
    })
    
})

router.get('/books', (req, res) => {

    const {books} = library
    res.render('library/index', {
        title: 'Библиотека',
        books: books
    })

})

router.get('/create', (req, res) => {

    res.render('library/create', {
        title: 'Добавить книгу',
        book: {}
    })
    
})

router.post('/create', upload.single('uploadFile'), (req, res) => {

    const {books} = library

    const {title, description, authors, favorite, fileCover, fileName} = req.body

    let fileBook = req.file.path

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)

    books.push(newBook)

    res.redirect('/books')

})

router.get('/update/:id', (req, res) => {

    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx !== -1){
        res.render('library/update', {
            title: 'Редактировать книгу',
            book: books[idx] 
        })
    } 

})

router.post('/update/:id', (req, res) => {

    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
    const {title, description, authors, favorite, fileCover, fileName} = req.body

    if(idx !== -1){
        books[idx].title = title
        books[idx].description = description
        books[idx].authors = authors
        books[idx].favorite = favorite
        books[idx].fileCover = fileCover
        books[idx].fileName = fileName
        res.redirect('/books')
    }

})

router.get('/view/:id', async (req, res) => {

    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx !== -1){
        //++redis
        let incr = 0
        try {
            incr = await client.incr(id)
        }
        catch(error) {
            console.log(error)
        }
        //--
        res.render('library/view', {
            title: 'Информация',
            book: books[idx],
            count: incr
        })
    } 

})

router.post('/delete/:id', (req, res) => {

    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.redirect('/books')
    } 

})

module.exports = router