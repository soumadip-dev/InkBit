import { getPostByIdAction } from '@/app/action';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Id } from '@/convex/_generated/dataModel';
import { ArrowLeft } from 'lucide-react';
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

  if (!post) {
    return <h1 className="text-6xl font-semibold text-red-500 py-20">Post not found</h1>;
  }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link href="/blog" className={buttonVariants({ variant: 'ghost', className: 'mb-4' })}>
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>
      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={
            post.imageUrl ||
            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D'
          }
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">{post.title}</h1>

        <p className="text-sm text-muted-foreground">
          {new Date(post._creationTime).toLocaleDateString('en-in')}
        </p>
      </div>
      <Separator className="my-8" />
      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">{post.body}</p>
      <Separator className="my-8" />
    </div>
  );
}
