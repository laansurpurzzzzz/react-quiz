import { PropsWithChildren, useLayoutEffect } from 'react';

import { useTheme } from '../../shared/hooks/use-theme.ts';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { isDark } = useTheme();

  useLayoutEffect(() => {
    if (isDark) {
      const html = window.document.querySelector('html');

      html && html.classList.add('dark');
    }
  }, []);

  return children;
};
