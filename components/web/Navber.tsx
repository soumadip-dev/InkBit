'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { ThemeToggle } from './theme-toggle';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2, Menu, X } from 'lucide-react';

const Navber = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Signed out successfully');
          router.push('/');
          setIsMenuOpen(false);
        },
        onError: error => {
          toast.error(error.error?.message);
        },
      },
    });
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/create', label: 'Create' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 shadow-sm'
          : 'bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center flex-shrink-0 w-1/5 min-w-0">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <h1 className="text-xl font-bold tracking-tight truncate">
              Ink<span className="text-primary">Bit</span>
            </h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center flex-1 max-w-3xl mx-auto">
          <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                  className:
                    'px-4 rounded-md hover:bg-background hover:text-foreground transition-all duration-200 font-medium',
                })}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 flex-shrink-0 w-1/5 min-w-0">
          <div className="hidden md:flex items-center gap-2">
            {isLoading ? (
              <div className="flex items-center justify-center px-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200 px-4"
              >
                Sign Out
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/sign-in"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                    className: 'px-4 rounded-md transition-all duration-200',
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
              </div>
            )}
            <div className="ml-2 border-l pl-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <div className="border-r pr-2">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hamburger-button"
              onClick={e => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden mobile-menu fixed inset-x-0 top-16 z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
        style={{
          maxHeight: 'calc(100vh - 4rem)',
          overflowY: 'auto',
        }}
      >
        <div className="border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/95 shadow-lg">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {/* Mobile Navigation Links */}
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({
                  variant: 'ghost',
                  className:
                    'w-full justify-start py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-all duration-200',
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t mt-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-3 px-4">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full justify-start py-3 px-4 cursor-pointer border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/auth/sign-in"
                    className={buttonVariants({
                      variant: 'outline',
                      className: 'w-full justify-start py-3 px-4 transition-all duration-200',
                    })}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className={buttonVariants({
                      className:
                        'w-full justify-start py-3 px-4 transition-all duration-200 hover:shadow-md',
                    })}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-black/20 -z-10 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navber;
