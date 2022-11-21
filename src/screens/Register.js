import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
class Register extends Component { //usamos un componente de clase por el estado y porque vamos a tener metodos para registrar a los usuarios 
	constructor(props) { //si hacemos un console log, vemos que al estar register dentro del NavigatoContainer va a recibir por props el objeto navigation  y lo que tenga dentro  
		super(props);
		this.state = {
			email: '',
			pass: '',
			nombreUsuario: "",
			errorMensaje: "",
            miniBio:"",
            boton: true,
		};
	}
	//NO CERRAR SESION - lo hacemos en register pq es lo primero que ve el usuario
	componentDidMount(){ //como corre despues del primer renderizado, primero me carga el render 
		auth.onAuthStateChanged((user) => {
			if (user){
				this.props.navigation.navigate("Menu")
			}}) //veo cual ususario tengo logueado y toda su info 
	}
//al registrar un usuario lo queremos guardar en db con nombre, biografia, etc
//manda al servidor y si nos devuelve un success entra al then y sino al catch
	registerUser(email, pass, nombreUsuario, miniBio) { 
		auth
			.createUserWithEmailAndPassword(email, pass) 
			.then((res) => {
				db.collection("users")
				.add({
					email: email,
					nombreUsuario: nombreUsuario,
					posteos: [],
                    biografia: miniBio,
				})
           
        })
        
			.catch((error) => this.setState(
				{errorMensaje: error.message}
			))
	}
/* esto es poyrque recibe por props lo de navigate y eso  */
/* en el onchange, indicamos que lo que el usuario ingresa en el la parte del mail (text) lo ponemos en el estado de mail // value es lo que está en el input a la hora de escribir*/
render() {
	return (
		<View style={styles.container}>
         <View style={styles.header}>
          <Text style={styles.title}>¡Registrate!</Text>
        </View>
				<TextInput style={styles.field} placeholder="email" keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
				<TextInput
					style={styles.field}
					placeholder="Nombre de usuario"
					keyboardType="default"
					onChangeText={(text) => this.setState({ nombreUsuario: text })}
					value={this.state.nombreUsuario}
				/>
                <TextInput
					style={styles.field}
					placeholder="Biografía"
					keyboardType="default"
					onChangeText={(text) => this.setState({miniBio: text })}
					value={this.state.miniBio}
				/>
				<TextInput style={styles.field} placeholder="password" keyboardType="default"   secureTextEntry onChangeText={(text) => this.setState({ pass: text })} value={this.state.pass} />
				<TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')} style={styles.btn}> <Text>Ya tengo cuenta</Text></TouchableOpacity>
				<TouchableOpacity 
                    disabled = {this.state.email == "" || this.state.pass == "" || this.state.nombreUsuario == ""}
                    onPress={() => {
                      this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario, this.state.miniBio)
                      this.props.navigation.navigate('Login')}}
                    style={
                        this.state.email == "" ||
                        this.state.pass == "" ||
                        this.state.nombreUsuario == "" ||
                        this.state.miniBio == ""
                          ? styles.btnDisabled
                          : styles.btn
                      }
                >
				<Text style={
                    this.state.email == "" ||
                    this.state.pass == "" ||
                    this.state.nombreUsuario == "" ||
                    this.state.miniBio == ""
                        ? styles.btnText
                        : null
                    }
                >
                    Registrarme
                </Text>
				</TouchableOpacity>
			
      <Text> {this.state.errorMensaje} </Text>
		</View>
	);
}

}

const styles = StyleSheet.create({
    container: {
      overflow: "hidden",
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#aaa",
      color: "#ff9f68",
      paddingTop: 20,
    },
    field: {
      width: "80%",
      backgroundColor: "#C9ADA7",
      textAlign: "center",
      padding: 7,
      marginTop: 5,
      borderRadius: 15,
    },
    btn: {
      backgroundColor: "#ffb703",
      color: "black",
      textAlign: "center",
      padding: 7,
      marginTop: 15,
      borderRadius: 15,
      width: "80%",
    },
    btnDisabled: {
      backgroundColor: "#e9c46a",
      textAlign: "center",
      padding: 7,
      marginTop: 15,
      borderRadius: 15,
      width: "80%",
    },
    btnText: {
      color: "gray",
    },
    header: {
      backgroundColor: "#22223b",
      width: "100%",
      padding: 10,
    },
    title: {
      color: "white",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "600",
    },
  });
  
export default Register;
