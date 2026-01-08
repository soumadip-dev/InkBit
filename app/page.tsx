import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Heloo from index page</h1>
      <Link href="/contact" className="cursor-pointer">
        Contact
      </Link>
    </div>
  );
}
