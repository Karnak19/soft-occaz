import { Card } from '$/components/ui/card';
import { Skeleton } from '$/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="h-[calc(100vh-12rem)] overflow-hidden rounded-lg">
      <div className="grid h-full grid-cols-1 md:grid-cols-7 lg:grid-cols-5">
        {/* Chat list sidebar */}
        <aside className="col-span-2 border-r lg:col-span-1">
          <Card className="h-full rounded-none border-0">
            <div className="flex h-full flex-col">
              <div className="border-b p-4">
                <Skeleton className="h-7 w-24" />
              </div>
              <div className="flex-1 space-y-4 p-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="size-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </aside>

        {/* Main chat area */}
        <main className="col-span-5 flex h-full flex-col lg:col-span-4">
          <Card className="flex h-full flex-col rounded-none border-0">
            <div className="flex-1 space-y-4 p-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[300px]" />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 flex-1 rounded-lg" />
                <Skeleton className="h-10 w-20 rounded-lg" />
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
