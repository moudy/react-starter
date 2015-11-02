import React from 'react'; // eslint-disable-line no-unused-vars

import {Route, IndexRoute} from 'react-router';
import App from 'app/components/App';
import IndexPage from 'app/components/IndexPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={IndexPage} />
  </Route>
);
