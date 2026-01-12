# Book Notes

A personal book tracking application where you can manage your reading list, add ratings, and keep notes on books you've read.

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

## Prerequisities

Before running this project, ensure you have the following installed:
- Node.js
- PostgreSQL

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-notes
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
   - Add the following variables:
     ```
     DB_USER=your_postgres_user
     DB_HOST=localhost
     DB_NAME=your_database_name
     DB_PASSWORD=your_postgres_password
     DB_PORT=5432
     ```

5. **Run the Application**
   ```bash
   node index.js
   ```

6. **Access the App**
   Open your browser and navigate to `http://localhost:3000`.

## Security Notes

This application uses Content Security Policy (CSP) via Helmet to ensure secure loading of resources.

## License

ISC
