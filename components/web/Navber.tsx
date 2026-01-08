import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { ThemeToggle } from './theme-toggle';

const Navber = () => {
  return (
    <nav className="w-full py-5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-xl font-semibold">
              Ink<span className="text-blue-500">Bit</span>
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
          <Link href="/auth/sign-up" className={buttonVariants()}>
            Sign Up
          </Link>
          <Link href="/auth/sign-in" className={buttonVariants({ variant: 'secondary' })}>
            Sign In
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navber;
