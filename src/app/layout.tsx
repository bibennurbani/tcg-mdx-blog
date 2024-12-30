import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Biben Nurbani Hasan Blog',
    template: '%s | Biben Blog',
  },
  description: 'Biben personal blog about web development, technology, and more.',
  keywords: ['blog', 'web development', 'technology'],
  authors: [{ name: 'Biben Nurbani Hasan' }],
  creator: 'Biben Nurbani Hasan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tcglabs.com/',
    siteName: 'Biben Blog',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bibennurbani',
    creator: '@bibennurbani',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header />
          <main className='container mx-auto px-4 py-8'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
