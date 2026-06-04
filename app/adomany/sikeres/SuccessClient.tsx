'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { confirmDonation, formatHuf } from '../../lib/adomany';
import type { DonationStatus } from '../../lib/adomany-types';

export default function SuccessClient() {
  const search = useSearchParams();
  const paymentId =
    search.get('paymentId') || search.get('session_id') || '';

  // The user reaching this page already implies a successful redirect from
  // the Barion gateway, so we always show the "thank you" confirmation
  // immediately. We still ping the backend so it can re-sync the donation's
  // state from Barion and persist it (in case the server-to-server
  // callback hasn't arrived yet). The confirmation UI never depends on
  // the response.
  const [details, setDetails] = useState<DonationStatus | null>(null);

  useEffect(() => {
    if (!paymentId) return;
    let cancelled = false;
    confirmDonation(paymentId)
      .then((data) => {
        if (!cancelled) setDetails(data);
      })
      .catch(() => {
        /* ignore — confirmation UI does not depend on this */
      });
    return () => {
      cancelled = true;
    };
  }, [paymentId]);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Köszönjük az adományát" />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white border border-[#333C3E]/10 rounded-lg p-10 shadow-sm text-center">
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl">
            ✓
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
            Sikeres adomány — köszönjük!
          </h1>

          {details ? (
            <p className="text-[#333C3E]/80 leading-relaxed">
              <strong>{formatHuf(details.amount)}</strong> –{' '}
              {details.donation_type === 'monthly'
                ? 'havi rendszeres'
                : 'egyszeri'}{' '}
              adomány.
            </p>
          ) : (
            <p className="text-[#333C3E]/80 leading-relaxed">
              Hozzájárulása megérkezett. Köszönjük, hogy támogatta iskolánkat!
            </p>
          )}

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
