/**
 * Accepted payment methods strip required by Barion to display on every
 * checkout / donation page.
 *
 * Uses plain <img> tags (instead of next/image) so that the browser preserves
 * the intrinsic aspect ratio of each SVG/PNG — next/image was occasionally
 * squishing the accepted-cards strip horizontally.
 */
export default function PaymentMethods({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-3 ${className}`}
      aria-label="Elfogadott fizetési módok"
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="https://secure.barion.com/Content/images/paymentgateway/barion-blue.svg"
        alt="Barion"
        style={{ height: '28px', width: 'auto' }}
        className="block"
      />
      <img
        src="https://secure.barion.com/Content/images/paymentgateway/accepted-cards-2025.png"
        alt="Elfogadott kártyák: Visa, Mastercard, Maestro, American Express"
        style={{ height: '28px', width: 'auto' }}
        className="block"
      />
      <img
        src="https://secure.barion.com/Content/images/paymentgateway/google-pay.svg"
        alt="Google Pay"
        style={{ height: '28px', width: 'auto' }}
        className="block"
      />
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
}

