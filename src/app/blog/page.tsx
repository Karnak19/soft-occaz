import { getBlogPosts } from '../../../utils/pocketbase/client';
import type { BlogResponse } from '../../../utils/pocketbase/pocketbase-types'; // Updated import
import BlogPostCard from '../../../components/blog/BlogPostCard';

// Opt out of caching for this page, to reflect new posts immediately
// For a real application, consider revalidation strategies (e.g., time-based or on-demand)
export const dynamic = 'force-dynamic'; 

export default async function BlogPage() {
  let posts: BlogResponse[] = []; // Updated type
  let fetchError: string | null = null;

  try {
    const result = await getBlogPosts(1, 20); // Fetch first 20 posts
    posts = result.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    fetchError = 'Erreur lors du chargement des articles. Veuillez réessayer plus tard.';
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

      {fetchError && (
        <div className="text-center text-red-500">
          <p>{fetchError}</p>
        </div>
      )}

      {!fetchError && posts.length === 0 && (
        <div className="text-center text-gray-500">
          <p>Aucun article de blog trouvé pour le moment.</p>
        </div>
      )}

      {!fetchError && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
