import localFont from 'next/font/local';

import type {Metadata} from 'next';

import '@/styles/globals.scss';

const Pretendard = localFont({
  src: '../styles/fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  title: 'Mandi',
  description: 'Mandi',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#ffffff',
  viewport:
    'minimum-scale=1, initial-scale=1, maximum-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover user-scalable=no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={Pretendard.className}>{children}</body>
    </html>
  );
}
