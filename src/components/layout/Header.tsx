'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { navItems, siteConfig } from '@/config/site';

function SearchIcon() {
  return (
    <svg
      className="h-[18px] w-[18px] text-zinc-800 transition-colors duration-300 group-hover:text-rose-500 group-focus-within:text-rose-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="h-[22px] w-[22px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      className="h-[22px] w-[22px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      // Ignora variações mínimas para não tremer com micro-scrolls
      if (Math.abs(y - lastYRef.current) > 8) {
        setHidden(y > lastYRef.current && y > 120);
        lastYRef.current = y;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHidden = hidden && !menuOpen;

  return (
    <header
      className={`sticky top-0 z-40 border-b border-zinc-100 bg-white transition-[translate] duration-300 ease-in-out ${
        isHidden ? '-translate-y-full' : ''
      }`}
    >
      {/* Barra utilitária */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-2.5 text-xs font-bold">
        <Link href="/como-funciona" className="hover:underline">
          Quem somos?
        </Link>
        <span className="flex items-center gap-2 text-zinc-800">
          Português (AO)
        </span>
      </div>

      {/* Barra principal */}
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-6 py-3 lg:flex-nowrap lg:gap-7 lg:py-3.5">
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
          className="shrink-0 text-zinc-950 lg:hidden"
        >
          <MenuIcon />
        </button>

        <Link
          href="/"
          className="shrink-0 text-xl font-extrabold tracking-tight text-zinc-950"
        >
          iPhonesAO
        </Link>

        <label className="group order-last flex h-11 w-full basis-full items-center gap-2.5 rounded-full border-2 border-transparent bg-zinc-100 px-[18px] transition-all duration-300 hover:border-rose-500/40 hover:bg-white hover:shadow-[0_0_0_4px_rgba(244,63,94,0.1)] focus-within:border-rose-500/40 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.1)] lg:order-none lg:w-auto lg:flex-1 lg:basis-auto">
          <SearchIcon />
          <input
            type="search"
            placeholder="Pesquisar iPhone"
            className="w-full bg-transparent text-[14px] outline-none placeholder:text-zinc-800"
          />
        </label>

        <div className="ml-auto flex shrink-0 items-center gap-5 lg:ml-0">
          <Link href="#" aria-label="Carrinho">
            <BagIcon />
          </Link>
          <Link href="/login" aria-label="Entrar ou criar conta" className="lg:hidden">
            <UserIcon />
          </Link>
          <Link href="/login" aria-label="A minha conta" className="hidden lg:block">
            <p className="cursor-pointer text-[15px] font-bold hover:text-rose-700">
              Entrar ou Criar conta
            </p>
          </Link>
        </div>
      </div>

      {/* Navegação de categorias */}
      <nav className="mx-auto hidden w-full max-w-7xl items-center justify-center gap-7 font-accent lg:flex">
        <Link
          href="/comprar"
          className={`flex items-center gap-1.5 border-b-2 px-1 pb-3 text-[14px] font-medium transition-colors ${
            isActive('/comprar')
              ? 'border-rose-700 text-rose-800'
              : 'border-transparent text-rose-700 hover:text-rose-800'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
          </svg>
          Ofertas para sí
        </Link>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b-2 px-1 pb-3 text-[14px] font-medium transition-colors ${
                active
                  ? 'border-zinc-950 text-zinc-950'
                  : 'border-transparent text-zinc-900 hover:text-zinc-500'
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Menu mobile */}
      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-zinc-950/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-[85vw] max-w-xs flex-col gap-6 overflow-y-auto bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold tracking-tight text-zinc-950">
                {siteConfig.name}
              </span>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
                className="text-zinc-950"
              >
                <CloseIcon />
              </button>
            </div>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[15px] font-bold text-zinc-950"
            >
              <UserIcon />
              Entrar ou Criar conta
            </Link>

            <div className="flex flex-col gap-1 border-t border-zinc-100 pt-4 font-accent">
              <Link
                href="/comprar"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-2.5 text-[15px] font-medium text-rose-700"
              >
                <SparkleIcon />
                Ofertas para sí
              </Link>
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2 py-2.5 text-[15px] font-medium ${
                      active ? 'text-zinc-950' : 'text-zinc-900'
                    }`}
                  >
                    {item.title}
                    {active ? (
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-zinc-950"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto flex flex-col gap-1 border-t border-zinc-100 pt-4 text-sm text-zinc-600">
              <Link
                href="/como-funciona"
                onClick={() => setMenuOpen(false)}
                className="py-1.5"
              >
                Quem somos?
              </Link>
              <span className="py-1.5">Português (AO)</span>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
