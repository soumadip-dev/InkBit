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

export const CommentSection = () => {
  const params = useParams<{ postId: Id<'posts'> }>();
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
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">Comments (5)</h2>
      </CardHeader>
      <CardContent>
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
                  className="min-h-[100px]"
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting ..
              </>
            ) : (
              'Post Comment'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
