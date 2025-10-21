'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BannerTestPage() {
  useEffect(() => {
    document.title = 'Banner Teszt - Szent László Gimnázium';
  }, []);

  return (
    <>
      <Script src="/script.js" strategy="afterInteractive" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/xml.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-expect-error - hljs is loaded from CDN
          if (typeof window !== 'undefined' && window.hljs) {
            // @ts-expect-error - hljs is loaded from CDN
            window.hljs.highlightAll();
          }
        }}
      />

      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Ensure highlight.js styles take precedence */}
        <style jsx global>{`
          .hljs {
            background: #282c34 !important;
            color: #abb2bf !important;
            display: block;
            overflow-x: auto;
            padding: 1em;
          }
          
          .hljs-tag,
          .hljs-name,
          .hljs-attr {
            color: #e06c75 !important;
          }
          
          .hljs-string,
          .hljs-doctag {
            color: #98c379 !important;
          }
          
          .hljs-keyword,
          .hljs-selector-tag,
          .hljs-title {
            color: #c678dd !important;
          }
          
          .hljs-comment,
          .hljs-quote {
            color: #5c6370 !important;
            font-style: italic;
          }
          
          .hljs-literal,
          .hljs-number {
            color: #d19a66 !important;
          }
          
          .hljs-attribute {
            color: #61afef !important;
          }
        `}</style>

        <Header subtitle="Banner Teszt" />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Introduction */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#333C3E] mb-6 font-serif">
              SZLG Adományozás Banner
            </h2>
            <p className="text-[#333C3E]/80 text-lg leading-relaxed">
              Ez az oldal a Szent László Gimnázium adományozási bannerének
              tesztelésére és demonstrálására szolgál. A banner bármely weboldalon
              használható egyszerű beágyazással. Eredeti célja, az iskola többi weboldalán, webes alkalmazásán való esetleges megjelenítés.
            </p>
          </section>

          {/* Usage Card */}
          <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-[#333C3E] mb-4 font-serif">
              Használat
            </h3>
            <p className="text-[#333C3E]/70 mb-6">
              A banner bármely oldalhoz való hozzáadásához egyszerűen illessze be a
              következő script taget a HTML <code className="bg-[#333C3E]/5 px-2 py-1 rounded text-sm font-mono">&lt;head&gt;</code> szakaszába:
            </p>
            
            <div className="bg-[#282c34] border border-[#3e4451] rounded-lg overflow-hidden">
              <pre className="p-4 overflow-x-auto">
                <code className="language-html text-sm">
                  {`<script src="https://adomany.szlg.info/script.js"></script>`}
                </code>
              </pre>
            </div>
          </div>

          {/* Features Card */}
          <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-[#333C3E] mb-6 font-serif">
              Jellemzők
            </h3>
            <ul className="space-y-4 text-[#333C3E]/80">
              <li className="flex gap-3">
                <span className="text-[#333C3E] font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-[#333C3E]">Automatikus eltüntetés:</strong> Miután eltüntették, a banner
                  nem jelenik meg újra azon a böngészőn
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#333C3E] font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-[#333C3E]">Testreszabható tartalom:</strong> A banner tartalma könnyen
                  testreszabható egy helyen, mivel egy központi CDN. A dizájn és a
                  tartalom is az aktuális igényeknek megfelelően módosítható.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#333C3E] font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-[#333C3E]">Reszponzív dizájn:</strong> Alkalmazkodik a mobil és asztali
                  képernyőkhöz
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#333C3E] font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-[#333C3E]">Animációk:</strong> Betöltéskor lefelé csúszik, eltüntetéskor
                  elhalványul
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#333C3E] font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-[#333C3E]">Kattintásra való átirányítás:</strong> A bannerre kattintva (a
                  bezáró gomb kivételével) megnyílik az{' '}
                  <a href="https://adomany.szlg.info" className="text-[#333C3E] underline hover:text-[#333C3E]/70 transition-colors">adomany.szlg.info</a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#333C3E] font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-[#333C3E]">Adószám megjelenítése:</strong> 18014125-1-42
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#333C3E] font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-[#333C3E]">Nincs dependencia:</strong> Tiszta vanilla JavaScript
                </div>
              </li>
            </ul>
          </div>

          {/* Note Card */}
          <div className="bg-[#fff3cd] border-l-4 border-[#ffc107] p-6 rounded-r-lg mb-8">
            <p className="text-[#856404]">
              <strong>Megjegyzés:</strong> A banner egyszeri eltüntetése után a
              státusz a böngésző <code className="bg-[#856404]/10 px-2 py-0.5 rounded text-sm font-mono">localStorage</code> tárolójában kerül
              mentésre, így újratöltéskor vagy visszatéréskor nem jelenik meg újra.
              Ha tesztelni szeretné a banner újra megjelenését, törölje a{' '}
              <code className="bg-[#856404]/10 px-2 py-0.5 rounded text-sm font-mono">szlg-donation-banner-dismissed</code> kulcsot a{' '}
              <code className="bg-[#856404]/10 px-2 py-0.5 rounded text-sm font-mono">localStorage</code>-ból, vagy használjon inkognitó módot.
            </p>
          </div>

          {/* Test Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#333C3E] mb-6 font-serif">
              Tesztelés
            </h2>
            <p className="text-[#333C3E]/80 text-lg leading-relaxed mb-6">
              Kattintson az alábbi gombra a banner újra megjelenítéséhez:
            </p>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('szlg-donation-banner-dismissed');
                  window.location.reload();
                }
              }}
              className="bg-[#333C3E] hover:bg-[#333C3E]/90 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              Törlés és újratöltés
            </button>
          </section>
        </div>

        <Footer />
      </main>

      <Script id="highlight-init" strategy="lazyOnload">
        {`
          if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
          }
        `}
      </Script>
    </>
  );
}
