import Navber from '@/components/web/Navber';
import { ConvexClientProvider } from '@/components/web/ConvexClientProvider';
import { Toaster } from '@/components/ui/sonner';

export default function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navber />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-6">{children}</main>
      <Toaster closeButton />
    </div>
  );
}
