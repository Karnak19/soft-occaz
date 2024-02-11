'use client';

import { PropsWithChildren, useState } from 'react';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '$/components/ui/resizable';
import { TooltipProvider } from '$/components/ui/tooltip';

export function Panels({
  children,
  layout = [25, 75],
  chatsList,
  collapsedChatsList,
}: PropsWithChildren<{
  layout?: [number, number];
  chatsList: React.ReactNode;
  collapsedChatsList: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(layout) => {
        document.cookie = `layout=${JSON.stringify(layout)}; path=/dashboard/chats`;
      }}
    >
      <ResizablePanel
        onCollapse={() => {
          setIsCollapsed(true);
        }}
        onExpand={() => {
          setIsCollapsed(false);
        }}
        collapsedSize={5}
        collapsible
        defaultSize={layout[0]}
        minSize={10}
        maxSize={25}
        className="p-2 xl:p-4"
      >
        <div className="flex h-full flex-col">
          <TooltipProvider>{isCollapsed ? collapsedChatsList : chatsList}</TooltipProvider>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={layout[1]}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
