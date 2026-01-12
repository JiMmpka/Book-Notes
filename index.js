import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import dotenv from "dotenv";
import helmet from "helmet";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security Middleware (Helmet)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://covers.openlibrary.org", "https://*.archive.org", "https://via.placeholder.com"],
      connectSrc: ["'self'", "https://covers.openlibrary.org"],
    },
  })
);

// Database configuration
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes

// GET / - Display all books with sorting
app.get("/", async (req, res) => {
  const sortBy = req.query.sort || "date_read"; // default sort by recency
  let order = "DESC";
  
  // Sort by title should be ascending (A-Z)
  if (sortBy === "title") order = "ASC";
  
  try {
    // Determine the sorting column safely
    let orderByClause;
    switch(sortBy) {
        case 'rating':
            orderByClause = 'rating';
            break;
        case 'title':
            orderByClause = 'title';
            break;
        default:
            orderByClause = 'date_read';
    }

    const result = await db.query(`SELECT * FROM books ORDER BY ${orderByClause} ${order}`);
    const books = result.rows;
    res.render("index.ejs", { books: books, sortBy: sortBy });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Database Error");
  }
});

// POST /add - Add new book
app.post("/add", async (req, res) => {
  let { title, author, isbn, rating, notes, date_read } = req.body;
  
  // Trim inputs
  title = title?.trim();
  author = author?.trim();
  isbn = isbn?.trim();
  notes = notes?.trim();

  // Basic Validation
  if (!title || !author || !date_read) {
    console.log("Missing required fields");
    return res.redirect("/"); 
  }

  if (!isbn || isbn.length !== 13 || isNaN(isbn)) {
      console.log("Invalid ISBN");
      // Could redirect with an error query param here
      return res.redirect("/?error=Invalid ISBN");
  }

  if (rating < 1 || rating > 10) {
      console.log("Invalid Rating");
      return res.redirect("/?error=Invalid Rating");
  }

  try {
    // Punkt 4: Użycie Axios do weryfikacji ISBN w Open Library API
    const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`);
    
    // Sprawdzenie czy API zwróciło dane dla tego ISBN
    if (Object.keys(response.data).length === 0) {
      console.log("ISBN not found in Open Library, but proceeding anyway...");
    }

    await db.query(
      "INSERT INTO books (title, author, isbn, rating, notes, date_read) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, isbn, rating, notes, date_read]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error adding book or API request failed:", err.message);
    // Przekierowanie z błędem (można rozbudować o komunikaty dla użytkownika)
    res.redirect("/");
  }
});

app.post("/edit", async (req, res) => {
  const { id, notes, rating } = req.body;
  
  // Validation
  if (rating < 1 || rating > 10) {
     console.error("Invalid Rating in Edit");
     return res.redirect("/");
  }

  try {
    await db.query(
      "UPDATE books SET notes = $1, rating = $2 WHERE id = $3",
      [notes, rating, id]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book", err.stack);
    res.redirect("/");
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book", err.stack);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
