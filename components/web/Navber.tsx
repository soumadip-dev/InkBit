'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { ThemeToggle } from './theme-toggle';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2, Search, Menu, X } from 'lucide-react';

const Navber = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight">
              Ink<span className="text-primary">Bit</span>
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 ml-6 md:flex">
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
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-2">
          {/* Search Box - Only shows when authenticated */}
          {isAuthenticated && !isLoading && (
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search blog..."
                  className="pl-9 pr-4 py-2 w-48 text-sm rounded-md border border-input bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  disabled
                />
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center px-4">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-2">
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
            </div>
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

        {/* Mobile Menu Button and Icons */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Search Icon - Only shows when authenticated */}
          {isAuthenticated && !isLoading && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => toast.info('Search functionality coming soon!')}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}

          {/* Mobile Theme Toggle */}
          <div className="border-r pr-2">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top-5 duration-300">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {/* Mobile Navigation Links */}
            <Link
              href="/"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-all duration-200 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-all duration-200 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/create"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-all duration-200 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t">
              {isLoading ? (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full cursor-pointer border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200"
                    onClick={() => {
                      authClient.signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            toast.success('Signed out successfully');
                            router.push('/');
                            setIsMobileMenuOpen(false);
                          },
                          onError: error => {
                            toast.error(error.error?.message);
                          },
                        },
                      });
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/auth/sign-in"
                    className={buttonVariants({
                      variant: 'outline',
                      size: 'sm',
                      className: 'w-full rounded-md transition-all duration-200',
                    })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className={buttonVariants({
                      size: 'sm',
                      className: 'w-full rounded-md transition-all duration-200 hover:shadow-md',
                    })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navber;
