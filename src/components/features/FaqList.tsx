'use client';

import { useState } from 'react';

interface Faq {
  q: string;
  a: string;
}

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 py-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold"
      >
        {faq.q}
        <span
          aria-hidden
          className={`shrink-0 text-zinc-500 transition-transform duration-300 ease-in-out ${
            open ? 'rotate-45' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[15px] leading-7 text-zinc-700">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mt-6 flex flex-col">
      {faqs.map((faq) => (
        <FaqItem key={faq.q} faq={faq} />
      ))}
    </div>
  );
}
