'use client';

import { Inter } from 'next/font/google';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <div className='flex flex-col min-h-screen'>
          <header className='sticky top-0 z-40 w-full border-b bg-background'>
            <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
              <div className='flex gap-6 md:gap-10'>
                <a href='/' className='flex items-center space-x-2'>
                  <span className='inline-block font-bold'>My Blog</span>
                </a>
              </div>
              <div className='flex flex-1 items-center justify-end space-x-4'>
                <nav className='flex items-center space-x-1'>
                  <Button
                    variant='ghost'
                    size='icon'
                    aria-label='Toggle theme'
                    className='w-9 px-0'
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>Toggle theme</span>
                  </Button>
                </nav>
              </div>
            </div>
          </header>
          <div className='flex-1'>{children}</div>
          <footer className='border-t'>
            <div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
              <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
                <p className='text-center text-sm leading-loose md:text-left'>
                  Built by Your Name. The source code is available on GitHub.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
