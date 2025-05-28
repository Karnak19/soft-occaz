import type { ListResult } from 'pocketbase';
import type { BlogResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static'; // Updated import

export async function getBlogPosts(
  page = 1,
  limit = 10,
): Promise<ListResult<BlogResponse>> {
  const pb = await createStaticClient(); // Updated to use static client
  const result = await pb
    .collection('blog')
    .getList<BlogResponse>(page, limit, {
      sort: '-created',
    });
  return result;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogResponse | null> {
  const pb = await createStaticClient(); // Updated to use static client
  try {
    const post = await pb
      .collection('blog')
      .getFirstListItem<BlogResponse>(`slug = "${slug}"`);
    return post;
  } catch (error) {
    // PocketBase throws an error if no record is found (e.g., 404)
    // Or if there's any other issue with the request.
    // We'll return null to indicate not found or error.
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogResponse[]> {
  const pb = await createStaticClient();
  const records = await pb.collection('blog').getFullList<BlogResponse>({
    sort: '-created',
    fields: 'slug,updated,created',
  });
  return records;
}
