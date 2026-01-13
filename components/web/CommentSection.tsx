'use client';

import { Loader2, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema } from '@/app/schemas/comment';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import z from 'zod';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';

import { createCommentAction } from '@/app/action';
import { useTransition } from 'react';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

export const CommentSection = (props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPost>;
}) => {
  const params = useParams<{ postId: Id<'posts'> }>();
  const comments = usePreloadedQuery(props.preloadedComments);
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: '',
      postId: params.postId,
    },
  });

  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      await createCommentAction(data);
    });
    form.reset();
  };

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <MessageSquare className="size-5 text-muted-foreground" />
        <h2 className="text-xl font-bold tracking-tight">
          Comments {comments !== undefined ? `(${comments.length})` : ''}
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="font-medium">Add a comment</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
              </>
            ) : (
              'Post Comment'
            )}
          </Button>
        </form>

        {/* Comments List Section */}
        <div className="space-y-6">
          {comments === undefined ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length > 0 ? (
            <>
              <Separator className="my-4" />
              <div className="space-y-6">
                {comments.map(comment => (
                  <div
                    key={comment._id}
                    className={cn(
                      'group relative flex gap-4 pb-4',
                      'last:pb-0 last:after:hidden',
                      'after:absolute after:bottom-0 after:left-10 after:right-0 after:h-[1px] after:bg-border/30'
                    )}
                  >
                    <Avatar className="size-10 shrink-0 border-2 border-background shadow-sm">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.authorName}`}
                        alt={comment.authorName}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {comment.authorName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-foreground">
                            {comment.authorName}
                          </p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <time
                            className="text-xs text-muted-foreground"
                            dateTime={new Date(comment._creationTime).toISOString()}
                          >
                            {new Date(comment._creationTime).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year:
                                new Date().getFullYear() !==
                                new Date(comment._creationTime).getFullYear()
                                  ? 'numeric'
                                  : undefined,
                            })}
                          </time>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment._creationTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                          {comment.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Empty state
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                <MessageSquare className="size-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No comments yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Be the first to share your thoughts on this post.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
