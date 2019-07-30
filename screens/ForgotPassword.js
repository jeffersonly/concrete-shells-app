import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from './Login';

export class ForgotPassword extends React.Component {
  render() {
    return (
        <View style={styles.container}>
        <Form>
          <Button style={{marginTop: 50}}
            full
            rounded
            primary
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={{color:'white'}}>TESTESTESTEST Up</Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: ForgotPassword
  },
  Login: {
      screen: Login
  }
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10
    },
});

export default createAppContainer(AppNavigator);