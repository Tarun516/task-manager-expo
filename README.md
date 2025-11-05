# 🧾 Task Manager App

A lightweight **React Native + Express.js** task management app that lets you create, filter, search, and manage tasks with smooth **optimistic UI updates** and a local JSON-based backend.

---

## 🚀 Features

✅ **Add Tasks** — Create new tasks instantly.
✅ **Mark Complete / Pending** — Toggle task status in real time.
✅ **Delete Tasks** — Remove tasks with instant UI feedback.
✅ **Search & Filter** — Search by title or filter by status.
✅ **Optimistic UI** — Tasks update instantly while backend syncs in background.
✅ **Debounced Fetching** — Prevents API spam while typing in search.
✅ **Clean Modular Code** — Custom hooks, reusable components, and separation of concerns.

---

## 🧠 Tech Stack

**Frontend (Mobile App):**

* React Native (Expo)
* TypeScript
* Custom Hook (`useTasks`)
* FlatList for rendering
* Debounced API calls

**Backend (API Server):**

* Node.js + Express
* TypeScript
* JSON-based data storage (`tasks.json`)
* CORS enabled for local mobile access

---

## 🗂️ Folder Structure

```
task-manager/
│
├── backend/
│   ├── controllers/
│   │   └── taskController.ts     # CRUD logic
│   ├── routes/
│   │   └── taskRoutes.ts         # Express routes
│   ├── storage.ts                # Read/write JSON file
│   ├── task.ts                   # Task model/interface
│   └── server.ts                  # Express app entry point
│
├── app/
│   ├── components/
│   │   └── TaskCard.tsx          # Task UI component
│   ├── hooks/
│   │   └── useTasks.ts           # Custom task hook (fetch, add, update, delete)
│   ├── index.tsx                 # Main UI screen
│   └── _layout.tsx               # Stack layout (Expo Router)
│
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server starts on:

```
http://localhost:4000
```

**Make sure to replace** the API URL in your React Native app with your machine’s local IP (e.g., `http://192.168.x.x:4000`).

---

### 2️⃣ Frontend Setup

```bash
cd app
npm install
npx expo start
```

Scan the QR code using the **Expo Go app** on your phone.

---

## 🔗 API Endpoints

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| GET    | `/tasks`     | Fetch all tasks              |
| POST   | `/tasks`     | Create a new task            |
| PATCH  | `/tasks/:id` | Toggle or update task status |
| DELETE | `/tasks/:id` | Delete a task                |

---

## 🧩 Example Task Object

```json
{
  "id": "a8d0b123-2f3c-4c29-8c92-2a9a4b6a16c9",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "Pending",
  "createdAt": "2025-11-05T12:34:56.789Z"
}
```

---

## 💡 Optimistic Updates

The app updates UI **instantly** on user actions (add, update, delete) and rolls back if the backend fails.
This provides a **fast and fluid UX** — similar to how Twitter or Notion handle local changes before server confirmation.

---

## 🧰 Future Enhancements

* ✅ Move storage to SQLite or MongoDB
* ✅ Add persistent user authentication
* ✅ Add due dates & reminders
* ✅ Add offline sync support

---

## 👨‍💻 Developer Notes

* This project is fully TypeScript typed.
* Backend uses file-based persistence (`tasks.json`) for simplicity.
* Mobile app communicates over LAN (Wi-Fi network).

---

## 🏁 Quick Start Summary

1. Start backend server (`npm run dev`).
2. Replace IP in frontend `API_URL` with your machine IP.
3. Run Expo app (`npx expo start`).
4. Add, mark, and delete tasks instantly.

