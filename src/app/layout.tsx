import type { Metadata } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from './providers';

const nanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: '냠냠로그',
  description: '식품 영양 성분 검색 및 식단 관리 사이트'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${nanumGothic.className} antialiased`}>
        <Header />
        <Providers>
          <main className="mx-auto max-w-[1200px]">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
