import type { Metadata } from 'next';
import './globals.css';
import { DNAProvider } from '@/context/DNAContext';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Creator OS — Your Personal AI Creative Studio',
  description:
    'From a random idea or viral link to a creative masterpiece. AI handles the workflow. Humans own the creativity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#07080F] text-white antialiased font-sans">
        <DNAProvider>
          <Header />
          <Sidebar />
          <main className="ml-64 mt-16 min-h-screen bg-[#07080F] p-8">
            {children}
          </main>
        </DNAProvider>
      </body>
    </html>
  );
}
