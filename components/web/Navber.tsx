'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { ThemeToggle } from './theme-toggle';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Navber = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <nav className="w-full py-5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-xl font-semibold">
              Ink<span className="text-primary">Bit</span>
            </h1>
          </Link>
        </div>

        {/* Navigation links */}
        <div className="flex items-center gap-2">
          <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
            Home
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: 'ghost' })}>
            Blog
          </Link>
          <Link href="/create" className={buttonVariants({ variant: 'ghost' })}>
            Create
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          {isLoading ? null : isAuthenticated ? (
            <Button
              className="cursor-pointer"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success('Signed out successfully');
                      router.push('/');
                    },
                    onError: error => {
                      toast.error(error.error?.message);
                    },
                  },
                })
              }
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link href="/auth/sign-up" className={buttonVariants()}>
                Sign Up
              </Link>
              <Link href="/auth/sign-in" className={buttonVariants({ variant: 'secondary' })}>
                Sign In
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navber;
