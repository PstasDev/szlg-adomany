import type { Metadata } from 'next';
import Link from 'next/link';

import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Általános Szerződési Feltételek – Szent László Gimnázium adományozás',
};

export default function AszfPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Általános Szerződési Feltételek" />

      <article className="max-w-3xl mx-auto px-6 py-12 text-[#333C3E] leading-relaxed space-y-6">
        <h1 className="text-3xl font-serif font-semibold">
          Általános Szerződési Feltételek
        </h1>
        <p className="text-sm text-[#333C3E]/60">
          Hatályos: 2026. június 3-tól.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">1. Szolgáltató adatai</h2>
          <p>
            Jelen weboldal (a továbbiakban: „Weboldal”) üzemeltetője és az
            adományok kedvezményezettje:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Név:</strong> "Összefogás a Szent László Gimnáziumért" Alapítvány
            </li>
            <li>
              <strong>Székhely:</strong> 1102 Budapest, Kőrösi Csoma sétány 28-34. 
            </li>
            <li>
              <strong>Adószám:</strong> 18014125-1-42
            </li>
            <li>
              <strong>E-mail:</strong>{' '}
              <a className="underline" href="mailto:admin@kitegylet.hu">
                titkarsag@szlgbp.hu
              </a>
            </li>
            <li>
              <strong>Telefon:</strong> +36 1 262 3599
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">2. A szolgáltatás tárgya</h2>
          <p>
            A Weboldal célja, hogy a Szent László Gimnázium diákjait és
            projektjeit támogató önkéntes pénzbeli adományokat fogadjon. Az
            adományozó az adomány leadásával kifejezetten elismeri, hogy az
            általa fizetett összeg ellenszolgáltatás nélküli, önkéntes
            hozzájárulás.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">3. Fizetés Barionnal</h2>
          <p>
            Az online bankkártyás fizetések a Barion rendszerén keresztül
            valósulnak meg. A bankkártya adatok a Szolgáltatóhoz nem jutnak
            el. A szolgáltatást nyújtó Barion Payment Zrt. a Magyar Nemzeti
            Bank felügyelete alatt álló intézmény, engedélyének száma:{' '}
            <strong>H-EN-I-1064/2013</strong>.
          </p>
          <p>
            Elfogadott fizetési módok: Visa, Mastercard, Maestro, American
            Express bankkártyák, Barion-egyenleg, valamint Google Pay.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">
            4. Az adomány teljesítése
          </h2>
          <p>
            A sikeres tranzakciót követően a Szolgáltató az adományt
            haladéktalanul jóváírja a kiválasztott projekt javára. Mivel a
            szolgáltatás tárgya nem termék vagy szolgáltatás megvásárlása,
            hanem önkéntes adomány, szállítási vagy teljesítési határidő nem
            értelmezhető; az adomány „teljesítése” az összegnek a Szolgáltató
            Barion-egyenlegén történő jóváírásával bekövetkezik.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">5. Elállás</h2>
          <p>
            Mivel az adományozás önkéntes és ellenszolgáltatás nélküli, a
            Polgári Törvénykönyv és a fogyasztóvédelmi jogszabályok elállási
            jogra vonatkozó szabályai nem alkalmazhatók. Tévedésből indított
            adomány esetén a Szolgáltató a fentebb megadott e-mail címen
            jelzett kérelem alapján méltányosságból visszatérítést
            kezdeményezhet.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">6. Adatkezelés</h2>
          <p>
            A személyes adatok kezelésére vonatkozó részletes tájékoztatót a{' '}
            <Link className="underline" href="/adatvedelem">
              Adatvédelmi Tájékoztató
            </Link>{' '}
            tartalmazza.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">7. Jogviták</h2>
          <p>
            A jelen ÁSZF-re a magyar jog az irányadó. A felek a vitás kérdéseket
            elsősorban békés úton törekszenek rendezni. Ennek eredménytelensége
            esetén a hatáskörrel rendelkező magyar bíróság jár el.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  );
}
