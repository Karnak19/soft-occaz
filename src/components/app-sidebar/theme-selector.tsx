'use client';

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { cn } from '$/utils/cn';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type ThemeOption = {
  value: string;
  label: string;
  icon: React.ElementType;
};

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions: ThemeOption[] = [
    {
      value: 'light',
      label: 'Clair',
      icon: SunIcon,
    },
    {
      value: 'dark',
      label: 'Sombre',
      icon: MoonIcon,
    },
    {
      value: 'system',
      label: 'Système',
      icon: MonitorIcon,
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-1 rounded-lg border border-border bg-background/50 p-1 backdrop-blur">
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;

        return (
          <Tooltip key={option.value}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn('h-8 w-8 rounded-md transition-all', isActive && 'bg-primary text-primary-foreground')}
                onClick={() => setTheme(option.value)}
                aria-label={`Activer le thème ${option.label}`}
              >
                <Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{option.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
