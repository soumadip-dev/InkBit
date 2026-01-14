import Navber from '@/components/web/Navber';

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navber />
      {children}
    </>
  );
}
