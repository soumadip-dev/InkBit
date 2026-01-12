import { redirect } from 'next/navigation';
import { getToken } from '@/lib/auth-server';
import CreatePage from './CreatePage';

export default async function Page() {
  const token = await getToken();

  if (!token) {
    redirect('/auth/sign-in');
  }

  return <CreatePage />;
}
