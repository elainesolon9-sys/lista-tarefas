import { CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react'
import { CATEGORIES, PRIORITIES } from '../components/Badges'

function StatCard({ icon: Icon, label, value, color = 'text-accent' }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-gray-100">{value}</p>
        <p className="text-xs text-gray-500 font-body">{label}</p>
      </div>
    </div>
  )
}

function BarChart({ items, colorMap }) {
  const max = Math.max(...items.map(i => i.count), 1)
  return (
    <div className="space-y-3">
      {items.map(({ key, label, count }) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-xs font-body text-gray-400 w-20 shrink-0 text-right">{label}</span>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${colorMap[key]}`}
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-body text-gray-500 w-5 text-right">{count}</span>
        </div>
      ))}
    </div>
  )
}

export function AnalyticsPage({ stats }) {
  const categoryItems = Object.entries(CATEGORIES).map(([key, { label }]) => ({
    key, label, count: stats.byCategory[key] || 0,
  })).filter(i => i.count > 0)

  const priorityItems = Object.entries(PRIORITIES).map(([key, { label }]) => ({
    key, label, count: stats.byPriority[key] || 0,
  })).filter(i => i.count > 0)

  const categoryColors = {
    trabalho: 'bg-blue-500',
    pessoal: 'bg-pink-500',
    estudos: 'bg-violet-500',
    saude: 'bg-emerald-500',
    outros: 'bg-gray-500',
  }

  const priorityColors = {
    alta: 'bg-red-500',
    media: 'bg-amber-500',
    baixa: 'bg-green-500',
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-gray-100">
          <span className="text-gradient">Análises</span>
        </h1>
        <p className="text-sm text-gray-500 font-body mt-1">
          Visão geral do seu progresso
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <StatCard icon={ListTodo} label="Total de tarefas" value={stats.total} color="text-accent" />
        <StatCard icon={TrendingUp} label="Taxa de conclusão" value={`${stats.completionRate}%`} color="text-accent" />
        <StatCard icon={CheckCircle2} label="Concluídas" value={stats.completed} color="text-green-400" />
        <StatCard icon={Clock} label="Pendentes" value={stats.pending} color="text-amber-400" />
      </div>

      {/* Charts */}
      <div className="grid gap-5">
        {/* Por Categoria */}
        {categoryItems.length > 0 && (
          <div className="card p-5">
            <h3 className="font-display font-semibold text-gray-200 mb-4 text-sm uppercase tracking-widest">
              Por Categoria
            </h3>
            <BarChart items={categoryItems} colorMap={categoryColors} />
          </div>
        )}

        {/* Por Prioridade */}
        {priorityItems.length > 0 && (
          <div className="card p-5">
            <h3 className="font-display font-semibold text-gray-200 mb-4 text-sm uppercase tracking-widest">
              Por Prioridade
            </h3>
            <BarChart items={priorityItems} colorMap={priorityColors} />
          </div>
        )}

        {/* Progress Circle */}
        <div className="card p-5 flex items-center gap-6">
          <div className="relative w-24 h-24 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2A2A3A" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="#F0A500"
                strokeWidth="3"
                strokeDasharray={`${stats.completionRate} ${100 - stats.completionRate}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-accent text-lg">
              {stats.completionRate}%
            </span>
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-gray-100 mb-1">
              {stats.completionRate >= 80 ? 'Excelente progresso!' :
               stats.completionRate >= 50 ? 'Bom ritmo!' :
               stats.completionRate > 0 ? 'Continue assim!' :
               'Vamos começar!'}
            </p>
            <p className="text-sm text-gray-500 font-body">
              {stats.completed} de {stats.total} tarefa{stats.total !== 1 ? 's' : ''} concluída{stats.completed !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
