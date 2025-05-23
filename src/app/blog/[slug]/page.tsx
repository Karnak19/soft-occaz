import { getBlogPostBySlug } from '$/services/blog';
import { createStaticClient } from '$/utils/pocketbase/static';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function getFeaturedImageUrl(post: any): Promise<string | null> {
  if (!post.featured_image) return null;

  const pb = await createStaticClient();
  return pb.files.getURL(post, post.featured_image);
}

export async function generateMetadata(props: PostPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article non trouvé',
      description: "L'article que vous cherchez n'a pas pu être trouvé.",
    };
  }

  const descriptionContent = post.content
    ? post.content.substring(0, 160).replace(/<[^>]+>/g, '') + '...'
    : 'Lisez cet article de blog.';

  const featuredImageUrl = await getFeaturedImageUrl(post);

  return {
    title: post.title,
    description: descriptionContent,
    openGraph: {
      title: post.title,
      description: descriptionContent,
      ...(featuredImageUrl && {
        images: [
          {
            url: featuredImageUrl,
            width: 800,
            height: 600,
            alt: post.title,
          },
        ],
      }),
    },
  };
}

export default async function PostPage(props: PostPageProps) {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.created).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const featuredImageUrl = await getFeaturedImageUrl(post);

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose prose-lg mx-auto max-w-3xl dark:prose-invert">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 text-sm">
            <span>Publié le: {formattedDate}</span>
          </div>
        </header>

        {featuredImageUrl && <img src={featuredImageUrl} alt={post.title} className="rounded-lg" />}

        {/* 
          Assuming post.content is HTML from a trusted source (e.g., CMS admin).
          If content could be user-generated or from an untrusted source,
          ensure it's properly sanitized before rendering to prevent XSS attacks.
        */}
        <div className="break-words" dangerouslySetInnerHTML={{ __html: post.content }} />
        {/* TODO: Consider adding author bio, related posts, comments section here */}
      </article>
    </main>
  );
}
