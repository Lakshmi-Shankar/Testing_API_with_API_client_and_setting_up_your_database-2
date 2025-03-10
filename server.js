const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [];

// Create a new book
app.post('/books', (req, res) => {
    const { book_id, title, author, genre, year, copies } = req.body;
    if (!book_id || !title || !author || !genre || !year || !copies) {
        return res.status(400).json({ message: 'All book fields are required' });
    }
    const newBook = { book_id, title, author, genre, year, copies };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Retrieve all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Retrieve a specific book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.book_id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

// Update book information
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.book_id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    Object.assign(book, req.body);
    res.json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.book_id === req.params.id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
