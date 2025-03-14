'use client';

import { usePocketbase } from '$/app/pocketbase-provider';
import { NewsResponse } from '$/utils/pocketbase/pocketbase-types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function NewsToaster() {
  const { pb } = usePocketbase();

  // Fetch news that are still valid (until date is in the future or null)
  const { data: news } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const now = new Date().toISOString();
      return pb.collection('news').getList<NewsResponse>(1, 10, {
        filter: `until >= "${now}" || until = null`,
        sort: '-created',
      });
    },
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });

  useEffect(() => {
    if (news?.items && news.items.length > 0) {
      // Check if we've already shown these news items
      const shownNewsIds = JSON.parse(localStorage.getItem('shownNewsIds') || '[]');

      news.items.forEach((newsItem) => {
        // Only show news that haven't been shown before
        if (!shownNewsIds.includes(newsItem.id)) {
          toast(newsItem.title || 'Nouvelle annonce', {
            className: '!bg-card !text-card-foreground !border-border',
            // Use a custom component to render HTML content
            description: (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: newsItem.content || '' }}
              />
            ),
            position: 'bottom-center',
            duration: 10000, // 10 seconds
            id: newsItem.id, // Use the news ID as the toast ID to prevent duplicates
            closeButton: true,
          });

          // Add this news ID to the shown list
          shownNewsIds.push(newsItem.id);
        }
      });

      // Save the updated shown news IDs
      localStorage.setItem('shownNewsIds', JSON.stringify(shownNewsIds));
    }
  }, [news]);

  return null; // This component doesn't render anything
}
