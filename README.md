# Notes App

This is a simple Notes application built using React.js and Node.js/Express.

## Project Structure

project/
├── client/ # React frontend
└── server/ # Express backend

## Features

- Add new notes
- View all notes
- Edit notes
- Delete notes
- View full note content
- Loading and error handling

## Backend Setup

1. Open terminal
2. Go to server folder

```bash
cd server
```

3. Install dependencies

```bash
npm install
```

4. Start server

```bash
npm start
```

Backend runs at:

```bash
http://localhost:5000
```

## Frontend Setup

1. Open another terminal
2. Go to client folder

```bash
cd client
```

3. Install dependencies

```bash
npm install
```

4. Start React app

```bash
npm start
```

Frontend runs at:

```bash
http://localhost:3000
```

## API Endpoints

| Method | Route          | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/notes     | Get all notes |
| GET    | /api/notes/:id | Get one note  |
| POST   | /api/notes     | Create note   |
| PUT    | /api/notes/:id | Update note   |
| DELETE | /api/notes/:id | Delete note   |

## Assumptions / Decisions

- Notes are stored using an in-memory array.
- No database is used.
- React hooks and functional components are used.
- UI is kept simple and responsive.

## Tech Stack

Frontend:

- React.js
- CSS
- Fetch API

Backend:

- Node.js
- Express.js
- CORS
