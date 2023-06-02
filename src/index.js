import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
});

root.render(
  <Provider store={store}>
    <ColorModeScript theme={theme} />
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
);

export const server = `https://api.coingecko.com/api/v3`;
