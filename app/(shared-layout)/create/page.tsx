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
import { createBlogAction } from '@/app/action';

import z from 'zod';
import { toast } from 'sonner';

export default function CreatePage() {
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      image: undefined,
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
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
          Create Your Blog Post
        </h1>
        <p className="text-lg text-muted-foreground">
          Share your thoughts and ideas with the community
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">New Blog Article</CardTitle>
          <CardDescription>Fill in all required fields below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="font-medium">Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter blog title"
                      className="border-2 focus:border-primary"
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="font-medium">Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Write your content here"
                      className="min-h-[150px] border-2 focus:border-primary"
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="font-medium">Image</FieldLabel>
                    <Input
                      type="file"
                      aria-invalid={fieldState.invalid}
                      accept="image/*"
                      className="border-2 focus:border-primary"
                      onChange={event => {
                        const file = event.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer mt-2" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" /> Creating...
                  </>
                ) : (
                  'Create Post'
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
