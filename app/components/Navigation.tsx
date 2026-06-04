'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Főoldal' },
    { href: '/projektek', label: 'Projektek' },
  ];

  return (
    <nav className="bg-white border-b border-[#333C3E]/10">
      <div className="max-w-4xl mx-auto px-6">
        <ul className="flex gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm font-medium transition-all duration-300 relative group"
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive
                        ? 'text-[#333C3E]'
                        : 'text-[#333C3E]/60 group-hover:text-[#333C3E]'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#333C3E] transition-all duration-300 ease-in-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
