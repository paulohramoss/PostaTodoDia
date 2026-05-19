import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'PostaTodoDia',
  description: 'Gerador de conteúdo para Instagram',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
