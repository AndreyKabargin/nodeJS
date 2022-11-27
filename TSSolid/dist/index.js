"use strict";
const { v4: uuidv4 } = require('uuid');
class BooksRepository {
    constructor(title, description, authors, favorite, fileCover, fileName) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
    createBook(book) {
    }
    getBook(id) {
    }
    getBooks() {
    }
    updateBook(id) {
    }
    deleteBook(id) { }
}
