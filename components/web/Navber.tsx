'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { ThemeToggle } from './theme-toggle';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const Navber = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight">
              Ink<span className="text-primary">Bit</span>
            </h1>
          </Link>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'px-3 rounded-md hover:bg-accent transition-all duration-200',
            })}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'px-3 rounded-md hover:bg-accent transition-all duration-200',
            })}
          >
            Blog
          </Link>
          <Link
            href="/create"
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'px-3 rounded-md hover:bg-accent transition-all duration-200',
            })}
          >
            Create
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center justify-center px-4">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200"
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
              <Link
                href="/auth/sign-in"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                  className: 'px-3 rounded-md transition-all duration-200',
                })}
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className={buttonVariants({
                  size: 'sm',
                  className: 'px-4 rounded-md transition-all duration-200 hover:shadow-md',
                })}
              >
                Sign Up
              </Link>
            </>
          )}
          <div className="ml-2 border-l pl-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
