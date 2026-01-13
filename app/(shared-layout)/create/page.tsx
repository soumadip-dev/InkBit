import CreatePage from './CreatePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create | Inkbit',
  description: 'Create a new blog post',
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
  openGraph: {
    title: 'Create | Inkbit',
    description: 'Create a new blog post',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Inkbit',
  },
  twitter: {
    title: 'Create | Inkbit',
    description: 'Create a new blog post',
    card: 'summary_large_image',
    site: '@Inkbit',
    creator: '@Inkbit',
  },
};

export default async function Page() {
  return <CreatePage />;
}
