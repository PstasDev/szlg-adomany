import type { Metadata } from 'next';
import Link from 'next/link';

import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Adatvédelmi Tájékoztató – Szent László Gimnázium adományozás',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Adatvédelmi Tájékoztató" />

      <article className="max-w-3xl mx-auto px-6 py-12 text-[#333C3E] leading-relaxed space-y-6">
        <h1 className="text-3xl font-serif font-semibold">
          Adatvédelmi Tájékoztató
        </h1>
        <p className="text-sm text-[#333C3E]/60">
          Hatályos: 2026. június 3-tól.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">1. Adatkezelő</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Név:</strong> &bdquo;Összefogás a Szent László Gimnáziumért&rdquo; Alapítvány
            </li>
            <li>
              <strong>Székhely:</strong> 1102 Budapest, Kőrösi Csoma sétány 28-34.
            </li>
            <li>
              <strong>E-mail:</strong>{' '}
              <a className="underline" href="mailto:admin@kitegylet.hu">
                titkarsag@szlgbp.hu
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">
            2. Kezelt adatok köre és célja
          </h2>
          <p>Az adományozás során a következő adatokat kezelhetjük:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>név és e-mail cím – köszönő üzenet küldéséhez (önkéntes),</li>
            <li>
              kapcsolat típusa (diák / szülő / volt diák stb.) – statisztikai
              célból (önkéntes),
            </li>
            <li>
              adomány összege, típusa, kiválasztott projekt – a tranzakció
              végrehajtásához,
            </li>
            <li>
              Barion által generált fizetési azonosítók – a tranzakció
              azonosításához és könyveléshez.
            </li>
          </ul>
          <p>
            A bankkártya- és személyazonosító adatokat a Szolgáltató nem látja
            és nem tárolja; ezek kezelése kizárólag a Barion Payment Zrt.
            rendszerében történik.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">
            3. Az adatkezelés jogalapja
          </h2>
          <p>
            Az adatkezelés jogalapja a GDPR 6. cikk (1) bekezdés a) pontja
            szerinti önkéntes hozzájárulás, valamint b) pontja szerinti
            szerződés teljesítése (a sikeres adományozás technikai
            lebonyolítása).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">
            4. Adatfeldolgozók
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Barion Payment Zrt.</strong> (Budapest, Irinyi József utca 4-20, 1117) – fizetési szolgáltató.
            </li>
            <li>
              Tárhelyszolgáltató, e-mail küldő szolgáltató – a Szolgáltató
              technikai partnerei.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">5. Barion Pixel</h2>
          <p>
            Webhelyünkön a Barion fizetési rendszerhez kapcsolódó kötelező
            csalásmegelőzési eszköz, a <strong>Barion Pixel</strong> alap
            változata fut. A Barion Pixel által gyűjtött adatok kezelésére a
            Barion Payment Zrt. saját adatvédelmi tájékoztatója irányadó.
          </p>
          <p>
            További információ a Barion Pixel{' '}
            <a
              className="underline"
              href="https://www.barion.com/hu/adatvedelmi-tajekoztato/"
              target="_blank"
              rel="noopener noreferrer"
            >
              adatvédelmi tájékoztatójában
            </a>{' '}
            és a{' '}
            <a
              className="underline"
              href="https://cdn.builder.io/o/assets%2F32f148657e2646be8562eb4e6ebfa190%2Ff795ea51fd8046b79f1ac38ae2a602cd?alt=media&token=6da8cb07-4421-46a6-911b-65f4dd80857f"
              target="_blank"
              rel="noopener noreferrer"
            >
              Barion Pixel kiegészítő ÁSZF
            </a>{' '}
            dokumentumban érhető el.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">
            6. Adatmegőrzési idő
          </h2>
          <p>
            A tranzakcióval és adományokkal kapcsolatos adatokat a hatályos
            számviteli jogszabályoknak megfelelően 8 évig őrizzük. A pusztán
            kapcsolattartás céljából megadott adatokat (név, e-mail) az
            adományozó kérésére bármikor töröljük.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">
            7. Az érintett jogai
          </h2>
          <p>
            Önnek joga van tájékoztatást kérni, adatait helyesbíttetni,
            töröltetni, illetve a kezelést korlátozni. Panaszával a Nemzeti
            Adatvédelmi és Információszabadság Hatósághoz (
            <a className="underline" href="https://naih.hu" target="_blank" rel="noopener noreferrer">
              naih.hu
            </a>
            ) fordulhat.
          </p>
        </section>

        <p className="text-sm text-[#333C3E]/60">
          Visszatérés a{' '}
          <Link className="underline" href="/aszf">
            Általános Szerződési Feltételekhez
          </Link>
          .
        </p>
      </article>

      <Footer />
    </main>
  );
}
