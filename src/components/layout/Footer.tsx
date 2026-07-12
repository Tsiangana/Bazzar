'use client';

import Link from 'next/link';
import { useState } from 'react';

import { siteConfig } from '@/config/site';

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Sobre nós',
    links: [
      { label: 'Quem somos?', href: '/como-funciona' },
      { label: 'Como funciona', href: '/como-funciona' },
      { label: 'Estamos a recrutar!', href: '/recrutamento' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { label: 'Pagamento', href: '/pagamento' },
      { label: 'Envio', href: '/envio' },
      { label: 'Devoluções e reembolsos', href: '/devolucoes-reembolsos' },
      { label: 'Centro de Ajuda', href: '/ajuda' },
      { label: 'Guias', href: '/guias' },
      { label: 'Compara dispositivos', href: '/comprar' },
      { label: 'Todas as avaliações de clientes', href: '/avaliacoes' },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Trade-In', href: '/trade-in' },
      { label: 'Vender o meu iPhone', href: '/vender' },
      { label: 'Leilões', href: '/leiloes' },
      { label: 'Recomenda um amigo', href: '/recomenda-um-amigo' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos de serviço', href: '/termos-de-servico' },
      {
        label: 'Termos e condições gerais de venda',
        href: '/termos-condicoes-venda',
      },
      { label: 'Garantia iphonesAO', href: '/garantia' },
      { label: 'Política de Privacidade', href: '/privacidade' },
      { label: 'Cookies e Definições de privacidade', href: '/cookies' },
      { label: 'Menções Legais', href: '/mencoes-legais' },
      { label: 'Pagamentos 100% seguros', href: '/pagamentos-seguros' },
    ],
  },
  {
    title: 'Olá!',
    links: [
      { label: 'Instagram', href: siteConfig.links.instagram },
      { label: 'Facebook', href: siteConfig.links.facebook },
      {
        label: 'WhatsApp',
        href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`,
      },
    ],
  },
];

function MailIcon() {
  return (
    <svg
      className="h-5 w-5 text-zinc-500 transition-colors duration-300 group-hover:text-rose-500 group-focus-within:text-rose-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 ease-in-out sm:hidden ${
        open ? 'rotate-180' : ''
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FooterColumn({
  col,
}: {
  col: (typeof columns)[number];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100 py-4 sm:border-0 sm:py-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left sm:pointer-events-none"
      >
        <h3 className="text-[15px] font-semibold sm:text-lg">{col.title}</h3>
        <ChevronIcon open={open} />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out sm:!grid-rows-[1fr] sm:!opacity-100 ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <ul className="mt-3 flex flex-col gap-3 overflow-hidden sm:mt-4">
          {col.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[15px] text-zinc-700 hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-14">
        {/* Newsletter */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Mantém-te a par das novidades
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-zinc-600">
              Recebe as novidades em primeira-mão, com ofertas exclusivas e
              notícias importantes sobre iPhones.
            </p>
          </div>
          <form className="flex w-full max-w-xl gap-3 sm:items-center">
            <label className="group flex h-12 flex-1 items-center gap-2.5 rounded-lg border-2 border-zinc-300 px-4 transition-all duration-300 hover:border-rose-500/40 hover:bg-white hover:shadow-[0_0_0_4px_rgba(244,63,94,0.1)] focus-within:border-rose-500/40 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.1)] sm:h-13">
              <MailIcon />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-700"
              />
            </label>
            <button
              type="submit"
              className="h-12 shrink-0 rounded-lg bg-rose-500 px-6 font-semibold text-white transition-colors hover:bg-rose-600 sm:h-13"
            >
              Subscrever
            </button>
          </form>
        </div>

        {/* Colunas de links */}
        <div className="mt-10 grid grid-cols-1 sm:mt-14 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-5">
          {columns.map((col) => (
            <FooterColumn key={col.title} col={col} />
          ))}
        </div>

        {/* Pagamentos */}
        <div className="mt-8 flex flex-wrap items-center gap-2 sm:mt-10">
          {['Multicaixa', 'Transferência', 'Na entrega'].map(
            (method) => (
              <span
                key={method}
                className="rounded border border-zinc-200 px-2 py-1 text-xs font-semibold text-zinc-700"
              >
                {method}
              </span>
            ),
          )}
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-700 sm:mt-10 sm:pt-8">
          © {new Date().getFullYear()} {siteConfig.name} ·{' '}
          {siteConfig.contact.email} · {siteConfig.contact.phone}
        </div>
      </div>
    </footer>
  );
}
