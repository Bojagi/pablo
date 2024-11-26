import React from 'react';
import clsx from 'clsx';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { PabloThemeProvider } from '@bojagi/pablo';
import type { Props } from '@theme/DocRoot/Layout/Main';

import styles from './styles.module.css';

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): JSX.Element {
  const sidebar = useDocsSidebar();
  return (
    <PabloThemeProvider>
      <main
        className={clsx(
          styles.docMainContainer,
          (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced
        )}
      >
        <div
          className={clsx(
            'container padding-top--md padding-bottom--lg',
            styles.docItemWrapper,
            hiddenSidebarContainer && styles.docItemWrapperEnhanced
          )}
        >
          {children}
        </div>
      </main>
    </PabloThemeProvider>
  );
}
