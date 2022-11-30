const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
let jsonParser = bodyParser.json();

app.get('/api/books', function (req, res) {
    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    res.send(books);
})

app.get('/api/books/:id', function (req, res) {
    let booksId = req.params.id;
    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let book;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == booksId) {
            book = books[i];
            break;
        }
    }
    if (book) {
        res.send(book)
    } else {
        res.status(404).send()
    }
});

app.post('/api/books', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let book = {
        name: req.body.name,
        author: req.body.author,
        year: req.body.year,
        tags: req.body.tags,
        promiser: req.body.promiser,
        dateTook: req.body.dateTook,
        dateReturn: req.body.dateReturn
    };

    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let bookId = 0;
    for (let i = 0; i < books.length; i++) {
        bookId = bookId > books[i].id ? bookId : books[i].id;
    }

    book.id = isFinite(bookId) ? bookId + 1 : 0;

    books.push(book);

    fs.writeFileSync('db.json', JSON.stringify(books));
    res.send(book);
});

app.delete('/api/books/:id', function (req, res) {
    let bookId = req.params.id;
    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    let index = -1;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id == bookId) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        let book = books.splice(index, 1)[0];
        fs.writeFileSync('db.json', JSON.stringify(books));
        res.send(book);
    } else {
        res.status(404).send();
    }
});

app.put('/api/books', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let bookNew = {
        id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        year: req.body.year,
        tags: req.body.tags,
        promiser: req.body.promiser,
        dateTook: req.body.dateTook,
        dateReturn: req.body.dateReturn
    };

    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let book;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == bookNew.id) {
            book = books[i];
            break;
        }
    }

    if (book) {
        book.name = bookNew.name;
        book.author = bookNew.author;
        book.year = bookNew.year;
        book.tags = bookNew.tags;
        book.promiser = bookNew.promiser;
        book.dateTook = bookNew.dateTook;
        book.dateReturn = bookNew.dateReturn;

        fs.writeFileSync('db.json', JSON.stringify(books));
        res.send(book);
    }
    else {
        res.status(404).send(book);
    }
});


app.listen(3000);