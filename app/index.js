require('babel-polyfill');
import 'normalize.css/normalize.css';
import './css/global.scss';

import React from 'react'; React;
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import {Router} from 'react-router';

import routes from './routes';

ReactDOM.render(
  (
    <Router history={createHistory()}>
      {routes}
    </Router>
  ),
  document.getElementsByTagName('main')[0]
);

