import './styles/css/theme.css';
import './styles/css/font-size.css';
import './styles/css/font-family.css';
import './styles/css/color.css';
import './styles/css/size.css';
import './styles/css/radius.css';
import './styles/css/line-height.css';
import './styles/css/custom-element.css';
import './index.css';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import client from './graphql/apollo-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ThemeProvider from './ui/ThemeProvider/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </QueryClientProvider>
  </LocalizationProvider>
);
