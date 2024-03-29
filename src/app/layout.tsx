import './globals.css';

import Link from 'next/link';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/Toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Short It',
  description: 'Shorten your URLs with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={
          poppins.className +
          ' flex min-h-screen flex-col items-center p-24 bg-dots bg-[#313434] text-white gap-y-96'
        }
      >
        <Link href='/'>
          <h1 className='md:text-6xl font-bold text-5xl'>Short - It</h1>
        </Link>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
