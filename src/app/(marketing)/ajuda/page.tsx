import type { Metadata } from 'next';
import Link from 'next/link';

import { FaqList } from '@/components/features/FaqList';
import { faqs } from '@/lib/data/faqs';

export const metadata: Metadata = {
  title: 'Centro de Ajuda',
  description: 'Encontra respostas rápidas sobre pagamento, envio, devoluções, trocas e mais.',
};

const quickLinks = [
  { label: 'Pagamento', href: '/pagamento' },
  { label: 'Envio', href: '/envio' },
  { label: 'Devoluções e reembolsos', href: '/devolucoes-reembolsos' },
  { label: 'Garantia iphonesAO', href: '/garantia' },
  { label: 'Guias', href: '/guias' },
  { label: 'Trade-In', href: '/trade-in' },
  { label: 'Vender o meu iPhone', href: '/vender' },
  { label: 'Leilões', href: '/leiloes' },
];

export default function AjudaPage() {
  return (
    <main className="flex-1 bg-page">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-medium tracking-tight text-zinc-950 sm:text-5xl">
            Centro de Ajuda
          </h1>
          <p className="text-lg text-zinc-700">
            Encontra respostas rápidas ou explora os nossos tópicos de apoio.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-[15px] font-medium text-zinc-800 transition-shadow hover:shadow-md"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-zinc-950">
            Perguntas frequentes
          </h2>
          <FaqList faqs={faqs} />
        </div>
      </div>
    </main>
  );
}
