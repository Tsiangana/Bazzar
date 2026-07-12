'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { lifestyleImages } from '@/lib/data/products';

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m12 19-7-7 7-7M5 12h14" />
    </svg>
  );
}

const inputClass =
  'group flex h-12 items-center rounded-lg border border-zinc-300 px-4 transition-all duration-300 hover:border-rose-500/40 hover:bg-white hover:shadow-[0_0_0_4px_rgba(244,63,94,0.1)] focus-within:border-rose-500/40 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]';

function OtpInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function updateDigit(index: number, digit: string) {
    const next = [...value];
    next[index] = digit;
    onChange(next);
    if (digit && index < value.length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => updateDigit(i, e.target.value.replace(/\D/g, '').slice(-1))}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-14 w-12 rounded-lg border-2 border-zinc-300 text-center text-xl font-semibold text-zinc-950 outline-none transition-all duration-300 focus:border-rose-500/40 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.1)] sm:h-16 sm:w-14"
        />
      ))}
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'entrar' | 'criar'>('entrar');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const isSignup = mode === 'criar';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep('otp');
  }

  function handleConfirmOtp(e: React.FormEvent) {
    e.preventDefault();
    router.push('/');
  }

  return (
    <main className="flex min-h-screen bg-white">
      <div className="relative flex w-full flex-col px-6 py-8 lg:w-4/5 lg:px-16 lg:py-10">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-zinc-950"
        >
          iPhonesAO
        </Link>

        {step === 'form' ? (
          <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 py-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-2xl font-medium tracking-tight text-zinc-950 sm:text-3xl">
                {isSignup ? 'Cria a tua conta' : 'Bem-vindo de volta'}
              </h1>
              <p className="text-[15px] text-zinc-600">
                {isSignup
                  ? 'Cria a tua conta e começa a comprar, vender ou trocar o teu iPhone.'
                  : 'Entra na tua conta para continuares a comprar, vender ou trocar o teu iPhone.'}
              </p>
            </div>

            <button
              type="button"
              className="flex h-12 cursor-pointer items-center justify-center gap-3 rounded-full border-2 border-zinc-200 text-[15px] font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
            >
              <GoogleIcon />
              Continuar com a Google
            </button>

            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span className="h-px flex-1 bg-zinc-200" />
              ou
              <span className="h-px flex-1 bg-zinc-200" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className={inputClass}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Endereço de e-mail"
                  className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-500"
                />
              </label>

              {isSignup ? (
                <>
                  <label className={inputClass}>
                    <input
                      type="password"
                      required
                      placeholder="Palavra-passe"
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-500"
                    />
                  </label>
                  <label className={inputClass}>
                    <input
                      type="password"
                      required
                      placeholder="Confirmar palavra-passe"
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-500"
                    />
                  </label>
                </>
              ) : null}

              <button
                type="submit"
                className="h-12 cursor-pointer rounded-lg bg-zinc-950 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
              >
                Continuar
              </button>
            </form>

            <p className="text-center text-xs text-zinc-500">
              Ao continuares, aceitas os nossos{' '}
              <Link
                href="/termos-de-servico"
                className="font-medium underline underline-offset-2 hover:text-zinc-700"
              >
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link
                href="/privacidade"
                className="font-medium underline underline-offset-2 hover:text-zinc-700"
              >
                Política de Privacidade
              </Link>
              .
            </p>

            <p className="text-center text-[15px] text-zinc-700 ">
              {isSignup ? 'Já tens conta?' : 'Ainda não tens conta?'}{' '}
              <button
                type="button"
                onClick={() => setMode(isSignup ? 'entrar' : 'criar')}
                className="font-semibold text-rose-600 underline underline-offset-2 hover:text-rose-700 cursor-pointer"
              >
                {isSignup ? 'Entrar' : 'Criar conta'}
              </button>
            </p>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 py-10">
            <button
              type="button"
              onClick={() => setStep('form')}
              aria-label="Voltar"
              className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100"
            >
              <BackIcon />
            </button>

            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-2xl font-medium tracking-tight text-zinc-950 sm:text-3xl">
                Confirma o teu e-mail
              </h1>
              <p className="text-[15px] text-zinc-600">
                Introduz o código de 6 dígitos que enviámos para{' '}
                <span className="font-semibold text-zinc-950">{email}</span>.
              </p>
            </div>

            <form onSubmit={handleConfirmOtp} className="flex flex-col gap-6">
              <OtpInput value={otp} onChange={setOtp} />

              <button
                type="submit"
                className="h-12 cursor-pointer rounded-lg bg-zinc-950 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
              >
                Confirmar
              </button>
            </form>

            <p className="text-center text-[15px] text-zinc-700">
              Não recebeste o código?{' '}
              <button
                type="button"
                className="font-semibold text-rose-600 underline underline-offset-2 hover:text-rose-700"
              >
                Reenviar
              </button>
            </p>
          </div>
        )}
      </div>

      <div className="relative hidden w-1/5 overflow-hidden lg:block">
        <Image
          src={lifestyleImages.hero}
          alt="iPhone remodelado"
          fill
          sizes="20vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-violet-950/10 to-transparent" />
      </div>
    </main>
  );
}
