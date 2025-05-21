import { env } from '$/env';
import PocketBase, { type ListResult } from 'pocketbase';
import type { BlogResponse } from './pocketbase-types'; // Updated import

import { TypedPocketBase } from './pocketbase-types';

export function createBrowserClient() {
  const client = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;

  if (typeof document !== 'undefined') {
    client.authStore.loadFromCookie(document.cookie);
    client.authStore.onChange(() => {
      document.cookie = client.authStore.exportToCookie({
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 30,
      });
    });
  }

  return client;
}

export async function getBlogPosts(
  page = 1,
  limit = 10,
): Promise<ListResult<BlogResponse>> { // Updated return type
  const pb = createBrowserClient();
  const result = await pb
    .collection('blog') // Updated collection name
    .getList<BlogResponse>(page, limit, { // Updated generic type
      sort: '-created', // Filter removed
    });
  return result;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogResponse | null> { // Updated return type
  const pb = createBrowserClient();
  try {
    const post = await pb
      .collection('blog') // Updated collection name
      .getFirstListItem<BlogResponse>(`slug = "${slug}"`); // Updated filter and generic type
    return post;
  } catch (error) {
    // PocketBase throws an error if no record is found (e.g., 404)
    // Or if there's any other issue with the request.
    // We'll return null to indicate not found or error.
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }
}
