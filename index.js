const { connected } = require('process');

const fs = require('fs');
const path = require('path');
const os = require('os');

const pathName = path.join(__dirname, '/books/');

fs.mkdir(pathName, { recursive: true }, (error) => {
    if(error) {
        console.log('failed to make dir')
    }
    else {
        console.log(`successfully created the dir: ${pathName}`);
    }
});


fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err)
    }

    // the data is split into a new array called clippings
    const clippings = data.split('==========');

    // declare an empty array that will hold the books & highlights
    let books = [];

    // searchBooks searches in 'books' array & returns index of book if it exists
    function searchBooks(books, title) {
        for(let i = 0; i < books.length; i++) {
            if (books[i].title === title) {
                bookIndex = i;
                return;
            }
        }

        bookIndex = -1;
        return bookIndex;

    }

    for(let i = 0; i < clippings.length; i++) {

        // split each clipping in clippings into component parts whenever there's a new line
        let clipping = clippings[i].split('\r\n');
        clipping = clipping.filter(e => e.length);

        // extract and assign title (and author) to title
        // TODO: separate title and author
        let title = clipping[0];


        // extract and assign the highlight
        let highlight = clipping[2];

        /* TODO: get other meta details, eg location of highlight and date
           - these are in clipping[1], need to extract the relevant parts
        */

        // when called this function creates a new book Object using the details above
       function createBook (title, highlight) {
        let book = {
            title: title,
            highlights: [highlight]
        }
        return book;
       }

        if (!books.length) {
            //if books is empty, call createBooks and push the created Object to books
            let book = createBook(title, highlight);
            books.push(book);
        }
        else {
            //if array is not empty then we must search if a book exists and find its index
            searchBooks(books, title);

            if (bookIndex >= 0) {
                //if the book exists then we only need to push the highlight to the highlights array
                books[bookIndex].highlights.push(highlight);
            }
            else {
                //if book does not exist then create it
                let book = createBook(title, highlight);
                books.push(book);
            }
        }


        
    }

    let numberOfBooks = books.length;

    console.log(`there are ${numberOfBooks} books in your list`);

    books.forEach((book) => {
        txtFilePath = pathName + book.title + '.txt';
        for (let i = 0; i < book.highlights.length; i++) {
            fs.appendFile(txtFilePath, book.highlights[i] + "\n\n", (error) => {
                if (error) {
                    console.log(error);
                }
            });
        }
    });
    

});
