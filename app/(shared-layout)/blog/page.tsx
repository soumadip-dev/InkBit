import { getPostsAction } from '@/app/action';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const dynamic = 'force-static';
export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Blog | Inkbit',
  description: 'Read in-depth articles, tutorials, and insights.',

  keywords: [
    'Inkbit',
    'Blog',
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
    title: 'Blog | Inkbit',
    description: 'Read in-depth articles, tutorials, and insights.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Inkbit',
  },
  twitter: {
    title: 'Blog | Inkbit',
    description: 'Read in-depth articles, tutorials, and insights.',
    card: 'summary_large_image',
    site: '@Inkbit',
    creator: '@Inkbit',
  },
};

export default function BlogPage() {
  return (
    <div className="py-8 md:py-12">
      <div className="text-center mb-8 md:mb-10 px-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight lg:text-4xl mb-2 md:mb-3">
          Our Blog
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Insights, thoughts, and trends from our community
        </p>
      </div>
      <Suspense fallback={<SkeletonBlogList />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

async function LoadBlogList() {
  const renderContent = (html: string) => {
    return (
      <div
        className="prose prose-base md:prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };
  const posts = await getPostsAction();
  return (
    <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {posts.map(post => (
        <Card
          key={post._id}
          className="flex flex-col pt-0 shadow-md hover:shadow-lg transition-shadow duration-200 h-full"
        >
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={
                post.imageUrl ??
                'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D'
              }
              alt={post.title || 'Blog post image'}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <CardContent className="flex-1 p-6">
            <Link href={`/blog/${post._id}`}>
              <h1 className="text-xl md:text-2xl font-bold hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h1>
            </Link>
            <div className="text-muted-foreground line-clamp-3 mt-3">
              {renderContent(post.body)}
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Link
              className={buttonVariants({
                className: 'w-full',
              })}
              href={`/blog/${post._id}`}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function SkeletonBlogList() {
  return (
    <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {[...Array(3)].map((_, i) => (
        <div className="flex flex-col space-y-3 md:space-y-4" key={i}>
          <Skeleton className="h-48 w-full rounded-t-lg" />
          <div className="space-y-2 md:space-y-3 flex flex-col p-6">
            <Skeleton className="h-6 md:h-7 w-3/4" />
            <Skeleton className="h-4 md:h-5 w-full" />
            <Skeleton className="h-4 md:h-5 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
