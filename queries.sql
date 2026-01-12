-- Create Table for Books
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    notes TEXT,
    date_read DATE DEFAULT CURRENT_DATE
);

-- Seed Data (Example books)
INSERT INTO books (title, author, isbn, rating, notes, date_read) VALUES 
('The Pragmatic Programmer', 'Andrew Hunt', '9780201616224', 10, 'Essential reading for any software developer.', '2023-05-15'),
('Clean Code', 'Robert C. Martin', '9780132350884', 9, 'Great principles for writing readable code.', '2023-06-20'),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '9780590353427', 8, 'A classic start to a magical journey.', '2022-01-10'),
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 9, 'An adventurous prelude to Lord of the Rings.', '2022-03-12'),
('1984', 'George Orwell', '9780451524935', 10, 'A chilling dystopian novel.', '2021-07-01'),
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 10, 'A powerful story about justice and morality.', '2021-11-05'),
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 7, 'A tragic story of the Jazz Age.', '2022-08-15'),
('Sapiens', 'Yuval Noah Harari', '9780062316097', 9, 'Fascinating history of humankind.', '2023-02-28'),
('Educated', 'Tara Westover', '9780399590504', 8, 'A memoir about growing up in a survivalist family.', '2023-09-10'),
('Becoming', 'Michelle Obama', '9781524763138', 9, 'Inspiring memoir from the former First Lady.', '2023-10-01');
