'use client';

import { blogSchema } from '@/app/schemas/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import createBlogAction from '@/app/action';

import z from 'zod';
import { toast } from 'sonner';

export default function CreatePage() {
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof blogSchema>) => {
    startTransition(async () => {
      await createBlogAction(data);
      toast.success('Blog created successfully');
    });
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create Post</h1>
        <p className="text-xl text-muted-foreground pt-4">Share your thoughts with the world</p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} placeholder="Title" {...field} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Super cool blog content"
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button type="submit" className="cursor-pointer" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
