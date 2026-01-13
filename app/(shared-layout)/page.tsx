import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inkbit',
  description: 'Home page of Inkbit',
  keywords: [
    'Inkbit',
    'Web Development',
    'nature',
    'JavaScript',
    'Next.js',
    'React',
    'Programming',
    'Soumadip Majila',
    'Tech Articles',
  ],
  authors: [{ name: 'Soumadip Majila' }],
  creator: 'Soumadip Majila',
  publisher: 'Soumadip Majila',

  category: 'Technology',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};
export default function Home() {
  return (
    <div>
      <h1>Heloo from index page</h1>
    </div>
  );
}
