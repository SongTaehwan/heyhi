/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React from 'react';

if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

YellowBox.ignoreWarnings([
  'Remote debugger',
  'componentWill',
  'Require cycle: ',
]);

AppRegistry.registerComponent(appName, () => App);
