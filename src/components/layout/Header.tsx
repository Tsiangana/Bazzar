import Link from 'next/link';

import { navItems, siteConfig } from '@/config/site';

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5 text-zinc-800"
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
      className="h-6 w-6"
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
      className="h-6 w-6"
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
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="border-b border-zinc-100 bg-white">
      {/* Barra utilitária */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-3 text-sm font-medium">
        <Link href="/como-funciona" className="hover:underline">
          Quem somos?
        </Link>
        <span className="flex items-center gap-2 text-zinc-800">
          <span aria-hidden>🇦🇴</span> Português (AO)
        </span>
      </div>

      {/* Barra principal */}
      <div className="mx-auto flex w-full max-w-7xl items-center gap-8 px-6 py-4">
        <Link
          href="/"
          className="shrink-0 text-2xl font-extrabold tracking-tight text-zinc-950"
        >
          <span aria-hidden>⟪ </span>
          {siteConfig.name}
        </Link>
        <label className="flex h-12 flex-1 items-center gap-3 rounded-full bg-zinc-100 px-5">
          <SearchIcon />
          <input
            type="search"
            placeholder="Pesquisar iPhone"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-800"
          />
        </label>
        <div className="flex shrink-0 items-center gap-6">
          <Link href="/como-funciona" className="text-[17px] font-medium">
            Precisas de ajuda?
          </Link>
          <Link href="#" aria-label="A minha conta">
            <UserIcon />
          </Link>
          <Link href="#" aria-label="Carrinho">
            <BagIcon />
          </Link>
        </div>
      </div>

      {/* Navegação de categorias */}
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-center gap-8 px-6 pb-4">
        <Link
          href="/comprar"
          className="flex items-center gap-1.5 text-[15px] font-medium text-rose-700 hover:text-rose-800"
        >
          <SparkleIcon />
          Ofertas
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[15px] font-medium text-zinc-900 transition-colors hover:text-zinc-500"
          >
            {item.title}
          </Link>
        ))}
        <span className="text-[15px] font-medium text-zinc-900">Mais</span>
      </nav>
    </header>
  );
}
