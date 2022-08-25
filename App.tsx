import * as React from 'react';
import AppInner from './AppInner';
import {Provider} from 'react-redux';
import store from './src/app/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppInner />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
