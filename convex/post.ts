import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { authComponent } from './auth';

export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError('Unauthorized');
    }
    const blogArticle = await ctx.db.insert('posts', {
      body: args.body,
      title: args.title,
      authorId: user._id,
    });
    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async ctx => {
    const posts = await ctx.db.query('posts').order('desc').collect();

    return posts;
  },
});

export const getPostById = query({
  args: { postId: v.id('posts') },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query('posts')
      .filter(q => q.eq(q.field('_id'), args.postId))
      .order('desc')
      .take(1);
    return post[0] ?? null;
  },
});
