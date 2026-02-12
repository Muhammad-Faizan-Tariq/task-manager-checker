# 📋 Task Priority Manager

A modern, full-stack MERN (MongoDB, Express, React, Node.js) application that helps users organize and prioritize tasks with an engaging, interactive experience. Built with cutting-edge web technologies featuring beautiful animations, sound effects, and real-time contextual information.

## ✨ Features

### Core Functionality
- ✅ **Smart Task Sorting** - Automatically sorts tasks by priority (High → Medium → Low) and due date (earliest first)
- ✏️ **CRUD Operations** - Create, Read, Update, Delete tasks with real-time updates
- ✔️ **Task Completion** - Mark tasks as complete with visual strikethrough and confetti celebration
- 🎨 **Priority Color Coding** - Visual indicators (Red=High, Yellow=Medium, Green=Low)

### User Experience
- 🎊 **Confetti Celebrations** - Animated confetti when adding or completing tasks
- 🔊 **Sound Effects** - Audio feedback for task creation and completion
- 🌅 **Dynamic Greetings** - Time-based greetings (Good Morning/Afternoon/Evening)
- 🌍 **Location & Weather** - Shows your city, current time, date, and temperature
- ✨ **Splash Screen** - Animated welcome screen on app load
- 🎯 **Modal Dialogs** - Clean modal interfaces for adding tasks and confirmations
- 📱 **Mobile-First Design** - Optimized touch targets and responsive layouts
- ⚡ **Smooth Animations** - Framer Motion powered transitions

### Technical Excellence
- 🚀 **API Documentation** - Interactive Swagger/OpenAPI documentation
- 📊 **Comprehensive Logging** - Winston + Morgan for request/response tracking
- 🔒 **Input Validation** - Client-side and server-side validation
- ⚡ **Fast Performance** - Vite build tool with React 19 and SWC compiler
- 🌐 **CORS-Friendly** - Proper IP geolocation without backend dependencies

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **Vite 7.3.1** - Lightning-fast build tool
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Framer Motion 12.34.0** - Smooth animations and transitions
- **Lucide React 0.563.0** - Beautiful, consistent icons
- **use-sound 5.0.0** - React hook for playing sound effects
- **canvas-confetti 1.9.4** - Celebration animations
- **Context API** - State management

### Backend
- **Node.js** with **Express 5.2.1** - RESTful API
- **MongoDB** with **Mongoose 9.2.1** - Database and ODM
- **Winston 3.11.0** - Application logging
- **Morgan 1.10.0** - HTTP request logging
- **Swagger JSDoc 6.2.8** - API documentation
- **Vercel Serverless** - Deployment architecture

### External APIs
- **ip-api.com** - IP-based geolocation (free, CORS-enabled)
- **Open-Meteo** - Weather data (free, no API key required)

## 📁 Project Structure

```
task-manager-checker/
├── client/                  # Frontend React application
│   ├── public/
│   │   └── sounds/         # Audio files for effects
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── Greeting.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── LocationWeatherInfo.jsx
│   │   │   ├── SplashScreen.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskFormModal.jsx
│   │   │   └── TaskList.jsx
│   │   ├── context/        # State management
│   │   │   ├── LocationWeatherContext.jsx
│   │   │   └── TaskContext.jsx
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── useCurrentTime.js
│   │   ├── services/       # API clients
│   │   │   ├── api.js
│   │   │   └── locationWeatherApi.js
│   │   ├── utils/          # Utility functions
│   │   │   └── confetti.js
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   └── package.json
│
└── server/                 # Backend API
    ├── api/
    │   └── index.js        # Vercel serverless entry point
    ├── src/
    │   ├── config/         # Configuration
    │   │   ├── database.js
    │   │   ├── logger.js
    │   │   ├── swagger.js
    │   │   └── validateEnv.js
    │   ├── controllers/    # Request handlers
    │   │   └── taskController.js
    │   ├── middleware/     # Custom middleware
    │   │   ├── errorHandler.js
    │   │   ├── httpLogger.js
    │   │   └── validateTask.js
    │   ├── models/         # Mongoose schemas
    │   │   └── Task.js
    │   ├── routes/         # API routes
    │   │   └── taskRoutes.js
    │   └── services/       # Business logic
    │       └── sortTasks.js
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
   git clone https://github.com/yourusername/task-manager-checker.git
   cd task-manager-checker
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
   NODE_ENV=development
   LOG_LEVEL=info
   ```

2. **Frontend Environment Variables**

   Create `client/.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Add Sound Files**

   Place sound effect files in `client/public/sounds/`:
   - `task-added.mp3` - Played when adding a task
   - `task-complete.mp3` - Played when completing a task

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
   npm run dev
   # Server runs on http://localhost:5000
   # Swagger docs at http://localhost:5000/api-docs
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

### Task Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (sorted by priority & date) |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/toggle` | Toggle task completion status |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check endpoint |
| GET | `/api-docs` | Interactive Swagger documentation |
| GET | `/api-docs.json` | OpenAPI specification (JSON) |

### Request/Response Examples

**Create Task (POST /api/tasks)**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "dueDate": "2026-02-15",
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
    "dueDate": "2026-02-15T00:00:00.000Z",
    "priority": "High",
    "isCompleted": false,
    "createdAt": "2026-02-12T10:30:00.000Z",
    "updatedAt": "2026-02-12T10:30:00.000Z"
  }
}
```

## 🎨 Features in Detail

### Dynamic Greeting Card
- Time-based greetings with animated icons
- Displays current location (city, region)
- Shows full date (e.g., "Wednesday, February 12, 2026")
- Auto-updating time (updates every minute)
- Real-time temperature in Celsius
- Beautiful gradient background

### Sound Effects & Animations
- **Task Creation**: Sound + blue/green confetti from top-center
- **Task Completion**: Sound + rainbow confetti from checkbox position
- Graceful fallback if sound files are missing
- Smooth Framer Motion animations for all interactions

### Modal Dialogs
- **Add Task Modal**: Clean, centered form with backdrop
- **Delete Confirmation**: Displays task title with Cancel/Delete options
- Click outside to close
- Smooth enter/exit animations

### Empty States
- Beautiful gradient background with dashed border
- Large icon and helpful message
- Encourages user to add their first task

### Mobile Optimization
- Touch targets meet Apple's 44x44px minimum
- Larger padding and font sizes on mobile
- Active states for tactile feedback
- Responsive layouts that adapt to screen size
- Floating action button on desktop, full-width on mobile

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
# - NODE_ENV=production
# - LOG_LEVEL=info
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

### Location & Weather Integration

Client-side integration with no backend dependencies:
- Uses `ip-api.com` for IP-based geolocation (CORS-friendly)
- Uses `Open-Meteo` for weather data (no API key required)
- 1-hour localStorage caching to minimize API calls
- Graceful error handling with retry functionality

### Logging Architecture

Comprehensive logging with Winston + Morgan:
- Console output with colorized formatting
- Structured JSON logs for production
- HTTP request/response logging
- Error tracking with stack traces
- Environment-aware log levels

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

- Modern web development best practices
- MongoDB aggregation pipeline documentation
- Tailwind CSS v4 for beautiful, responsive styling
- Framer Motion for smooth animations
- Lucide React for consistent, beautiful icons
- Open-source community for amazing tools and libraries

---

**Live Demo**: [Live Vercel Deployed URL](https://task-manager-checker.vercel.app)
