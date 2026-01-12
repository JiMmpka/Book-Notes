# Book Notes

A personal book tracking application where you can manage your reading list, add ratings, and keep notes on books you've read.

## 🚀 Live Demo
**[View Live Project](https://book-notes-fms4.onrender.com/)**

## Features

- **Add Books**: Search and add books by ISBN.
- **Track Reading**: Keep a log of when you read each book.
- **Rate & Review**: Add generic ratings (1-10) and detailed notes.
- **Sortable List**: Sort your library by rating or recency.
- **Book Covers**: Automatically fetches book covers from the Open Library API.
- **Responsive Design**: Clean, modern interface suitable for all devices.
- **Secure**: Implements security best practices using Helmet.js.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: EJS (Embedded JavaScript), CSS3
- **External API**: Open Library API
- **Security**: Helmet

## Prerequisites

Before running this project, ensure you have the following installed:
- Node.js
- PostgreSQL

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/JiMmpka/Book-Notes.git
   cd Book-Notes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a new PostgreSQL database.
   - Run the SQL commands in `queries.sql` to set up the necessary table and initial data.

4. **Environment Variables**
    - Create a `.env` file in the root directory.
    - Add the following variables (local dev):
       ```
       DB_USER=your_postgres_user
       DB_HOST=localhost
       DB_NAME=your_database_name
       DB_PASSWORD=your_postgres_password
       DB_PORT=5432
       PORT=3000
       ```
   - On Render set **only** the database variables from the Connections tab (DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD). **Do not set PORT** — Render provides it automatically and the app uses `process.env.PORT || 3000`.

5. **Run the Application**
   ```bash
   npm start
   ```

6. **Access the App**
   Open your browser and navigate to `http://localhost:3000`.

## Security Notes

- Helmet CSP whitelists Open Library/Archive; inline event handlers are allowed via `scriptSrcAttr 'unsafe-inline'` (needed for cover fallbacks).

## License

ISC
