import { Metadata } from 'next';
import SignInForm from './SignInForm';

export const metadata: Metadata = {
  title: 'Sign In | Inkbit',
  description: 'Sign in to your account',
  keywords: ['Inkbit', 'Sign In', 'Account', 'Authentication'],
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
    title: 'Sign In | Inkbit',
    description: 'Sign in to your account',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Inkbit',
  },
  twitter: {
    title: 'Sign In | Inkbit',
    description: 'Sign in to your account',
    card: 'summary_large_image',
    site: '@Inkbit',
    creator: '@Inkbit',
  },
};

const SignInPage = () => {
  return <SignInForm />;
};

export default SignInPage;
