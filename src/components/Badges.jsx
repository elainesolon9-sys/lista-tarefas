export const CATEGORIES = {
  trabalho: { label: 'Trabalho', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', dot: 'bg-blue-400' },
  pessoal:  { label: 'Pessoal',  color: 'bg-pink-500/20 text-pink-400 border-pink-500/30',  dot: 'bg-pink-400'  },
  estudos:  { label: 'Estudos',  color: 'bg-violet-500/20 text-violet-400 border-violet-500/30', dot: 'bg-violet-400' },
  saude:    { label: 'Saúde',    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' },
  outros:   { label: 'Outros',   color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',  dot: 'bg-gray-400'  },
}

export const PRIORITIES = {
  alta:  { label: 'Alta',  color: 'bg-red-500/20 text-red-400 border-red-500/30',   dot: 'bg-red-400'   },
  media: { label: 'Média', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', dot: 'bg-amber-400' },
  baixa: { label: 'Baixa', color: 'bg-green-500/20 text-green-400 border-green-500/30', dot: 'bg-green-400' },
}

export function CategoryBadge({ category, size = 'sm' }) {
  const config = CATEGORIES[category] || CATEGORIES.outros
  return (
    <span className={`badge border ${config.color} ${size === 'xs' ? 'text-[10px] px-2 py-0.5' : ''}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}

export function PriorityBadge({ priority, size = 'sm' }) {
  const config = PRIORITIES[priority] || PRIORITIES.media
  return (
    <span className={`badge border ${config.color} ${size === 'xs' ? 'text-[10px] px-2 py-0.5' : ''}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}
