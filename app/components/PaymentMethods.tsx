import Image from 'next/image';

/**
 * Accepted payment methods strip required by Barion to display on every
 * checkout / donation page.
 */
export default function PaymentMethods({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 ${className}`}
      aria-label="Elfogadott fizetési módok"
    >
      <Image
        src="https://secure.barion.com/Content/images/paymentgateway/barion-blue.svg"
        alt="Barion"
        width={80}
        height={26}
        unoptimized
        className="h-7 w-auto"
      />
      <Image
        src="https://secure.barion.com/Content/images/paymentgateway/accepted-cards-2025.png"
        alt="Elfogadott kártyák: Visa, Mastercard, Maestro, American Express"
        width={220}
        height={26}
        unoptimized
        className="h-7 w-auto"
      />
      <Image
        src="https://secure.barion.com/Content/images/paymentgateway/google-pay.svg"
        alt="Google Pay"
        width={56}
        height={26}
        unoptimized
        className="h-7 w-auto"
      />
    </div>
  );
}
