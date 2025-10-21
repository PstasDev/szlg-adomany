import { NextResponse } from 'next/server';

export async function GET() {
  const script = `
(function() {
  'use strict';
  
  // Check if banner was already dismissed
  const STORAGE_KEY = 'szlg-donation-banner-dismissed';
  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    return;
  }
  
  // Create banner HTML
  const bannerHTML = \`
    <div id="szlg-donation-banner" style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999999;
      background: linear-gradient(135deg, #333C3E 0%, #4a5658 100%);
      color: white;
      padding: 12px 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Arial, sans-serif;
      animation: szlgSlideDown 0.4s ease-out;
    ">
      <style>
        @keyframes szlgSlideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes szlgFadeOut {
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        #szlg-donation-banner.szlg-dismissing {
          animation: szlgFadeOut 0.3s ease-out forwards;
        }
        @media (max-width: 640px) {
          #szlg-donation-banner {
            padding: 10px 15px !important;
          }
          #szlg-banner-content {
            flex-direction: column !important;
            gap: 8px !important;
          }
          #szlg-banner-text {
            font-size: 13px !important;
          }
          #szlg-banner-logo {
            width: 32px !important;
            height: 32px !important;
          }
        }
      </style>
      <div id="szlg-banner-content" style="
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      ">
        <a href="https://adomany.szlg.info" target="_blank" rel="noopener noreferrer" style="
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: white;
          flex: 1;
          min-width: 0;
        ">
          <img id="szlg-banner-logo" src="https://adomany.szlg.info/logo.svg" alt="SZLG Logo" width="40" height="40" style="
            flex-shrink: 0;
            filter: brightness(0) invert(1);
            object-fit: contain;
          " />
          <div style="flex: 1; min-width: 0;">
            <div id="szlg-banner-text" style="
              font-size: 15px;
              font-weight: 600;
              margin-bottom: 2px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            ">
              Szükségünk van a támogatására!
            </div>
            <div style="
              font-size: 12px;
              opacity: 0.9;
              font-family: 'Courier New', monospace;
            ">
              Adószám: 18014125-1-42
            </div>
          </div>
        </a>
        <button id="szlg-dismiss-btn" style="
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          transition: background 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
          Bezárás
        </button>
      </div>
    </div>
  \`;
  
  // Wait for DOM to be ready
  function init() {
    // Insert banner at the beginning of body
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = bannerHTML;
    const banner = tempDiv.firstElementChild;
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Add padding to body to prevent content from being hidden
    const bannerHeight = banner.offsetHeight;
    const originalPaddingTop = window.getComputedStyle(document.body).paddingTop;
    document.body.style.paddingTop = \`calc(\${originalPaddingTop} + \${bannerHeight}px)\`;
    
    // Handle dismiss button
    const dismissBtn = document.getElementById('szlg-dismiss-btn');
    dismissBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Add dismissing class for animation
      banner.classList.add('szlg-dismissing');
      
      // Wait for animation to complete
      setTimeout(function() {
        banner.remove();
        document.body.style.paddingTop = originalPaddingTop;
        localStorage.setItem(STORAGE_KEY, 'true');
      }, 300);
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
`;

  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
