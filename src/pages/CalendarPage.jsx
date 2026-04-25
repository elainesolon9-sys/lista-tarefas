import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO, addMonths, subMonths,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CategoryBadge } from '../components/Badges'
import { CATEGORIES } from '../components/Badges'

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function getDotColor(category) {
  const colors = {
    trabalho: 'bg-blue-400',
    pessoal: 'bg-pink-400',
    estudos: 'bg-violet-400',
    saude: 'bg-emerald-400',
    outros: 'bg-gray-400',
  }
  return colors[category] || 'bg-gray-400'
}

export function CalendarPage({ tasks }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  const days = eachDayOfInterval({ start: calStart, end: calEnd })

  function getTasksForDay(day) {
    return tasks.filter(t => t.dueDate && isSameDay(parseISO(t.dueDate), day))
  }

  const selectedTasks = selectedDay ? getTasksForDay(selectedDay) : []

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-gray-100">
          <span className="text-gradient">Calendário</span>
        </h1>
        <p className="text-sm text-gray-500 font-body mt-1">
          Visualize suas tarefas por data de vencimento
        </p>
      </div>

      <div className="card p-5">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            id="btn-prev-month"
            onClick={() => setCurrentMonth(m => subMonths(m, 1))}
            className="w-8 h-8 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-surface-border transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="font-display font-semibold text-gray-100 capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <button
            id="btn-next-month"
            onClick={() => setCurrentMonth(m => addMonths(m, 1))}
            className="w-8 h-8 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-surface-border transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-[11px] font-body font-medium text-gray-600 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            const dayTasks = getTasksForDay(day)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isSelected = selectedDay && isSameDay(day, selectedDay)
            const isTodayDay = isToday(day)

            return (
              <button
                key={idx}
                id={`cal-day-${format(day, 'yyyy-MM-dd')}`}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`
                  relative flex flex-col items-center py-2 px-1 rounded-xl text-sm
                  transition-all duration-150 min-h-[52px]
                  ${!isCurrentMonth ? 'opacity-25' : ''}
                  ${isSelected ? 'bg-accent/20 border border-accent/40' : 'hover:bg-surface-elevated'}
                  ${isTodayDay && !isSelected ? 'border border-accent/30' : ''}
                `}
              >
                <span className={`
                  text-xs font-body font-medium
                  ${isTodayDay ? 'text-accent font-semibold' : 'text-gray-300'}
                `}>
                  {format(day, 'd')}
                </span>
                {dayTasks.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                    {dayTasks.slice(0, 3).map((t, i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${getDotColor(t.category)}`} />
                    ))}
                    {dayTasks.length > 3 && (
                      <span className="text-[9px] text-gray-500">+{dayTasks.length - 3}</span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Day Tasks */}
      {selectedDay && (
        <div className="mt-4 animate-slide-in">
          <h3 className="font-display font-semibold text-gray-200 mb-3 capitalize">
            {format(selectedDay, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h3>
          {selectedTasks.length === 0 ? (
            <p className="text-sm text-gray-500 font-body text-center py-6 card">
              Nenhuma tarefa neste dia.
            </p>
          ) : (
            <div className="space-y-2">
              {selectedTasks.map(task => (
                <div key={task.id} className="card p-4 flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getDotColor(task.category)}`} />
                  <span className={`flex-1 text-sm font-body ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                    {task.title}
                  </span>
                  <CategoryBadge category={task.category} size="xs" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
