# Capstone Project: Book Notes - To-Do List

## 1. Project Initialization & Setup
- [x] Utwórz strukturę folderów: `public/`, `views/`, `views/partials/`.
- [x] Zainicjuj projekt: `npm init -y`.
- [x] Zainstaluj zależności: `npm i express ejs pg axios body-parser dotenv`.
- [x] Zainstaluj dev-dependencies: `npm i -D nodemon`.
- [x] Utwórz plik główny `index.js`.
- [x] Utwórz plik `.env` (Zabezpieczenie danych logowania do bazy).
- [x] Utwórz plik `.gitignore` (Dodaj `node_modules` i `.env`).

## 2. Database Design & Setup
- [x] Zaprojektuj schemat bazy w `queries.sql` (Tabela `books` z polami: `id`, `title`, `author`, `isbn`, `rating`, `notes`, `date_read`).
- [x] Stwórz bazę danych lokalnie w pgAdmin/Postgres.
- [x] Przygotuj testowe dane (Seed data).

## 3. Backend Implementation (CRUD)
- [x] Konfiguracja połączenia z bazą w `index.js` przy użyciu zmiennych środowiskowych.
- [x] **READ**: Endpoint `GET /` pobierający książki i renderujący widok.
- [x] **CREATE**: Endpoint `POST /add` dodający nową książkę.
- [x] **UPDATE**: Endpoint `POST /edit` aktualizujący notatkę lub ocenę.
- [x] **DELETE**: Endpoint `POST /delete` usuwający wpis.
- [x] **SORT**: Logika sortowania (po ocenie, dacie, tytule).

## 4. API Integration
- [x] Zintegruj Open Library Covers API (pobieranie okładek na podstawie ISBN).
- [x] Dodaj obsługę błędów dla zapytań API (używając Axios).

## 5. Frontend Development (UI/UX)
- [x] Stwórz partiale EJS (`header.ejs`, `footer.ejs`).
- [x] Zbuduj `index.ejs` wyświetlający listę książek (Karty książek z okładkami).
- [x] Dodaj formularze do dodawania i edycji notatek.
- [x] Stylizacja CSS (Responsywność, czcionki, layout wzorowany na sive.rs/book).

## 6. Security & Refactoring
- [x] Zabezpiecz zapytania SQL przed SQL Injection (Używaj parametrów `$1, $2`).
- [x] Sprawdź walidację danych wejściowych (np. czy ISBN jest poprawny).
- [x] Dodaj komentarze objaśniające logikę kodu.

## 7. Documentation & Git
- [ ] Utwórz `README.md` z instrukcją instalacji (`npm i`) i uruchomienia.
- [ ] Pierwszy commit i wypchnięcie projektu na GitHub.

## 8. Deployment (Render.com)
- [ ] Utwórz "External Database" (PostgreSQL) na Render.com lub Supabase.
- [ ] Skonfiguruj Web Service na Render.com.
- [ ] Dodaj zmienne środowiskowe (Environment Variables) w panelu Render.
- [ ] Wyślij projekt do sieci (Live Demo).
