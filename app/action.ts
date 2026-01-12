'use server';

import { api } from '@/convex/_generated/api';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { blogSchema } from './schemas/blog';
import z from 'zod';
import { redirect } from 'next/navigation';
import { getToken } from '@/lib/auth-server';

//* server action to create a blog post
async function createBlogAction(data: z.infer<typeof blogSchema>) {
  try {
    const parsed = blogSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    const token = await getToken();

    const postUrl = await fetchMutation(api.post.generateUploadUrl, {}, { token });

    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': parsed.data.image.type },
      body: parsed.data.image,
    });

    if (!result.ok) {
      throw new Error('Failed to upload image');
    }
    const { storageId } = await result.json();

    await fetchMutation(
      api.post.createPost,
      {
        title: parsed.data.title,
        body: parsed.data.content,
        imageStorageId: storageId,
      },
      { token }
    );
  } catch (error) {
    return {
      error: 'Failed to create post',
    };
  }

  return redirect('/blog');
}

//* server action to get all posts
async function getPostsAction() {
  const posts = await fetchQuery(api.post.getPosts);

  return posts;
}

export { createBlogAction, getPostsAction };
