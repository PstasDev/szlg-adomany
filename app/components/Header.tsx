import Image from 'next/image';
import Navigation from './Navigation';

interface HeaderProps {
  subtitle?: string;
}

export default function Header({ subtitle = 'Adományozás' }: HeaderProps) {
  return (
    <>
      <header className="border-b border-[#333C3E]/10">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center gap-6">
          <div className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Szent László Gimnázium"
              width={80}
              height={80}
              priority
              className="w-16 h-16 md:w-20 md:h-20"
              style={{ filter: 'brightness(0) saturate(100%) invert(19%) sepia(9%) saturate(879%) hue-rotate(137deg) brightness(95%) contrast(91%)' }}
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#333C3E] font-serif">
              Szent László Gimnázium
            </h1>
            <p className="text-[#333C3E]/70 mt-1">{subtitle}</p>
          </div>
        </div>
      </header>
      <Navigation />
    </>
  );
}
