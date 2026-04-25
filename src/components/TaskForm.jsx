import { useState } from 'react'
import { X, Plus, CalendarDays } from 'lucide-react'
import { motion } from 'framer-motion'
import { CATEGORIES, PRIORITIES } from './Badges'

const CATEGORY_OPTIONS = Object.entries(CATEGORIES).map(([value, { label }]) => ({ value, label }))
const PRIORITY_OPTIONS = Object.entries(PRIORITIES).map(([value, { label }]) => ({ value, label }))

const INITIAL_FORM = {
  title: '',
  category: 'trabalho',
  priority: 'media',
  dueDate: '',
}

export function TaskForm({ onAdd, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('O título é obrigatório.')
      return
    }
    onAdd(form)
    setForm(INITIAL_FORM)
    setError('')
    onClose()
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (field === 'title') setError('')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-surface/80 backdrop-blur-sm" 
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md"
      >
        <div className="card p-6 border-accent/10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-gray-100">
                Nova Tarefa
              </h2>
              <p className="text-xs text-gray-500 font-body mt-0.5">
                Preencha os detalhes da sua tarefa
              </p>
            </div>
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-surface-elevated flex items-center justify-center
                         text-gray-400 hover:text-gray-100 hover:bg-surface-border transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-xs font-body font-medium text-gray-400 mb-1.5 tracking-wide uppercase">
                Título *
              </label>
              <input
                id="task-title-input"
                type="text"
                value={form.title}
                onChange={e => handleChange('title', e.target.value)}
                placeholder="Ex: Preparar apresentação..."
                className={`input-field ${error ? 'border-red-500/60 focus:border-red-500/60' : ''}`}
                autoFocus
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            {/* Categoria + Prioridade */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-body font-medium text-gray-400 mb-1.5 tracking-wide uppercase">
                  Categoria
                </label>
                <select
                  id="task-category-select"
                  value={form.category}
                  onChange={e => handleChange('category', e.target.value)}
                  className="input-field"
                >
                  {CATEGORY_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-body font-medium text-gray-400 mb-1.5 tracking-wide uppercase">
                  Prioridade
                </label>
                <select
                  id="task-priority-select"
                  value={form.priority}
                  onChange={e => handleChange('priority', e.target.value)}
                  className="input-field"
                >
                  {PRIORITY_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Data */}
            <div>
              <label className="block text-xs font-body font-medium text-gray-400 mb-1.5 tracking-wide uppercase">
                Data de Conclusão
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <input
                  id="task-date-input"
                  type="date"
                  value={form.dueDate}
                  onChange={e => handleChange('dueDate', e.target.value)}
                  className="input-field pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost flex-1"
              >
                Cancelar
              </button>
              <button
                id="btn-submit-task"
                type="submit"
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Criar Tarefa
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
