"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  Home,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Cars", href: "/admin/cars", icon: Car },
    { name: "Add Car", href: "/admin/cars/new", icon: PlusCircle },
    { name: "Home", href: "/", icon: Home },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          sidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute right-4 top-4"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>

          <Sidebar
            navItems={navItems}
            pathname={pathname}
            logout={handleLogout}
            closeSidebar={() => setSidebarOpen(false)}
          />
        </aside>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-white shadow-sm flex-col p-6">
        <Sidebar
          navItems={navItems}
          pathname={pathname}
          logout={handleLogout}
        />
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="h-16 bg-white/80 backdrop-blur border-b flex items-center justify-between px-4 md:px-6">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="text-slate-600" size={22} />
          </button>

          <h1 className="font-semibold text-base md:text-lg text-slate-700 truncate">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
          >
            {loggingOut ? "Logging out..." : <LogOut size={18} />}
            <span className="hidden sm:inline">Logout</span>
          </button>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-8">
          <div className="w-full overflow-x-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ navItems, pathname, logout, closeSidebar }) {
  return (
    <>
      {/* Logo */}
      <div className="text-2xl font-black text-red-500 mb-10">DJ Nati</div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition
              ${
                active
                  ? "bg-black text-white shadow"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-8 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}
