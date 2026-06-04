'use client';

import Link from 'next/link';
import { useState } from 'react';

import PaymentMethods from '../../components/PaymentMethods';
import { createDonation, formatHuf } from '../../lib/adomany';
import type {
  DonationType,
  Relationship,
} from '../../lib/adomany-types';

const PRESET_AMOUNTS = [1000, 5000, 10000, 25000];

const RELATIONSHIP_OPTIONS: { value: Relationship; label: string }[] = [
  { value: 'undisclosed', label: 'Nem nyilatkozik' },
  { value: 'student', label: 'Jelenlegi diák' },
  { value: 'parent_relative', label: 'Szülő / hozzátartozó' },
  { value: 'ex_student', label: 'Volt diák' },
  { value: 'teacher', label: 'Tanár' },
  { value: 'other', label: 'Egyéb' },
];

interface Props {
  projectSlug?: string;
  projectName?: string;
}

export default function DonateForm({ projectSlug, projectName }: Props) {
  const [amount, setAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donationType, setDonationType] = useState<DonationType>('one_time');
  const [relationship, setRelationship] = useState<Relationship>('undisclosed');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [allowThanks, setAllowThanks] = useState(false);
  const [message, setMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveAmount = customAmount
    ? Math.max(0, Math.floor(Number(customAmount) || 0))
    : amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (effectiveAmount < 100) {
      setError('Az adomány összege legalább 100 Ft kell legyen.');
      return;
    }

    if (!acceptedTerms) {
      setError(
        'Az adományozáshoz el kell fogadnia az Általános Szerződési Feltételeket és az Adatvédelmi Tájékoztatót.',
      );
      return;
    }

    setSubmitting(true);
    try {
      const response = await createDonation({
        project_slug: projectSlug,
        amount: effectiveAmount,
        donation_type: donationType,
        message: message || undefined,
        donor: {
          name: name || undefined,
          email: email || undefined,
          relationship,
          student_name: studentName || undefined,
          allow_thanks: allowThanks,
        },
      });
      window.location.href = response.checkout_url;
    } catch (e) {
      const err = e as Error & {
        detail?: {
          detail?: string;
          barion_error?: string;
          barion_errors?: { ErrorCode?: string; Title?: string; Description?: string }[];
        };
      };
      const first = err.detail?.barion_errors?.[0];
      const apiMsg =
        (first && [first.Title, first.Description].filter(Boolean).join(' – ')) ||
        err.detail?.barion_error ||
        err.detail?.detail ||
        err.message ||
        'Ismeretlen hiba';
      setError(apiMsg);
      setSubmitting(false);
    }
  };

  const needsStudentName =
    relationship === 'student' || relationship === 'parent_relative';

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-[#333C3E]">
      <div>
        <label className="block text-sm font-medium mb-2">Összeg</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {PRESET_AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAmount(a);
                setCustomAmount('');
              }}
              className={`px-3 py-2 rounded border text-sm font-medium transition-colors ${
                !customAmount && amount === a
                  ? 'bg-[#333C3E] text-white border-[#333C3E]'
                  : 'bg-white text-[#333C3E] border-[#333C3E]/20 hover:border-[#333C3E]/50'
              }`}
            >
              {formatHuf(a)}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={100}
          step={100}
          placeholder="Egyéb összeg (Ft)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="w-full px-3 py-2 border border-[#333C3E]/20 rounded text-sm focus:outline-none focus:border-[#333C3E]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Típus</label>
        <div className="grid grid-cols-2 gap-2">
          {(['one_time', 'monthly'] as DonationType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setDonationType(t)}
              className={`px-3 py-2 rounded border text-sm font-medium transition-colors ${
                donationType === t
                  ? 'bg-[#333C3E] text-white border-[#333C3E]'
                  : 'bg-white text-[#333C3E] border-[#333C3E]/20 hover:border-[#333C3E]/50'
              }`}
            >
              {t === 'one_time' ? 'Egyszeri' : 'Havi rendszeres'}
            </button>
          ))}
        </div>
      </div>

      <details className="border border-[#333C3E]/10 rounded p-3" open>
        <summary className="cursor-pointer text-sm font-medium text-[#333C3E]/80">
          Adományozó adatai (opcionális)
        </summary>
        <div className="mt-3 space-y-3">
          <p className="text-xs text-[#333C3E]/60">
            Adatait kizárólag arra használjuk, hogy megköszönjük az
            adományát. Az adományozás teljesen anonim is lehet — minden
            mező opcionális.
          </p>

          <label className="block text-sm">
            Kapcsolat
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value as Relationship)}
              className="mt-1 w-full px-3 py-2 border border-[#333C3E]/20 rounded text-sm bg-white"
            >
              {RELATIONSHIP_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            Diák neve
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder={
                needsStudentName
                  ? 'Pl. Kovács Anna'
                  : 'Pl. Kovács Anna (ha valakit szeretne megnevezni)'
              }
              className="mt-1 w-full px-3 py-2 border border-[#333C3E]/20 rounded text-sm"
            />
          </label>

          <label className="block text-sm">
            Név
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Az Ön neve"
              className="mt-1 w-full px-3 py-2 border border-[#333C3E]/20 rounded text-sm"
            />
          </label>

          <label className="block text-sm">
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pelda@email.hu"
              className="mt-1 w-full px-3 py-2 border border-[#333C3E]/20 rounded text-sm"
            />
          </label>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={allowThanks}
              onChange={(e) => setAllowThanks(e.target.checked)}
              className="mt-1"
            />
            <span>Engedélyezem, hogy megköszönő üzenetet küldjenek.</span>
          </label>

          <label className="block text-sm">
            Üzenet (opcionális)
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Pl. „Csak az F!”"
              className="mt-1 w-full px-3 py-2 border border-[#333C3E]/20 rounded text-sm"
            />
          </label>
        </div>
      </details>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">
          {error}
        </div>
      )}

      <div
        className={`rounded p-3 border text-sm transition-colors ${
          acceptedTerms
            ? 'border-[#333C3E]/15 bg-white'
            : 'border-amber-300 bg-amber-50'
        }`}
      >
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1"
            required
            aria-required
          />
          <span>
            Elolvastam és elfogadom az{' '}
            <Link
              href="/aszf"
              target="_blank"
              className="underline font-medium"
            >
              Általános Szerződési Feltételeket
            </Link>{' '}
            és az{' '}
            <Link
              href="/adatvedelem"
              target="_blank"
              className="underline font-medium"
            >
              Adatvédelmi Tájékoztatót
            </Link>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting || effectiveAmount < 100 || !acceptedTerms}
        className="w-full bg-[#333C3E] hover:bg-[#333C3E]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-3 rounded transition-colors"
      >
        {submitting
          ? 'Átirányítás…'
          : `${formatHuf(effectiveAmount)} adományozása${
              donationType === 'monthly' ? ' havonta' : ''
            }${projectName ? ` – ${projectName}` : ''}`}
      </button>

      <p className="text-xs text-[#333C3E]/50 text-center">
        A fizetést a Barion biztonságos felületén bonyolítjuk.
      </p>

      <PaymentMethods className="pt-2" />
    </form>
  );
}
