
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App } from 'antd';
import { useNavigate } from 'react-router-dom';
import ReactJson from 'react-json-view';
import AppRouter from '@/routes';

function MyApp() {
  const { modal } = App.useApp();
  const navigate = useNavigate();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
        staleTime: 60 * 1000,
      },
      mutations: {
        onError(err: any) {
          console.log(`[MUTATION ERROR]: ${err}`);
          modal.error({
            title: 'Encountered an Error',
            content: <ReactJson src={err} theme="monokai" />,
            onOk: () => navigate('/'),
            width: '60vh',
          });
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.state.data !== undefined) {
          console.error(`[CACHE ERROR]: ${error}`);
        }
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
