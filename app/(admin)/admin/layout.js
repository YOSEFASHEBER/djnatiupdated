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
import { usePathname } from "next/navigation";

export default function layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Cars", href: "/admin/cars", icon: Car },
    { name: "Add Car", href: "/admin/cars/new", icon: PlusCircle },
    { name: "Home", href: "/", icon: Home },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          <aside className="relative w-64 bg-white shadow-xl p-6 flex flex-col">
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
            />
          </aside>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-white shadow-sm flex-col p-6">
        <Sidebar
          navItems={navItems}
          pathname={pathname}
          logout={handleLogout}
        />
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="h-16 bg-white/80 backdrop-blur border-b flex items-center justify-between px-6">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="text-slate-600" size={22} />
          </button>

          <h1 className="font-semibold text-lg text-slate-600">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({ navItems, pathname, logout }) {
  return (
    <>
      <div className="text-2xl font-black text-red-500 mb-10">DJ Nati</div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
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

      <div className="mt-auto pt-8 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}
