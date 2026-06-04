'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDonationStatus, formatHuf } from '../../lib/adomany';
import type { DonationStatus } from '../../lib/adomany-types';

type UiState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'pending'; data: DonationStatus }
  | { kind: 'succeeded'; data: DonationStatus }
  | { kind: 'failed'; data: DonationStatus }
  | { kind: 'unknown' }
  | { kind: 'error'; message: string };

const POLL_INTERVAL_MS = 2000;
const MAX_POLLS = 15; // ~30s

export default function SuccessPage() {
  const search = useSearchParams();
  const paymentId =
    search.get('paymentId') || search.get('session_id') || '';

  const [state, setState] = useState<UiState>(
    paymentId ? { kind: 'loading' } : { kind: 'unknown' },
  );
  const pollsRef = useRef(0);

  useEffect(() => {
    if (!paymentId) {
      setState({ kind: 'unknown' });
      return;
    }

    let cancelled = false;
    pollsRef.current = 0;

    const run = async () => {
      while (!cancelled) {
        pollsRef.current += 1;
        try {
          const data = await getDonationStatus(paymentId);
          if (cancelled) return;

          if (data.status === 'succeeded') {
            setState({ kind: 'succeeded', data });
            return;
          }
          if (
            data.status === 'failed' ||
            data.status === 'canceled' ||
            data.status === 'refunded'
          ) {
            setState({ kind: 'failed', data });
            return;
          }

          // still pending
          setState({ kind: 'pending', data });
          if (pollsRef.current >= MAX_POLLS) return;
          await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        } catch (e) {
          if (cancelled) return;
          setState({
            kind: 'error',
            message: e instanceof Error ? e.message : 'Ismeretlen hiba',
          });
          return;
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [paymentId]);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Adomány állapota" />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white border border-[#333C3E]/10 rounded-lg p-10 shadow-sm text-center">
          <StateView state={state} />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/projektek"
              className="bg-[#333C3E] hover:bg-[#333C3E]/90 text-white font-medium px-5 py-2.5 rounded transition-colors"
            >
              Vissza a projektekhez
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

function StateView({ state }: { state: UiState }) {
  if (state.kind === 'idle' || state.kind === 'loading') {
    return (
      <>
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#333C3E]/5 flex items-center justify-center">
          <span
            aria-hidden
            className="w-6 h-6 border-2 border-[#333C3E]/30 border-t-[#333C3E] rounded-full animate-spin"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
          Adomány feldolgozása…
        </h1>
        <p className="text-[#333C3E]/80 leading-relaxed">
          Egy pillanat, ellenőrizzük a fizetés állapotát.
        </p>
      </>
    );
  }

  if (state.kind === 'succeeded') {
    return (
      <>
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl">
          ✓
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
          Sikeres adomány — köszönjük!
        </h1>
        <div className="text-[#333C3E]/80 leading-relaxed space-y-2">
          <p>
            <strong>{formatHuf(state.data.amount)}</strong> –{' '}
            {state.data.donation_type === 'monthly'
              ? 'havi rendszeres'
              : 'egyszeri'}{' '}
            adomány sikeresen feldolgozva.
          </p>
        </div>
      </>
    );
  }

  if (state.kind === 'pending') {
    return (
      <>
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#333C3E]/5 flex items-center justify-center">
          <span
            aria-hidden
            className="w-6 h-6 border-2 border-[#333C3E]/30 border-t-[#333C3E] rounded-full animate-spin"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
          Feldolgozás alatt
        </h1>
        <p className="text-[#333C3E]/80 leading-relaxed">
          A fizetés megerősítése néhány másodpercet vehet igénybe. Ezt az
          oldalt nem kell frissítenie — automatikusan frissül.
        </p>
      </>
    );
  }

  if (state.kind === 'failed') {
    return (
      <>
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-3xl">
          ✕
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
          Az adomány nem teljesült
        </h1>
        <p className="text-[#333C3E]/80 leading-relaxed">
          A fizetés állapota:{' '}
          <strong>
            {state.data.status === 'canceled'
              ? 'megszakítva'
              : state.data.status === 'refunded'
                ? 'visszatérítve'
                : 'sikertelen'}
          </strong>
          . Nem történt sikeres tranzakció.
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
          Nem tudtuk lekérdezni a fizetés állapotát
        </h1>
        <p className="text-[#333C3E]/80 leading-relaxed text-sm">
          {state.message}
        </p>
      </>
    );
  }

  // unknown — no paymentId
  return (
    <>
      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#333C3E]/5 flex items-center justify-center text-3xl text-[#333C3E]">
        ✓
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
        Köszönjük az adományát!
      </h1>
      <p className="text-[#333C3E]/80 leading-relaxed">
        Hozzájárulása rövidesen feldolgozásra kerül. Köszönjük, hogy
        támogatta iskolánkat!
      </p>
    </>
  );
}
