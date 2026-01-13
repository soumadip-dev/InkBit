import { getPostByIdAction } from '@/app/action';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CommentSection } from '@/components/web/CommentSection';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { preloadQuery } from 'convex/nextjs';
import { ArrowLeft, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-static';

interface PostIdRouteProps {
  params: Promise<{
    postId: Id<'posts'>;
  }>;
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
  const { postId } = await params;
  const post = await getPostByIdAction(postId);

  const preloadedComments = await preloadQuery(api.comments.getCommentsByPost, {
    postId,
  });

  if (!post) {
    return (
      <h1 className="text-4xl font-semibold text-red-500 py-20 text-center">Post not found</h1>
    );
  }

  const renderContent = (html: string) => {
    return (
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <Link
        href="/blog"
        className={buttonVariants({
          variant: 'ghost',
          className: 'mb-6 gap-2 hover:bg-accent transition-colors',
        })}
      >
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>

      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={
            post.imageUrl ||
            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80'
          }
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>
              {new Date(post._creationTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {post.title}
        </h1>
      </div>

      <Separator className="my-8" />

      <div className="blog-content">{renderContent(post.body)}</div>

      <Separator className="my-8" />

      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}
