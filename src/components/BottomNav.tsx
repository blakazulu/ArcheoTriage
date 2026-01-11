import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Home, ClipboardList, FolderOpen, BookOpen, Settings } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, labelKey: 'nav.home' },
  { to: '/guide', icon: ClipboardList, labelKey: 'nav.guide' },
  { to: '/findings', icon: FolderOpen, labelKey: 'nav.findings' },
  { to: '/education', icon: BookOpen, labelKey: 'nav.education' },
]

export default function BottomNav() {
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-dark px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 flex justify-around z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.15)] lg:top-[70px] lg:bottom-auto lg:right-auto lg:w-20 lg:h-[calc(100vh-70px)] lg:flex-col lg:justify-start lg:gap-2 lg:px-2 lg:py-6">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-stone lg:top-0 lg:bottom-0 lg:left-auto lg:right-0 lg:w-0.5 lg:h-full" />

      {navItems.map(({ to, icon: Icon, labelKey }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-4 py-2 rounded text-stone-light no-underline transition-all relative lg:w-full lg:px-2 lg:py-4 ${
              isActive ? 'text-signal-orange' : 'hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon className="w-[22px] h-[22px]" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-tight">
                {t(labelKey)}
              </span>
              {isActive && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-signal-orange rounded-b lg:top-1/2 lg:left-auto lg:right-0 lg:-translate-y-1/2 lg:translate-x-0 lg:w-[3px] lg:h-6 lg:rounded-r-none lg:rounded-l" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
