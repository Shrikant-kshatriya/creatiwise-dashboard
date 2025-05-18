import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-2xl w-full text-center space-y-6 py-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Welcome to <span className="text-primary">React Dashboard</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl">
          Build modern, responsive dashboards using <span className="font-medium">React</span>, <span className="font-medium">Tailwind CSS</span>, and <span className="font-medium">Shadcn UI</span>. This starter layout gives you clean structure, beautiful design, and blazing-fast performance.
        </p>
        <div>
          <Link to="/dashboard">
            <Button className="text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-200">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}