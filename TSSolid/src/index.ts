const { v4: uuidv4 } = require('uuid');

interface Book {

    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;

}

class BooksRepository implements Book{

    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;

    constructor(title: string, description: string, authors: string, favorite: string, fileCover: string, fileName: string) {

        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;

    }

    createBook(book: Book) {
        
    }

    getBook(id: string) { 

    }

    getBooks() { 

    }

    updateBook(id: string) { 

    }

    deleteBook(id: string) { }
}

