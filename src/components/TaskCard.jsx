import { Trash2, CalendarDays, Check, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { CategoryBadge, PriorityBadge } from './Badges'
import { format, parseISO, isPast, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function formatDate(dateStr) {
  if (!dateStr) return null
  try {
    const date = parseISO(dateStr)
    if (isToday(date)) return { label: 'Hoje', urgent: false, overdue: false }
    const overdue = isPast(date)
    return {
      label: format(date, "d 'de' MMM", { locale: ptBR }),
      urgent: isToday(date),
      overdue,
    }
  } catch {
    return null
  }
}

export function TaskCard({ task, onToggle, onDelete }) {
  const dateInfo = formatDate(task.dueDate)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`
        group card p-4 flex items-start gap-4 cursor-default
        ${task.completed ? 'opacity-50 hover:opacity-70' : 'hover:shadow-glow-sm'}
        transition-colors duration-300
      `}
    >
      {/* Checkbox */}
      <button
        id={`toggle-task-${task.id}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
        className={`
          checkbox-custom mt-0.5
          ${task.completed
            ? 'bg-accent border-accent shadow-glow-sm'
            : 'border-surface-border hover:border-accent/60 hover:bg-accent/10'
          }
        `}
      >
        {task.completed && (
          <Check className="w-3 h-3 text-[#0A0A0F]" strokeWidth={3} />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <p className={`
          font-body font-medium text-sm mb-2 leading-snug
          ${task.completed ? 'task-title-completed' : 'text-gray-100'}
        `}>
          {task.title}
        </p>

        {/* Badges + Date */}
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={task.category} />
          <PriorityBadge priority={task.priority} />

          {dateInfo && (
            <span className={`
              flex items-center gap-1 text-[11px] font-body
              ${dateInfo.overdue && !task.completed
                ? 'text-red-400'
                : 'text-gray-500'
              }
            `}>
              {dateInfo.overdue && !task.completed
                ? <AlertCircle className="w-3 h-3" />
                : <CalendarDays className="w-3 h-3" />
              }
              {dateInfo.label}
              {dateInfo.overdue && !task.completed && ' (atrasada)'}
            </span>
          )}
        </div>
      </div>

      {/* Delete */}
      <button
        id={`delete-task-${task.id}`}
        onClick={() => onDelete(task.id)}
        aria-label="Excluir tarefa"
        className="
          w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
          text-gray-600 hover:text-red-400 hover:bg-red-500/10
          opacity-0 group-hover:opacity-100
          transition-all duration-200
        "
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  )
}
