# 📋 Task Priority Manager

A full-stack MERN (MongoDB, Express, React, Node.js) application that helps users organize and prioritize tasks by urgency and due date. Built with modern web technologies and featuring a beautiful dark/light mode theme.

## ✨ Features

- ✅ **Smart Task Sorting** - Automatically sorts tasks by priority (High → Medium → Low) and due date (earliest first)
- 🌓 **Dark/Light Mode** - System preference detection with localStorage persistence
- ✏️ **CRUD Operations** - Create, Read, Update, Delete tasks with real-time updates
- ✔️ **Task Completion** - Mark tasks as complete with visual strikethrough
- 🎨 **Priority Color Coding** - Visual indicators (Red=High, Yellow=Medium, Green=Low)
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Fast & Efficient** - Vite build tool with React 19 and SWC compiler
- 🔒 **Input Validation** - Client-side and server-side validation for data integrity

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **Vite 7.3.1** - Lightning-fast build tool
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Context API** - State management

### Backend
- **Node.js** with **Express 5.2.1** - RESTful API
- **MongoDB** with **Mongoose 9.2.1** - Database and ODM
- **Vercel Serverless** - Deployment architecture

## 📁 Project Structure

```
task-priority-manager/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Context providers (Theme, Task)
│   │   ├── services/        # API client
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   └── package.json
│
└── server/                  # Backend API
    ├── api/
    │   └── index.js         # Vercel serverless entry point
    ├── src/
    │   ├── config/          # Database configuration
    │   ├── controllers/     # Request handlers
    │   ├── middleware/      # Validation middleware
    │   ├── models/          # Mongoose schemas
    │   ├── routes/          # API routes
    │   └── services/        # Business logic & sorting
    ├── vercel.json
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-priority-manager.git
   cd task-priority-manager
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Backend Environment Variables**

   Create `server/.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   CLIENT_URL=http://localhost:5173
   PORT=5000
   ```

2. **Frontend Environment Variables**

   Create `client/.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running Locally

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   # Or using Docker:
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Start Backend Server**
   ```bash
   cd server
   npm start
   # Server runs on http://localhost:5000
   ```

3. **Start Frontend Development Server**
   ```bash
   cd client
   npm run dev
   # Client runs on http://localhost:5173
   ```

4. **Open Browser**

   Navigate to http://localhost:5173

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (sorted by priority & date) |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/toggle` | Toggle task completion status |
| GET | `/api/health` | Health check endpoint |

### Request/Response Examples

**Create Task (POST /api/tasks)**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "dueDate": "2024-02-15",
  "priority": "High"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "_id": "65c123...",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "dueDate": "2024-02-15T00:00:00.000Z",
    "priority": "High",
    "isCompleted": false,
    "createdAt": "2024-02-12T10:30:00.000Z",
    "updatedAt": "2024-02-12T10:30:00.000Z"
  }
}
```

## 🧪 Testing the Sorting Logic

To verify the sorting algorithm works correctly:

1. Create tasks with different priorities:
   - **High priority, due today**
   - **High priority, due tomorrow**
   - **Medium priority, due today**
   - **Medium priority, due next week**
   - **Low priority, due today**

2. Observe the order in the task list:
   - High (earliest date) appears first
   - High (later date) appears second
   - Medium (earliest date) appears third
   - And so on...

## 📦 Deployment

### Deploy to Vercel

**Backend Deployment:**
```bash
cd server
vercel
# Add environment variables in Vercel dashboard:
# - MONGODB_URI (MongoDB Atlas connection string)
# - CLIENT_URL (frontend URL after deployment)
```

**Frontend Deployment:**
```bash
cd client
vercel
# Add environment variable:
# - VITE_API_URL (backend URL + /api)
```

**Update CORS:**
After both deployments, update the backend's `CLIENT_URL` environment variable with the frontend URL and redeploy.

### MongoDB Atlas Setup

1. Create a free cluster at https://cloud.mongodb.com
2. Create a database user
3. Whitelist all IPs (0.0.0.0/0) for Vercel
4. Copy the connection string to `MONGODB_URI`

## 🎯 Key Implementation Details

### Sorting Algorithm

The application uses MongoDB aggregation pipeline for efficient sorting:

```javascript
Task.aggregate([
  {
    $addFields: {
      priorityOrder: {
        $switch: {
          branches: [
            { case: { $eq: ['$priority', 'High'] }, then: 1 },
            { case: { $eq: ['$priority', 'Medium'] }, then: 2 },
            { case: { $eq: ['$priority', 'Low'] }, then: 3 }
          ],
          default: 2
        }
      }
    }
  },
  { $sort: { priorityOrder: 1, dueDate: 1 } },
  { $project: { priorityOrder: 0 } }
]);
```

This ensures:
- Single database query (not in-memory sorting)
- O(n log n) time complexity
- Consistent ordering across sessions

### Dark Mode Implementation

Uses React Context API with:
- System preference detection via `matchMedia`
- localStorage persistence
- CSS class toggling on `<html>` element
- Tailwind's `dark:` variant for styling

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ as part of a Full Stack Developer Assessment

## 🙏 Acknowledgments

- Assessment requirements provided the structure and goals
- Modern web development best practices
- MongoDB aggregation documentation
- Tailwind CSS for beautiful styling
