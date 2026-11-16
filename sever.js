
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Sample book collection
let books = [
    { id: 1, title: "Wings of Fire", author: "A.P.J. Abdul Kalam" },
    { id: 2, title: "Harry Potter", author: "J.K. Rowling" },
    { id: 3, title: "The Alchemist", author: "Paulo Coelho" }
];

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Book Management API!");
});

// READ - Get all books
app.get("/books", (req, res) => {
    res.json(books);
});

// READ - Get a single book
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

// CREATE - Add a new book
app.post("/books", (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "Title and author are required"
        });
    }

    const newBook = {
        id: books.length
            ? Math.max(...books.map(b => b.id)) + 1
            : 1,
        title,
        author
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

// UPDATE - Update a book
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "Title and author are required"
        });
    }

    book.title = title;
    book.author = author;

    res.json({
        message: "Book updated successfully",
        book
    });
});

// DELETE - Remove a book
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    books = books.filter(b => b.id !== id);

    res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
