import { Suspense } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CancelClient from './CancelClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Adományozás megszakítva - Szent László Gimnázium',
};

export default function CancelPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FAFAFA]">
          <Header subtitle="Adományozás megszakítva" />
          <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="bg-white border border-[#333C3E]/10 rounded-lg p-10 shadow-sm text-center text-[#333C3E]/70">
              Betöltés…
            </div>
          </div>
          <Footer />
        </main>
      }
    >
      <CancelClient />
    </Suspense>
  );
}
