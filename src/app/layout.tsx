import './globals.css';

export const metadata = {
  title: 'Next App',
  description: 'Nextjs + tailwindcss + typescript + prisma'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">{children}</body>
    </html>
  );
}
