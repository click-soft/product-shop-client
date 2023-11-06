import './styles/css/theme.css';
import './styles/css/font-size.css';
import './styles/css/font-family.css';
import './styles/css/color.css';
import './styles/css/size.css';
import './styles/css/radius.css';
import './styles/css/line-height.css';
import './index.css';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import client from './graphql/apollo-client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ThemeProvider from './ui/ThemeProvider/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

root.render(
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
