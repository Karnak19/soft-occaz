import { useMemo } from 'react';
import { useTheme } from 'next-themes';

export function useIsDark() {
  const { theme } = useTheme();

  const isDark = useMemo(() => {
    if (theme === 'light') {
      return false;
    }

    const isDarkFromTheme = theme === 'dark';

    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDarkFromTheme || media;
    }

    return isDarkFromTheme;
  }, [theme]);

  return isDark;
}
