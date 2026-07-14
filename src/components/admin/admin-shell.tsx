"use client";

import { useState, useEffect, type ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

interface AdminShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AdminShell({ children, title, subtitle }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Carregar estado do localStorage quando montar
  useEffect(() => {
    const saved = localStorage.getItem("admin-sidebar-collapsed");
    if (saved !== null) {
      setSidebarCollapsed(saved === "true");
    }
    setMounted(true);
  }, []);

  // Salvar estado no localStorage quando mudar
  const handleToggleCollapse = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem("admin-sidebar-collapsed", String(newState));
  };

  // Evitar flash de conteúdo não sincronizado
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#f7f8fa] overflow-hidden">
      {/* Sidebar - Desktop */}
      <div
        className={`hidden lg:flex lg:shrink-0 h-full transition-all duration-300 ${
          sidebarCollapsed ? 'lg:w-[72px]' : 'lg:w-[240px]'
        }`}
      >
        <AdminSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      </div>

      {/* Sidebar - Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-[240px] shadow-2xl">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#f8f9fa]">
          <div className="mx-auto w-full max-w-6xl">
            {/* Page Title & Subtitle */}
            {title && (
              <div className="mb-6">
                <h1 className="text-[20px] font-bold text-gray-900 tracking-tight leading-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-[12.5px] text-gray-400 font-medium mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
