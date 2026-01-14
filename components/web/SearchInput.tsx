import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

export const SearchInput = ({ mobile = false }: { mobile?: boolean }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const results = useQuery(
    api.post.searchPosts,
    searchTerm.length >= 2 ? { limit: 5, term: searchTerm } : 'skip'
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search blog..."
          className={`pl-9 pr-4 py-2 text-sm rounded-md border border-input bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
            mobile ? 'w-full' : 'w-48'
          }`}
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (searchTerm.length >= 2) setOpen(true);
          }}
        />
      </div>
      {open && searchTerm.length >= 2 && (
        <div
          className={`
          absolute top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 z-50
          ${mobile ? 'left-0 right-0 mx-2' : 'w-64'}
        `}
        >
          {results === undefined ? (
            <div className="flex items-center gap-2 p-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm">No results found!</p>
          ) : (
            <div className="py-1 max-h-64 overflow-y-auto">
              {results.map(post => (
                <Link
                  key={post._id}
                  href={`/blog/${post._id}`}
                  className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => {
                    setOpen(false);
                    setSearchTerm('');
                  }}
                >
                  <p className="font-medium truncate">{post.title}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
