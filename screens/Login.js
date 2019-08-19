import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, ScrollView, Keyboard } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from 'firebase';
import firebaseConfig from '../hidden/firebase-config';
import {  Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

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
    const { navigate } = this.props.navigation;
     
    
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        alert("Succcessfully Logged In User")
        navigate('Home')
    }, (error) => {
        Alert.alert(error.message);
    });
    
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
                keyboardType="email-address"
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
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgotPassword')}
                //onPress={() => Alert.alert('Forgot Password',"Please contact Erika Sollars to reset your password.")}
            >
                <Text 
                    style={styles.linkText}>
                    Forgot Password?
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

        if(this.state.password.length < 6)
        {
        alert("Please enter at least 6 characters")
        return;
        }
        else if(this.state.password !== this.state.passwordCheck) {
            alert("The passwords are not the same. Please re-enter them.")
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => { 
            alert("Thank you for signing up! Please proceed to sign in.") 
            this.props.navigation.navigate('Login');
            //store user info into firebase database
            firebase.database().ref('UsersList/').push({
                email, password,
            }).then((data)=>{
                //success callback
                console.log('data ' , data)
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            })
        }, (error) => {
            Alert.alert(error.message);
        });
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
                    keyboardType="email-address"
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
                    <Label style={styles.placeHolder}>Confirm Password</Label>
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

/* Forgot Password Screen */
export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
          email: '',
        })
      }
      resetPassword = (email) => {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            Alert.alert("Password reset email has been sent.");
            this.props.navigation.navigate('Login');
        }, (error) => {
            Alert.alert(error.message);
        })
      }

  render() {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../img/Logo.png')}
            />
            <Text style={styles.logoText}>Forgot your Password? Don't Worry!</Text>
            <Form>
                <Item floatingLabel>
                    <Label style={styles.placeHolder}>Enter Email</Label>
                    <Input 
                    style={styles.inputText}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({ email })}
                    keyboardType="email-address"
                    />
                </Item>
                
                <Text style={styles.divider}></Text>
                <Button style={styles.btn}
                    full
                    rounded
                    primary
                    onPress={() => this.resetPassword (this.state.email)}
                >
                    <Text style={{color:'white'}}>Reset Password</Text>
                </Button>
                
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')}
                >
                    <Text 
                        style={styles.linkText}>
                        Don't Have an Account? Click here to Sign Up
                    </Text>
                </TouchableOpacity>
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

/* Home Screen */
export class Home extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.divider}></Text>
           <Button style={styles.homeBtn}
                full
                rounded
                primary
                onPress={() => this.props.navigation.navigate('Login')}
            >
                <Text style={{color:'white'}}>Schedule</Text>
            </Button>
            <Text style={styles.divider}></Text>
            <Button style={styles.homeBtn}
                full
                rounded
                primary
                onPress={() => this.props.navigation.navigate('Login')}
            >
                <Text style={{color:'white'}}>Order Materials</Text>
            </Button>
            <Text style={styles.divider}></Text>
            <Button style={styles.homeBtn}
                full
                rounded
                primary
                onPress={() => this.props.navigation.navigate('Login')}
            >
                <Text style={{color:'white'}}>History</Text>
            </Button>
            <Text style={styles.divider}></Text>
            <Button style={styles.homeBtn}
                full
                rounded
                primary
                onPress={() => this.props.navigation.navigate('ReportProblem')}
            >
                <Text style={{color:'white'}}>Report a Problem</Text>
            </Button>
            <Text style={styles.divider}></Text>
            <Button style={styles.homeBtn}
                full
                rounded
                primary
                onPress={() => this.props.navigation.navigate('Login')}
            >
                <Text style={{color:'white'}}>Make a Request</Text>
            </Button>
        </View>
    );
  }
}

/* Report a Problem Screen */
export class ReportProblem extends React.Component {

    constructor(props) {
        super(props)
        this.state = ({
          text: '',
        })
    }

    report = (text) => {
        if(text.length > 10) {
            //store user info into firebase database
            firebase.database().ref('Reports/').push({
                text
            }).then((data)=>{
                //success callback
                console.log('data ' , data)
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            })
            Alert.alert("Thank you for submitting a problem report!");
            this.props.navigation.navigate('Home');
        } else {
            Alert.alert("Please enter a longer/more descriptive problem report.")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image 
                    style={styles.image}
                    source={require('../img/Logo.png')}
                />
                <Text style={styles.logoText}>Any issues? Report the problem!</Text>
                <Text style={styles.logoText}>Reports are anonymous!</Text>
                <ScrollView style={styles.reportTextAreaContainer} keyboardShouldPersistTaps="never">
                    <TextInput 
                        style={styles.reportTextArea}
                        underlineColorAndroid="transparent"
                        placeholder="Report Problem here ..."
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={(text) => this.setState({ text })}
                    />
                    <Button style={styles.btn}
                        full
                        primary
                        onPress={() => this.report(this.state.text)}
                    >
                        <Text style={{color:'white'}}>Send</Text>
                    </Button>
                </ScrollView>
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
        },
        ForgotPassword: {
            screen: ForgotPassword
        },
        Home: {
            screen: Home
        },
        ReportProblem: {
            screen: ReportProblem
        },
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
        paddingTop: '15%',
        paddingBottom: '5%',
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
      paddingTop: '15%',
    },
    btn: {
        color: '#fff', 
        backgroundColor: '#ccc',
        textAlign: 'center',
    },
    homeBtn: {
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
    },
    reportTextAreaContainer: {
        padding: 5,
        borderRadius: 5,
    },
    reportTextArea: {
        height: 300,
        justifyContent: "flex-start",
        backgroundColor: '#fff',
        paddingLeft: 10,
        fontSize: 14,
    },
});

export default createAppContainer(AppNavigator);