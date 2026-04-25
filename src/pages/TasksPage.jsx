import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TaskForm } from '../components/TaskForm'
import { TaskCard } from '../components/TaskCard'
import { FilterBar } from '../components/FilterBar'
import { EmptyState } from '../components/EmptyState'

export function TasksPage({ tasks, onAdd, onToggle, onDelete, onClearCompleted, stats }) {
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const counts = {
    all: tasks.length,
    pending: stats.pending,
    completed: stats.completed,
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-100">
            Minhas{' '}
            <span className="text-gradient">Tarefas</span>
          </h1>
          <p className="text-sm text-gray-500 font-body mt-1">
            {stats.pending === 0
              ? 'Todas as tarefas concluídas 🎉'
              : `${stats.pending} tarefa${stats.pending !== 1 ? 's' : ''} pendente${stats.pending !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        <button
          id="btn-new-task"
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2 shadow-glow"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nova Tarefa</span>
          <span className="sm:hidden">Nova</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mb-5">
        <FilterBar
          activeFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
          onClearCompleted={onClearCompleted}
        />
      </div>

      {/* Task List */}
      <AnimatePresence mode="wait">
        {filteredTasks.length === 0 ? (
          <EmptyState filter={filter} onAdd={() => setShowForm(true)} key="empty" />
        ) : (
          <motion.div layout className="space-y-3" key="list">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <TaskForm
            onAdd={onAdd}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
