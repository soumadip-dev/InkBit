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

      <div className="relative mx-auto w-full max-w-xl rounded-lg border border-dashed border-zinc-300 px-4 sm:px-6 md:px-8 dark:border-zinc-800 shadow-md">
        <div className="absolute top-4 left-0 -z-0 h-px w-full bg-zinc-400 sm:top-6 md:top-8 dark:bg-zinc-700" />
        <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 sm:bottom-6 md:bottom-8 dark:bg-zinc-700" />

        <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
          <div className="absolute z-0 grid h-full w-full items-center">
            <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
              <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
              <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
              <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
              <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
            </section>
          </div>

          <div className="relative z-20 mx-auto py-8">
            <div className="p-6">
              <CardHeader className="pb-3 px-0">
                <CardTitle className="text-xl">New Blog Article</CardTitle>
                <CardDescription>Fill in all required fields below</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup>
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
                    <Button
                      type="submit"
                      className="w-full cursor-pointer mt-2"
                      disabled={isPending}
                    >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
