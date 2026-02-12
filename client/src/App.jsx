import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { LocationWeatherProvider } from './context/LocationWeatherContext';
import Header from './components/Header';
import TaskFormModal from './components/TaskFormModal';
import TaskList from './components/TaskList';
import SplashScreen from './components/SplashScreen';
import Greeting from './components/Greeting';
import { Plus } from 'lucide-react';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <LocationWeatherProvider>
        <TaskProvider>
          <div className="min-h-screen bg-gray-100 transition-colors duration-200">
            <Header />
            <main className="container mx-auto px-4 py-6 max-w-4xl">
              <Greeting />

              <TaskList />

              {/* Add Task Button */}
              <button
                onClick={toggleForm}
                className="mt-6 w-full md:w-auto md:fixed md:bottom-8 md:right-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Add New Task
              </button>

              {/* Task Form Modal */}
              <TaskFormModal isOpen={showForm} onClose={toggleForm} />
            </main>
          </div>
        </TaskProvider>
      </LocationWeatherProvider>
    </>
  );
}

export default App;