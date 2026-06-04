'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { cancelDonation } from '../../lib/adomany';

type State =
  | { kind: 'idle' }
  | { kind: 'updating' }
  | { kind: 'canceled' }
  | { kind: 'already-succeeded' }
  | { kind: 'error'; message: string };

export default function CancelClient() {
  const search = useSearchParams();
  const paymentId =
    search.get('paymentId') || search.get('session_id') || '';

  const [state, setState] = useState<State>(
    paymentId ? { kind: 'updating' } : { kind: 'idle' },
  );

  useEffect(() => {
    if (!paymentId) {
      setState({ kind: 'idle' });
      return;
    }

    let cancelled = false;
    setState({ kind: 'updating' });

    cancelDonation(paymentId)
      .then((data) => {
        if (cancelled) return;
        if (data.status === 'succeeded') {
          setState({ kind: 'already-succeeded' });
        } else {
          setState({ kind: 'canceled' });
        }
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setState({
          kind: 'error',
          message: e instanceof Error ? e.message : 'Ismeretlen hiba',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [paymentId]);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Adományozás megszakítva" />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white border border-[#333C3E]/10 rounded-lg p-10 shadow-sm text-center">
          <Body state={state} />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/projektek"
              className="bg-[#333C3E] hover:bg-[#333C3E]/90 text-white font-medium px-5 py-2.5 rounded transition-colors"
            >
              Projektek megtekintése
            </Link>
            <Link
              href="/"
              className="border border-[#333C3E]/20 hover:border-[#333C3E]/50 text-[#333C3E] font-medium px-5 py-2.5 rounded transition-colors"
            >
              Főoldal
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Body({ state }: { state: State }) {
  if (state.kind === 'updating') {
    return (
      <>
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#333C3E]/5 flex items-center justify-center">
          <span
            aria-hidden
            className="w-6 h-6 border-2 border-[#333C3E]/30 border-t-[#333C3E] rounded-full animate-spin"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
          Adományozás állapota frissítése…
        </h1>
      </>
    );
  }

  if (state.kind === 'already-succeeded') {
    return (
      <>
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl">
          ✓
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
          Az adomány valójában sikerült
        </h1>
        <p className="text-[#333C3E]/80 leading-relaxed">
          A Barion sikeres tranzakciót jelez ehhez a fizetéshez, ezért az
          adomány nem lett megszakítva. Köszönjük a támogatást!
        </p>
      </>
    );
  }

  if (state.kind === 'error') {
    return (
      <>
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-3xl">
          !
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
          Az adományozás megszakadt
        </h1>
        <p className="text-[#333C3E]/80 leading-relaxed">
          Nem történt levonás. Az adományozás állapotát nem tudtuk
          automatikusan frissíteni a rendszerünkben.
        </p>
        <p className="text-xs text-[#333C3E]/50 mt-2">{state.message}</p>
      </>
    );
  }

  // canceled or idle (no paymentId)
  return (
    <>
      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-3xl">
        ✕
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
        Az adományozás megszakadt
      </h1>
      <p className="text-[#333C3E]/80 leading-relaxed">
        Nem történt levonás. Ha mégis szeretne támogatni minket, próbálja
        újra bármikor.
      </p>
    </>
  );
}
