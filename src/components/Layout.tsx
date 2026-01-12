import { Outlet } from 'react-router'
import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="lg:pl-20">
        <main className="px-6 py-6 pb-24 max-w-[600px] mx-auto lg:max-w-[1200px] lg:pt-24 lg:pb-12">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
