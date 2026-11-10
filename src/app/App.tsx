'use client';

import { SnackbarProvider } from 'notistack';
import { useMemo } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enUS } from 'date-fns/locale/en-US';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import ErrorBoundary from '@create/utils/ErrorBoundary';
import AppContext from 'src/contexts/AppContext';
import { CreateSettingsProvider } from '@create/core/CreateSettings/CreateSettingsProvider';
import { I18nProvider } from '@i18n/I18nProvider';
import store from '../store/store';
import MainThemeProvider from '../contexts/MainThemeProvider';

// Create a QueryClient instance
const queryClient = new QueryClient();

type AppProps = {
  children?: React.ReactNode;
};

/**
 * The main App component.
 */
function App(props: AppProps) {
  const { children } = props;
  const val = useMemo(() => ({}), []);

  return (
    <ErrorBoundary>
      <AppContext.Provider value={val}>
        {/* Date Picker Localization Provider */}
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
          {/* Redux Store Provider */}
          <Provider store={store}>
            <CreateSettingsProvider>
              <I18nProvider>
                {/* Theme Provider */}
                <MainThemeProvider>
                  {/* QueryClientProvider for React Query */}
                  <QueryClientProvider client={queryClient}>
                    {/* Notistack Notification Provider */}
                    <SnackbarProvider
                      maxSnack={5}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      classes={{
                        containerRoot:
                          'bottom-0 right-0 mb-13 md:mb-17 mr-2 lg:mr-20 z-99',
                      }}
                    >
                      {children}
                    </SnackbarProvider>
                  </QueryClientProvider>
                </MainThemeProvider>
              </I18nProvider>
            </CreateSettingsProvider>
          </Provider>
        </LocalizationProvider>
      </AppContext.Provider>
    </ErrorBoundary>
  );
}

export default App;