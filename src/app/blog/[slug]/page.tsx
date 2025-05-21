import { getBlogPostBySlug } from '../../../../utils/pocketbase/client';
// BlogPost import removed
import { notFound } from 'next/navigation';
// Image import removed
import type { BlogResponse } from '../../../../utils/pocketbase/pocketbase-types'; // Added BlogResponse
import type { Metadata, ResolvingMetadata } from 'next';

// Ensure pages are dynamically rendered, reflecting the latest post data
export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Type of 'post' will be inferred as BlogResponse | null from getBlogPostBySlug
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Article non trouvé', // Updated to French
      description: "L'article que vous cherchez n'a pas pu être trouvé.", // Updated to French
    };
  }

  // Updated excerpt logic to only use post.content as post.excerpt is not available
  const descriptionContent = post.content ? post.content.substring(0, 160).replace(/<[^>]+>/g, '') + '...' : 'Lisez cet article de blog.'; // Fallback updated

  return {
    title: post.title,
    description: descriptionContent,
    openGraph: {
      title: post.title,
      description: descriptionContent,
      // images field removed as post.featured_image is not available
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  // Type of 'post' will be inferred as BlogResponse | null
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound(); // This will render the closest not-found.tsx or Next.js default 404 page
  }

  const formattedDate = new Date(post.created).toLocaleDateString('fr-FR', { // Changed to fr-FR
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose prose-lg mx-auto max-w-3xl"> {/* Using Tailwind Typography for styling */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 text-sm">
            {/* Author display removed */}
            <span>Publié le: {formattedDate}</span> {/* Changed to French */}
          </div>
        </header>

        {/* Featured image display removed */}

        {/* 
          Assuming post.content is HTML from a trusted source (e.g., CMS admin).
          If content could be user-generated or from an untrusted source,
          ensure it's properly sanitized before rendering to prevent XSS attacks.
        */}
        <div
          className="break-words"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* TODO: Consider adding author bio, related posts, comments section here */}
      </article>
    </main>
  );
}
