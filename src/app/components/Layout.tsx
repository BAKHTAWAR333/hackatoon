import { Outlet, NavLink, useNavigate } from "react-router";
import { Home, Compass, MessageCircle, Trophy, Brain, Bell, User, Plus, LogOut } from "lucide-react";
import { storage } from "../utils/storage";

export function Layout() {
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();
  const notifications = storage.getNotifications().filter(n => !n.read);

  const handleLogout = () => {
    storage.setCurrentUser(null);
    navigate('/');
  };

  const navItems = [
    { to: '/app', label: 'Dashboard', icon: Home, end: true },
    { to: '/app/explore', label: 'Explore', icon: Compass },
    { to: '/app/messages', label: 'Messages', icon: MessageCircle },
    { to: '/app/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/app/ai-center', label: 'AI Center', icon: Brain },
    { to: '/app/notifications', label: 'Notifications', icon: Bell, badge: notifications.length },
    { to: '/app/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#e5e7eb] bg-white">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-[#e5e7eb] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d9488] text-white">
                <span className="font-semibold">H</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[#111827]">HelpHub AI</h1>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-[#f0fdfa] text-[#0d9488]'
                        : 'text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#111827]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.5} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="rounded-full bg-[#0d9488] px-2 py-0.5 text-xs text-white">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Quick Action */}
          <div className="border-t border-[#e5e7eb] p-4">
            <NavLink
              to="/app/create"
              className="flex items-center justify-center gap-2 rounded-md bg-[#0d9488] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0f766e]"
            >
              <Plus className="h-5 w-5" />
              Create Request
            </NavLink>
          </div>

          {/* User Profile */}
          <div className="border-t border-[#e5e7eb] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5e7eb] text-sm font-medium text-[#6b7280]">
                {currentUser?.name?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-[#111827]">{currentUser?.name || 'User'}</p>
                <p className="truncate text-xs text-[#6b7280]">{currentUser?.email || ''}</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-md p-2 text-[#6b7280] transition-colors hover:bg-[#f9fafb] hover:text-[#111827]"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
