import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-blue-700">PostaTodoDia</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/dashboard">Dashboard</Link><Link href="/gerar">Gerar</Link><Link href="/historico">Histórico</Link>
        </nav>
      </div>
    </header>
  );
}
