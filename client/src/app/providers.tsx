'use client';

import theme from '@/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux'
import { store } from '@/lib/store'

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          {children}
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
