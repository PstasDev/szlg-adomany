'use client';

import Script from 'next/script';

/**
 * Base Barion Pixel — required by Barion to approve the shop for live
 * payments (fraud prevention). Renders only when NEXT_PUBLIC_BARION_PIXEL_ID
 * is configured.
 *
 * Docs: https://docs.barion.com/Pixel_-_Base
 */
export default function BarionPixel() {
  const pixelId = process.env.NEXT_PUBLIC_BARION_PIXEL_ID;
  if (!pixelId) return null;

  return (
    <>
      <Script id="barion-pixel" strategy="afterInteractive">
        {`
(function(b,a,r,i,o,n){
  b[a]=b[a]||function(){(b[a].q=b[a].q||[]).push(arguments)};
  n=document.createElement(r);n.async=1;n.src=i;
  o=document.getElementsByTagName(r)[0];o.parentNode.insertBefore(n,o);
})(window,'bp','script','https://pixel.barion.com/bp.js');
bp('init', 'addBarionPixelId', '${pixelId}');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt="Barion Pixel"
          src={`https://pixel.barion.com/a.gif?ba_pixel_id=${pixelId}&ev=contentView&noscript=1`}
        />
      </noscript>
    </>
  );
}
