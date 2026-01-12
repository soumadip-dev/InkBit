import { getPostsAction } from '@/app/action';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Blog</h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
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
  const posts = await getPostsAction();
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8">
      {posts.map(post => (
        <Card key={post._id} className="flex flex-col pt-0">
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={
                post.imageUrl ??
                'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D'
              }
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="flex-1">
            <Link href={`/blog/${post._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary transition-colors">
                {post.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3 mt-2">{post.body}</p>
          </CardContent>
          <CardFooter>
            <Link className={buttonVariants({ className: 'w-full' })} href={`/blog/${post._id}`}>
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
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
