const express = require('express')

const Book = require('../models/book')

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

const { v4: uuidv4 } = require('uuid')

const router = express.Router()

router.get('/', (req, res) => {

    res.render('index', {
        title: 'Главная'
    })
    
})

router.get('/books', async (req, res) => {

    try {
        const books = await Book.find().select('-__v')
        res.render('library/index', {
            title: 'Библиотека',
            books: books
        })

    } catch (err) {
        res.status(500).json(err)
    }

})

router.get('/create', (req, res) => {

    res.render('library/create', {
        title: 'Добавить книгу',
        book: {}
    })
    
})

router.post('/create', upload.single('uploadFile'), async (req, res) => {

    const {title, description, authors, favorite, fileCover, fileName} = req.body

    //let fileBook = req.file.path
    id = uuidv4()

    const newBook = new Book({
        id,
        title, 
        description, 
        authors, 
        favorite, 
        fileCover, 
        fileName
    })

    try {

        await newBook.save()
        res.redirect('/books')

    } catch(err) {
        res.status(500).json(err)
    }

})

router.get('/update/:id', async (req, res) => {

    const { id } = req.params

    try {

        const book = await Book.find({ id: id })
        res.render('library/update', {
            title: 'Редактировать книгу',
            book: book[0]
        })

    } catch (err) {
        res.status(500).json(err)
    }

})

router.post('/update/:id', async (req, res) => {

    const { id } = req.params

    const { title, description, authors, favorite, fileCover, fileName } = req.body

    try {
        
        //const book = await Book.find({ id: id })
        await Book.updateOne({ id: id }, {
            title: title, description:description, authors:authors, favorite:favorite, 
        fileCover:fileCover, fileName:fileName })

        res.redirect('/books')

    } catch (err) {
        res.status(500).json(err)
    }

})

router.get('/view/:id', async (req, res) => {

    const { id } = req.params

    try {

        const book = await Book.find({id:id})

        res.render('library/view', {
            title: 'Информация',
            book: book[0]
        })

    } catch (err) {
        res.status(500).json(err)
    }

})

router.post('/delete/:id', async (req, res) => {

    const { id } = req.params

    try {

        await Book.deleteOne({ id: id })
        res.redirect('/books')

    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router