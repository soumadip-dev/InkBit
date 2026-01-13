import { getPostByIdAction } from '@/app/action';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CommentSection } from '@/components/web/CommentSection';
import PostPresence from '@/components/web/PostPresence';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { getToken } from '@/lib/auth-server';
import { fetchQuery, preloadQuery } from 'convex/nextjs';
import { ArrowLeft, Calendar, Eye, Users } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface PostIdRouteProps {
  params: Promise<{
    postId: Id<'posts'>;
  }>;
}

export async function generateMetadata({ params }: PostIdRouteProps): Promise<Metadata> {
  const { postId } = await params;

  const post = await getPostByIdAction(postId);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }
  return {
    title: `${post.title} | Inkbit`,
    description: post.body,
    openGraph: {
      title: post.title,
      description: post.body,
      type: 'website',
      locale: 'en_IN',
      siteName: 'Inkbit',
    },
    twitter: {
      title: post.title,
      description: post.body,
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
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
  const { postId } = await params;
  const token = await getToken();

  const [post, preloadedComments, userId] = await Promise.all([
    await getPostByIdAction(postId),
    await preloadQuery(api.comments.getCommentsByPost, {
      postId,
    }),
    await fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  if (!post) {
    return (
      <h1 className="text-4xl font-semibold text-red-500 py-20 text-center">Post not found</h1>
    );
  }

  const renderContent = (html: string) => {
    return (
      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:break-words prose-p:break-words prose-li:break-words prose-a:break-words"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <Link
        href="/blog"
        className={buttonVariants({
          variant: 'ghost',
          className: 'mb-6 gap-2 hover:bg-accent transition-colors text-sm sm:text-base',
        })}
      >
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>

      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] mb-6 sm:mb-8 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
        <Image
          src={
            post.imageUrl ||
            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80'
          }
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="space-y-4 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground break-words">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-muted/50 px-2.5 sm:px-1.5 py-3 sm:py-3 rounded-full">
            <Calendar className="size-3.5 sm:size-4" />
            <span>
              {new Date(post._creationTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {userId && (
            <div className="flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
              <Users className="size-3.5 sm:size-4" />
              <PostPresence roomId={post._id} userId={userId} />
            </div>
          )}
        </div>
      </div>

      <Separator className="my-6 sm:my-8" />

      <div className="blog-content px-0 sm:px-2">{renderContent(post.body)}</div>

      <Separator className="my-6 sm:my-8" />

      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}
