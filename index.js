import React from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'mobx-react';
import App from './App';
import Store from './app/store/index'
import {name as appName} from './app.json';

class AppWithStore extends React.Component {
     render() {
        return (
          <Provider store={Store}>
            <App />
          </Provider>
        );
     }
}

AppRegistry.registerComponent(appName, () => AppWithStore)