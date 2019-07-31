import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from 'firebase';
import firebaseConfig from '../hidden/firebase-config';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

/* LOGIN SCREEN */
export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      email: '',
      password: ''
    })
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        alert("Succcessfully Logged In User")
      })
    }
    catch(error) {
      alert("Failed to Log in")
      console.log(error.toString())
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
            style={styles.image}
            source={require('../img/Logo.png')}
        />
        <Text style={styles.logoText}>Sign-In to your Account</Text>
        <Form>
            <Item floatingLabel>
                <Label style={styles.placeHolder}>Enter Email</Label>
                <Input 
                style={styles.inputText}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
                />
            </Item>
            <Item floatingLabel>
                <Label style={styles.placeHolder}>Enter Password</Label>
                <Input 
                style={styles.inputText}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
                />
            </Item>
            <Text style={styles.divider}></Text>
            <Button style={styles.btn}
                full
                rounded
                primary
                onPress={() => this.loginUser(this.state.email, this.state.password)}
            >
                <Text style={{color:'white'}}>Login</Text>
            </Button>
            
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}
            >
                <Text 
                    style={styles.linkText}>
                    Don't have an account? Click here to Sign Up!
                </Text>
            </TouchableOpacity>
        </Form>
      </View>
    );
  }
}


/* SIGNUP SCREEN */
export class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
          email: '',
          password: '',
          passwordCheck: '',
        })
      }
      signUpUser = (email, password, passwordCheck) => {
        try {
          if(this.state.password.length < 6)
          {
            alert("Please enter at least 6 characters")
            return;
          }
          else if(this.state.password !== this.state.passwordCheck) {
              alert("The passwords are not the same. Please re-enter them.")
              return;
          }
            firebase.auth().createUserWithEmailAndPassword(email, password)
            alert("Thank you for signing up! Please proceed to sign in.")
        }
        catch(error) {
          alert("Something broke")
          console.log(error.toString())
        }
      }

  render() {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../img/Logo.png')}
            />
            <Text style={styles.logoText}>Sign Up for an Account!</Text>
            <Form>
                <Item floatingLabel>
                    <Label style={styles.placeHolder}>Enter Email</Label>
                    <Input 
                    style={styles.inputText}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({ email })}
                    />
                </Item>
                <Item floatingLabel>
                    <Label style={styles.placeHolder}>Enter Password</Label>
                    <Input 
                    style={styles.inputText}
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(password) => this.setState({ password })}
                    />
                </Item>
                <Item floatingLabel>
                    <Label style={styles.placeHolder}>Re-Enter Password</Label>
                    <Input 
                    style={styles.inputText}
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(passwordCheck) => this.setState({ passwordCheck })}
                    />
                </Item>
                <Text style={styles.divider}></Text>
                <Button style={styles.btn}
                    full
                    rounded
                    primary
                    onPress={() => this.signUpUser(this.state.email, this.state.password, this.state.passwordCheck)}
                >
                    <Text style={{color:'white'}}>Sign Up</Text>
                </Button>
                
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text 
                        style={styles.linkText}>
                        Already have an account? Click to Sign In
                    </Text>
                </TouchableOpacity>
            </Form>
        </View>
    );
  }
}


/* APP NAVIGATION, SWITCH BETWEEN SCREENS */
const AppNavigator = createStackNavigator(
    {
        SignUp: {
            screen: SignUp
        },
        Login: {
            screen: Login
        }
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#999',
                borderBottomColor: 'transparent',
                shadowOpacity: 0,
                shadowOffset: {
                    height: 0,
                    width: 0,
                },
                shadowRadius: 0,
                elevation: 0,
            },
            headerTintColor: 'white',
        }
    }
);

/* STYLING SHEET */
const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#999',
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
        alignContent: 'center',
        bottom: 0,
        paddingTop: '35%',
    },
    logoText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    placeHolder: {
        color: '#fff',
        fontSize: 16
    },
    divider: {
      paddingTop: '25%',
    },
    btn: {
        color: '#fff', 
        backgroundColor: '#ccc',
        textAlign: 'center',
    },
    inputText: {
        color: '#fff',
        fontSize: 16,
        textDecorationLine: 'none',
    },
    linkText: {
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
        marginTop: '5%',
    }
});

export default createAppContainer(AppNavigator);