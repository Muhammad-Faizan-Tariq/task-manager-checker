import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md mb-8">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Task Priority Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize tasks by priority and due date
          </p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
