import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Personal Blog',
  description: 'A blog built with Next.js 15 and MDX',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <header className='bg-gray-800 text-white p-4'>
          <div className='max-w-2xl mx-auto'>
            <h1 className='text-2xl font-bold'>My Personal Blog</h1>
          </div>
        </header>
        <main className='my-8'>{children}</main>
        <footer className='bg-gray-200 p-4 text-center'>
          <div className='max-w-2xl mx-auto'>
            © {new Date().getFullYear()} My Personal Blog
          </div>
        </footer>
      </body>
    </html>
  );
}
