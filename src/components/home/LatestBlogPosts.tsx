import { getBlogPosts } from '$/services/blog';
import BlogPostCard from '$/components/blog/BlogPostCard';
import Link from 'next/link';
import type { BlogResponse } from '$/utils/pocketbase/pocketbase-types';

export default async function LatestBlogPosts() {
  try {
    const result = await getBlogPosts(1, 3);
    const posts = result.items;

    return (
      <section className="bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="font-brand text-2xl font-bold tracking-tight text-foreground">
              Nos derniers articles
            </h2>
            <Link
              href="/blog"
              className="text-sm font-semibold text-primary hover:text-primary/90"
            >
              Voir tous les articles &rarr;
            </Link>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {posts.map((post: BlogResponse) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p>Aucun article de blog récent.</p>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching latest blog posts:", error);
    // Optionally return a more user-friendly error message or null
    return (
      <section className="bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="font-brand text-2xl font-bold tracking-tight text-foreground">
              Nos derniers articles
            </h2>
            <Link
              href="/blog"
              className="text-sm font-semibold text-primary hover:text-primary/90"
            >
              Voir tous les articles &rarr;
            </Link>
          </div>
          <p className="text-red-500">Impossible de charger les articles pour le moment.</p>
        </div>
      </section>
    );
  }
}
