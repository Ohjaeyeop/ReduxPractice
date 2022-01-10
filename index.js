import {AppRegistry} from 'react-native';
import React from 'react';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {fetchUsers} from './src/features/users/usersSlice';

store.dispatch(fetchUsers());

const RnRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RnRedux);
