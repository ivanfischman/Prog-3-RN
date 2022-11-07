import React, { Component } from 'react';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
        StyleSheet } from 'react-native';


class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            pass:'',
            userName:'',
            errors:''
        }
    }
    loginUser(email, pass) {
		auth
			.signInWithEmailAndPassword(email, pass)
			.then((res) => {
				this.props.navigation.navigate('Menu');
			})
			.catch((error) => console.log(error));
	}

    render(){
        return(
            <View> 
                <View>
				<Text>Ingresar</Text>
				<View>
					<TextInput style={styles.field} placeholder="email" keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
					<TextInput style={styles.field} placeholder="password" keyboardType="default" secureTextEntry onChangeText={(text) => this.setState({ pass: text })} value={this.state.pass} />
					<Text onPress={() => this.loginUser(this.state.email, this.state.pass)}>Loguearme</Text>
					<Text onPress={() => this.props.navigation.navigate('Register')}>No tengo cuenta</Text>
				</View>
			    </View>
                </View>
           
        )
    }

}


const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#22223b",
    color: "#ff9f68",
    paddingTop: 20,
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