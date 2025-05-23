import { getBlogPostBySlug } from '$/services/blog';
import { BlogResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function getFeaturedImageUrl(post: BlogResponse): Promise<string | null> {
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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const descriptionContent = post.content
    ? post.content.substring(0, 160).replace(/<[^>]+>/g, '') + '...'
    : 'Lisez cet article de blog sur Airsoft Market.';

  const featuredImageUrl = await getFeaturedImageUrl(post);
  const canonicalUrl = `https://airsoftmarket.fr/blog/${slug}`;

  // Generate keywords from title and content
  const titleWords = post.title
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3);
  const keywords = [
    ...titleWords,
    'airsoft',
    'blog airsoft',
    'guide airsoft',
    'conseil airsoft',
    'airsoft market',
    'airsoft occasion',
  ].join(', ');

  const images = featuredImageUrl ? [featuredImageUrl] : ['https://airsoftmarket.fr/screenshot-annonces.jpg'];

  return {
    title: post.title,
    description: descriptionContent,
    keywords,
    openGraph: {
      title: post.title,
      description: descriptionContent,
      images,
      locale: 'fr_FR',
      type: 'article',
      siteName: 'Airsoft Market - Blog Airsoft',
      url: canonicalUrl,
      publishedTime: post.created,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: descriptionContent,
      images,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
