export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#333C3E]/10">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center text-[#333C3E]/60 text-sm">
        <p>© {new Date().getFullYear()} Szent László Gimnázium</p>
      </div>
    </footer>
  );
}
