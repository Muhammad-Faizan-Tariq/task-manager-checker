import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <main className="container mx-auto px-4 py-6 max-w-4xl">
            <TaskForm />
            <TaskList />
          </main>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;