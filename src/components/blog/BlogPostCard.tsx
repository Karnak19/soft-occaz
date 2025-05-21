import Link from 'next/link';
// Image import removed
import type { BlogResponse } from '../../utils/pocketbase/pocketbase-types'; // Updated import
import {
  Card,
  CardContent,
  // CardDescription import removed as we'll use dangerouslySetInnerHTML
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface BlogPostCardProps {
  post: BlogResponse; // Updated type
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // Excerpt logic removed, will use content directly

  const formattedDate = new Date(post.created).toLocaleDateString('fr-FR', { // Changed to fr-FR
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Create a snippet for the content, ensuring it's not too long for the card.
  // This is a simple substring; for production, a more robust HTML sanitizer/truncator might be needed.
  const contentPreview = post.content ? post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '') : '';

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
        {/* Featured image removed */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          {/* 
            Using dangerouslySetInnerHTML for content preview.
            The wrapper div helps manage potential broken HTML by limiting height and hiding overflow.
          */}
          <div
            className="text-sm text-muted-foreground overflow-hidden max-h-24 relative" // Changed text-gray-700 to text-muted-foreground
            style={{ 
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', 
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' 
            }} // Fades out content at the bottom
            dangerouslySetInnerHTML={{ __html: contentPreview }}
          />
        </CardContent>
        <CardFooter className="text-xs text-gray-500 mt-auto pt-4 border-t">
          <div className="flex justify-end w-full"> {/* Author removed, date pushed to the right */}
            <span>{formattedDate}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
