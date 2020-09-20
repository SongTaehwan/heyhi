/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import React from 'react';
import { name as appName } from './app.json';
import App from './src/App';

if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

YellowBox.ignoreWarnings([
  'Remote debugger',
  'componentWill',
  'Require cycle: ',
  'useNativeDriver',
  'Picker',
]);

AppRegistry.registerComponent(appName, () => App);
