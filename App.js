import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';

import ForgotPassword from './screens/ForgotPassword';
import SignUp from './screens/SignUp';
export default class App extends React.Component {

  render() {
    return (
      <SignUp/>
      //<ForgotPassword/>
    );
  }

}