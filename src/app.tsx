import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './router';
import { store } from './store';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

require('./app.css');

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);


// Render components
const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component />
      </ThemeProvider>
    </Provider>,
    mainElement,
  );
};

render(AppRouter);

declare const module: any;
if (module.hot) {
  module.hot.accept('./router', () => {
    import('./router').then(Router => {
      render(Router.AppRouter);
    });
  });
}
