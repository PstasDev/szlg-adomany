import Link from 'next/link';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Adományozás megszakítva - Szent László Gimnázium',
};

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Adományozás megszakítva" />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white border border-[#333C3E]/10 rounded-lg p-10 shadow-sm text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif mb-4">
            Az adományozás megszakadt
          </h1>
          <p className="text-[#333C3E]/80 leading-relaxed">
            Nem történt levonás. Ha mégis szeretne támogatni minket, próbálja
            újra bármikor.
          </p>

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
