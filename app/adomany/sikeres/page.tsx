import Link from 'next/link';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDonationStatus, formatHuf } from '../../lib/adomany';
import type { DonationStatus } from '../../lib/adomany-types';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ paymentId?: string; session_id?: string }>;
}

export const metadata = {
  title: 'Köszönjük az adományát - Szent László Gimnázium',
};

async function fetchStatus(paymentId?: string): Promise<DonationStatus | null> {
  if (!paymentId) return null;
  try {
    return await getDonationStatus(paymentId);
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  // Barion appends ?paymentId=... to the RedirectUrl. Keep the old
  // session_id fallback so any in-flight Stripe links still work.
  const paymentId = params.paymentId ?? params.session_id;
  const status = await fetchStatus(paymentId);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Köszönjük az adományát" />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white border border-[#333C3E]/10 rounded-lg p-10 shadow-sm text-center">
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#333C3E]/5 flex items-center justify-center text-3xl text-[#333C3E]">
            ✓
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
            Köszönjük az adományát!
          </h1>

          {status ? (
            <div className="text-[#333C3E]/80 leading-relaxed space-y-2">
              <p>
                <strong>{formatHuf(status.amount)}</strong> –{' '}
                {status.donation_type === 'monthly' ? 'havi rendszeres' : 'egyszeri'}{' '}
                adomány.
              </p>
              <p className="text-sm text-[#333C3E]/60">
                Állapot:{' '}
                {status.status === 'succeeded'
                  ? 'sikeresen feldolgozva'
                  : status.status === 'pending'
                  ? 'feldolgozás alatt – a megerősítés néhány másodperc múlva érkezhet meg'
                  : status.status}
              </p>
            </div>
          ) : (
            <p className="text-[#333C3E]/80 leading-relaxed">
              Hozzájárulása rövidesen feldolgozásra kerül. Köszönjük, hogy
              támogatta iskolánkat!
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
