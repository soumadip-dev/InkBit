import SignUpForm from './SignUpForm';

export const metadata = {
  title: 'Inkbit | Sign Up',
  description: 'Sign up to your account',
  keywords: ['Inkbit', 'Sign Up', 'Sign In', 'Login', 'Register'],
  openGraph: {
    title: 'Inkbit | Sign Up',
    description: 'Sign up to your account',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Inkbit',
  },
  twitter: {
    title: 'Inkbit | Sign Up',
    description: 'Sign up to your account',
    card: 'summary_large_image',
    site: '@Inkbit',
    creator: '@Inkbit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  authors: [{ name: 'Soumadip Majila' }],
  creator: 'Soumadip Majila',
  publisher: 'Soumadip Majila',
  category: 'Technology',
};
const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
