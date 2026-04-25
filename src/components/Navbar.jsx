import { CheckSquare2, BarChart2, Calendar, LogOut } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'tasks', label: 'Tarefas', icon: CheckSquare2 },
  { id: 'analytics', label: 'Análises', icon: BarChart2 },
  { id: 'calendar', label: 'Calendário', icon: Calendar },
]

export function Navbar({ currentPage, onNavigate, stats, user, onSignOut }) {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
              <CheckSquare2 className="w-4 h-4 text-accent" />
            </div>
            <span className="font-display text-lg font-semibold text-gray-100 hidden lg:block">
              TaskLife
            </span>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`nav-${id}`}
                onClick={() => onNavigate(id)}
                className={`nav-link flex items-center gap-2 ${currentPage === id ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>

          {/* User Info & Sair */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] text-gray-500 font-body uppercase tracking-wider">Conta</span>
                <span className="text-xs text-gray-300 font-body truncate max-w-[120px]">{user.email}</span>
              </div>
            )}
            <button
              id="btn-logout"
              className="btn-ghost flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 h-10"
              onClick={onSignOut}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
