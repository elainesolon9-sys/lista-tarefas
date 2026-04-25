const FILTERS = [
  { id: 'all',       label: 'Todas'     },
  { id: 'pending',   label: 'Pendentes' },
  { id: 'completed', label: 'Concluídas' },
]

export function FilterBar({ activeFilter, onFilterChange, counts, onClearCompleted }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Filter Tabs */}
      <div className="flex items-center bg-surface-card border border-surface-border rounded-xl p-1 gap-1">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            id={`filter-${id}`}
            onClick={() => onFilterChange(id)}
            className={`
              px-4 py-1.5 rounded-lg text-sm font-body font-medium transition-all duration-200
              ${activeFilter === id
                ? 'bg-accent text-[#0A0A0F] shadow-sm'
                : 'text-gray-400 hover:text-gray-100'
              }
            `}
          >
            {label}
            {counts[id] > 0 && (
              <span className={`ml-2 text-xs font-semibold ${activeFilter === id ? 'text-[#0A0A0F]/70' : 'text-gray-600'}`}>
                {counts[id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Clear Completed */}
      {counts.completed > 0 && (
        <button
          id="btn-clear-completed"
          onClick={onClearCompleted}
          className="text-xs font-body text-gray-500 hover:text-red-400 transition-colors duration-200 underline underline-offset-2"
        >
          Limpar concluídas ({counts.completed})
        </button>
      )}
    </div>
  )
}
