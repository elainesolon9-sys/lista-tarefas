import { ClipboardList, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

export function EmptyState({ filter, onAdd }) {
  const messages = {
    all: {
      title: 'Nenhuma tarefa ainda',
      sub: 'Comece criando sua primeira tarefa.',
    },
    pending: {
      title: 'Tudo em dia!',
      sub: 'Não há tarefas pendentes no momento.',
    },
    completed: {
      title: 'Nenhuma concluída',
      sub: 'Complete uma tarefa para vê-la aqui.',
    },
  }

  const { title, sub } = messages[filter] || messages.all

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-surface-border flex items-center justify-center mb-4">
        <ClipboardList className="w-8 h-8 text-gray-600" />
      </div>
      <h3 className="font-display text-xl font-semibold text-gray-300 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 font-body mb-6">{sub}</p>
      {filter === 'all' && (
        <button
          id="btn-empty-add"
          onClick={onAdd}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Criar primeira tarefa
        </button>
      )}
    </motion.div>
  )
}
