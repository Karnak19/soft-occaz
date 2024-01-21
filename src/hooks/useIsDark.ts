import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export function useIsDark() {
  const { theme } = useTheme();

  const isDark = useMemo(() => {
    const isDarkFromTheme = theme === 'dark';

    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDarkFromTheme || media;
    }

    return isDarkFromTheme;
  }, [theme]);

  return isDark;
}
