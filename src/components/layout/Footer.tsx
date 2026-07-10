import Link from 'next/link';

import { siteConfig } from '@/config/site';

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Sobre nós',
    links: [
      { label: 'Quem somos?', href: '/como-funciona' },
      { label: 'Como funciona', href: '/como-funciona' },
      { label: 'Estamos a recrutar!', href: '#' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { label: 'Pagamento', href: '#' },
      { label: 'Envio', href: '#' },
      { label: 'Devoluções e reembolsos', href: '#' },
      { label: 'Centro de Ajuda', href: '#' },
      { label: 'Guias', href: '#' },
      { label: 'Compara dispositivos', href: '/comprar' },
      { label: 'Todas as avaliações de clientes', href: '#' },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Trade-In', href: '/trade-in' },
      { label: 'Vender o meu iPhone', href: '/vender' },
      { label: 'Leilões', href: '/leiloes' },
      { label: 'Recomenda um amigo', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos de serviço', href: '#' },
      { label: 'Termos e condições gerais de venda', href: '#' },
      { label: 'Garantia iphonesAO', href: '#' },
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Cookies e Definições de privacidade', href: '#' },
      { label: 'Menções Legais', href: '#' },
      { label: 'Pagamentos 100% seguros', href: '#' },
    ],
  },
  {
    title: 'Olá!',
    links: [
      { label: 'Instagram', href: siteConfig.links.instagram },
      { label: 'Facebook', href: siteConfig.links.facebook },
      { label: 'WhatsApp', href: '#' },
    ],
  },
];

function MailIcon() {
  return (
    <svg
      className="h-5 w-5 text-zinc-500"
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

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-14">
        {/* Newsletter */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold tracking-tight">
              Mantém-te a par das novidades
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-zinc-600">
              Recebe as novidades em primeira-mão, com ofertas exclusivas e
              notícias importantes sobre iPhones.
            </p>
          </div>
          <form className="flex w-full max-w-xl items-center gap-3">
            <label className="flex h-13 flex-1 items-center justify-between rounded-lg border border-zinc-300 px-4">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-700"
              />
              <MailIcon />
            </label>
            <button
              type="submit"
              className="h-13 shrink-0 rounded-lg bg-zinc-950 px-6 font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              Subscrever
            </button>
          </form>
        </div>

        {/* Colunas de links */}
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-lg font-semibold">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
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
          ))}
        </div>

        {/* Pagamentos */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {['VISA', 'Mastercard', 'Multicaixa', 'Transferência', 'Na entrega'].map(
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

        <div className="mt-10 border-t border-zinc-200 pt-8 text-sm text-zinc-700">
          © {new Date().getFullYear()} {siteConfig.name} ·{' '}
          {siteConfig.contact.email} · {siteConfig.contact.phone}
        </div>
      </div>
    </footer>
  );
}
