import React, { Component } from 'react';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
        StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            pass:'',
            nombreUsuario:'',
            errorMensaje:''
        }
    }
    loginUser(email, pass) {
		auth
			.signInWithEmailAndPassword(email, pass)
			.then((res) => {
				this.props.navigation.navigate('Menu');
			})
      .catch((error) => this.setState(
				{errorMensaje: error.message}
			))
	}

    render(){
        return(
            <>
            <View style={styles.header}>
                    <Text style={styles.title}>
                        ¡Bienvenido de vuelta!
                    </Text>
                </View>
            <View style={styles.container}>
					<TextInput 
                        style={styles.field} 
                        placeholder="email" 
                        keyboardType="email-address" 
                        onChangeText={(text) => this.setState({ email: text })} value={this.state.email} 
                    />
					<TextInput 
                        style={styles.field} 
                        placeholder="password" 
                        keyboardType="default" 
                        secureTextEntry 
                        onChangeText={(text) => this.setState({ pass: text })} value={this.state.pass} 
                    />
					<TouchableOpacity
                        onPress={() => this.loginUser(this.state.email, this.state.pass)}
                        style={this.state.email == "" || this.state.password == ""
                        ? styles.btnDisabled
                        : styles.btn
                        }
                        disabled={this.state.email == "" || this.state.password == ""
                        ? true
                        : false
                      }>
                        <Text style={this.state.email == "" || this.state.password == ""
                            ? styles.btnText
                            : null
                        }>Ingresar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Register')}
                        style={styles.btn}
                    >
                        <Text> No tengo cuenta </Text>           
                    </TouchableOpacity>
                <Text> {this.state.errorMensaje} </Text>
            </View>
            </>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#aaa",
        color: "#ff9f68",
      },
    field: {
      width: "80%",
      backgroundColor: "#C9ADA7",
      textAlign: 'center',
      padding: 7,
      marginTop: 5,
      borderRadius: 15,
    },
    btn: {
      backgroundColor: "#ffb703",
      color: "black",
      textAlign: 'center',
      padding: 7,
      marginTop: 15,
      borderRadius: 15,
      width: '80%',
    },
    btnDisabled: {
      backgroundColor: "#e9c46a",
      textAlign: 'center',
      padding: 7,
      marginTop: 15,
      borderRadius: 15,
      width: '80%',
    },
    btnText: {
      color: 'gray',
    },
    header: {
      backgroundColor: "#22223b",
      width: '100%',
      padding: 10,
    },
    title: {
      color: "white",
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
    },
  });
  
export default Login;