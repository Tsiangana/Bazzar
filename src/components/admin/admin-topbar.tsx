"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const [name, setName] = useState<string>("Admin");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const initial = name?.[0]?.toUpperCase() ?? "A";

  const dateObj = new Date();
  const formattedDate = dateObj.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return (
    <header className="sticky top-0 z-30 flex h-[64px] items-center justify-between gap-4 border-b border-gray-100 bg-white px-6 shrink-0 select-none">

      {/* Left */}
      <div className="flex items-center gap-4 flex-1 max-w-[320px]">
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 lg:hidden transition-colors border border-gray-100"
          aria-label="Abrir menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="w-full hidden md:block">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Pesquisar..."
              className="w-full h-9 pl-9 pr-4 text-[13px] bg-[#f5f5f5] border border-transparent rounded-lg outline-none focus:bg-white focus:border-[#008060]/30 focus:ring-2 focus:ring-[#008060]/10 transition-all placeholder:text-[#bbb]"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 sm:gap-5 shrink-0">

        {/* Date */}
        <div className="hidden sm:flex items-center gap-2 text-[12.5px] font-medium text-gray-700 bg-[#f8f9fa] border border-gray-50 px-3.5 py-1.5 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="tabular-nums">{formattedDate}</span>
        </div>

        {/* Notifications */}
        <Link
          href="/admin/notificacoes"
          className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-100 shrink-0"
          title="Notificações"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </Link>

        <div className="h-8 w-px bg-gray-100 hidden sm:block" />

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#008060] flex items-center justify-center text-white font-semibold text-[12px] overflow-hidden">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                initial
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          <div className="hidden lg:flex flex-col text-left">
            <span className="text-[12px] font-bold text-gray-800 leading-tight truncate max-w-[130px]">
              {name}
            </span>
            <span className="text-[10.5px] text-gray-400 font-medium">Administrador</span>
          </div>
        </div>

      </div>
    </header>
  );
}
