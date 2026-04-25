import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { TasksPage } from './pages/TasksPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { CalendarPage } from './pages/CalendarPage'
import { LoginPage } from './pages/LoginPage'
import { useTasks } from './hooks/useTasks'
import { useAuth } from './hooks/useAuth'

export default function App() {
  const { user, loading: loadingAuth, signOut } = useAuth()
  const [currentPage, setCurrentPage] = useState('tasks')
  const { tasks, addTask, updateTask, deleteTask, toggleTask, clearCompleted, stats, isLoading: isLoadingTasks } = useTasks()

  const isLoading = loadingAuth || (user && isLoadingTasks)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          <p className="text-gray-500 font-body text-sm animate-pulse">Carregando TaskLife...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  function renderPage() {
    switch (currentPage) {
      case 'analytics':
        return <AnalyticsPage stats={stats} />
      case 'calendar':
        return <CalendarPage tasks={tasks} />
      default:
        return (
          <TasksPage
            tasks={tasks}
            onAdd={addTask}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onClearCompleted={clearCompleted}
            stats={stats}
          />
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        stats={stats}
        user={user}
        onSignOut={signOut}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
    </div>
  )
}
