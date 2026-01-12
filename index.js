import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://covers.openlibrary.org",
          "https://*.us.archive.org",
          "https://archive.org",
        ],
        connectSrc: ["'self'", "https://covers.openlibrary.org"],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);

// Database
const isProduction = process.env.NODE_ENV === "production";

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

db.connect().catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Helpers
const SORT_CONFIG = {
  rating: { column: "rating", order: "DESC" },
  title: { column: "title", order: "ASC" },
  date_read: { column: "date_read", order: "DESC" },
};

const sanitize = (str) => str?.trim() || "";
const isValidIsbn = (isbn) => isbn && isbn.length === 13 && !isNaN(isbn);
const isValidRating = (r) => r >= 1 && r <= 10;

// Routes
app.get("/", async (req, res) => {
  const sortBy = req.query.sort || "date_read";
  const { column, order } = SORT_CONFIG[sortBy] || SORT_CONFIG.date_read;

  try {
    const result = await db.query(`SELECT * FROM books ORDER BY ${column} ${order}`);
    res.render("index.ejs", { books: result.rows, sortBy });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).send("Database Error");
  }
});

app.post("/add", async (req, res) => {
  const title = sanitize(req.body.title);
  const author = sanitize(req.body.author);
  const isbn = sanitize(req.body.isbn);
  const notes = sanitize(req.body.notes);
  const { rating, date_read } = req.body;

  if (!title || !author || !date_read || !isValidIsbn(isbn) || !isValidRating(rating)) {
    return res.redirect("/");
  }

  try {
    await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`);
    await db.query(
      "INSERT INTO books (title, author, isbn, rating, notes, date_read) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, isbn, rating, notes, date_read]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error adding book:", err.message);
    res.redirect("/");
  }
});

app.post("/edit", async (req, res) => {
  const { id, notes, rating } = req.body;

  if (!isValidRating(rating)) {
    return res.redirect("/");
  }

  try {
    await db.query("UPDATE books SET notes = $1, rating = $2 WHERE id = $3", [notes, rating, id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.redirect("/");
  }
});

app.post("/delete", async (req, res) => {
  try {
    await db.query("DELETE FROM books WHERE id = $1", [req.body.id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
