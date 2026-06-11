/**
 * Official Barion Smart Payment Banner (light mode) shown next to every
 * checkout / donation entry point, per the Barion Smart Payment Banner
 * Developer Guidelines (Oct 2025).
 *
 * The banner is the unmodified official asset bundled in `public/`. We render
 * it with a plain <img> tag so the browser preserves its intrinsic aspect
 * ratio (no stretching, cropping, or distortion), and we let it scale down on
 * smaller viewports while keeping the required ≥8px of breathing room.
 */
export default function PaymentMethods({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex justify-center p-2 ${className}`}
      aria-label="Elfogadott fizetési módok"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/barion-smart-banner-light.svg"
        alt="Barion – elfogadott fizetési módok: Visa, Mastercard, Maestro, American Express, Apple Pay, Google Pay"
        width={567}
        height={108}
        className="block h-auto w-full max-w-[567px]"
      />
    </div>
  );
}

