'use server';

import { api } from '@/convex/_generated/api';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { blogSchema } from './schemas/blog';
import z from 'zod';
import { redirect } from 'next/navigation';
import { getToken } from '@/lib/auth-server';

//* server action to create a blog post
async function createBlogAction(data: z.infer<typeof blogSchema>) {
  const parsed = blogSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const token = await getToken();

  await fetchMutation(
    api.post.createPost,
    {
      title: parsed.data.title,
      body: parsed.data.content,
    },
    { token }
  );

  return redirect('/');
}

//* server action to get all posts
async function getPostsAction() {
  const posts = await fetchQuery(api.post.getPosts);

  return posts;
}

export { createBlogAction, getPostsAction };
