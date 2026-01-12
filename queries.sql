CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    notes TEXT,
    date_read DATE DEFAULT CURRENT_DATE
);

INSERT INTO books (title, author, isbn, rating, notes, date_read) VALUES 
('The Lord of the Rings', 'J.R.R. Tolkien', '9780544003415', 10, 'Epic fantasy masterpiece.', '2022-04-10'),
('Pride and Prejudice', 'Jane Austen', '9780141439518', 9, 'Classic romance novel.', '2021-05-20'),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769480', 8, 'A story of teenage angst.', '2021-09-15'),
('Atomic Habits', 'James Clear', '9780735211292', 10, 'Life-changing book on habit formation.', '2023-01-05'),
('Dune', 'Frank Herbert', '9780441013593', 9, 'The best sci-fi novel ever written.', '2022-11-20'),
('Brave New World', 'Aldous Huxley', '9780060850524', 8, 'A disturbing vision of the future.', '2021-08-30'),
('The Alchemist', 'Paulo Coelho', '9780062315007', 7, 'A philosophical journey.', '2022-02-15'),
