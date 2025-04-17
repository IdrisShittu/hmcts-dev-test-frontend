# 📝 Task Management Frontend

A **React + TypeScript** based frontend application for managing tasks — allowing users to create, view, update, and delete tasks through a clean and user-friendly interface.

---

## ✨ Features

- **Create Tasks** – Add tasks with a title, description, status, and due date.
- **View Tasks** – Display a list of tasks with detailed information.
- **Update Tasks** – Change task status from the task list or task detail view.
- **Delete Tasks** – Remove tasks from the task list.
- **User-Friendly Interface** – Includes a loading spinner and toast notifications for feedback.

---

## 🛠 Setup Instructions

### Prerequisites
- Ensure you have the following installed:
  - [Node.js](https://nodejs.org/) (v14 or later)
  - [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)


### 1. Clone the repository

```bash
git clone https://github.com/IdrisShittu/hmcts-dev-test-frontend.git
cd hmcts-dev-test-frontend/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will run on [http://localhost:3000](http://localhost:3000) by default.

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components (TaskList, TaskForm, TaskDetails, Toast)
├── models/           # TypeScript interfaces for task structure
├── services/         # API calls and business logic (taskService)
├── App.tsx           # Main application component
├── styles.css        # Global styles
```

---

## 🌐 API Endpoints

| Method | Endpoint                     | Description                  |
|--------|------------------------------|------------------------------|
| GET    | `/tasks`                     | Fetch all tasks              |
| GET    | `/tasks/{id}`                | Fetch task by ID             |
| POST   | `/tasks`                     | Create a new task            |
| PATCH  | `/tasks/{id}/status`         | Update task status           |
| DELETE | `/tasks/{id}`                | Delete a task                |

---

## 📖 How to Use

1. **Create a Task:**  
   Click the **"Create Task"** button and fill in the form.

2. **View Tasks:**  
   See all tasks listed with key details. Click a card to view more info.

3. **Update Status:**  
   Change the status of a task via dropdown in the list or detail view.

4. **Delete Task:**  
   Use the **"Delete"** button on any task card to remove it.

---

## 🎨 Styling

The app uses custom CSS for layout and styling, without external libraries. 
```
src/styles.css
```


---

## 🔗 Task Management Backend

- [Task Management Backend (Spring Boot)](https://github.com/IdrisShittu/hmcts-dev-test-backend.git)
