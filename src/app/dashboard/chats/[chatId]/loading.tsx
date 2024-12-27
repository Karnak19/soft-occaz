import { Card } from '$/components/ui/card';
import { Skeleton } from '$/components/ui/skeleton';

export default function Loading() {
  return (
    <Card className="flex h-full flex-col rounded-none border-0">
      {/* Chat header skeleton */}
      <div className="border-b p-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Messages area skeleton */}
      <div className="flex-1 space-y-4 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={`flex items-start space-x-2 ${i % 2 === 0 ? '' : 'flex-row-reverse space-x-reverse'}`}>
            <Skeleton className="size-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className={`h-20 w-64 rounded-lg ${i % 2 === 0 ? 'bg-muted' : 'bg-primary/20'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Message input skeleton */}
      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <Skeleton className="h-[80px] flex-1 rounded-lg" />
          <Skeleton className="size-[80px] rounded-lg" />
        </div>
      </div>
    </Card>
  );
}
