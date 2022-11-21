import React, { Component } from 'react';
import { db, auth, storage } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';
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
            image: '',
            permission: false
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
	registerUser(email, pass, nombreUsuario, miniBio, image) { 
        fetch(this.state.image)
        .then(res=>res.blob())
        .then(image=>{
            const ref = storage.ref(`perfil/${Date.now()}.jpg`)
            ref.put(image)
            .then(()=>{
                ref.getDownloadURL()
                .then(()=>{
                    this.onImageUpload(image)

                })
            })
        })
        .catch(err=>console.log(err))

		auth
			.createUserWithEmailAndPassword(email, pass) 
			.then((res) => {
				db.collection("users")
				.add({
					email: email,
					nombreUsuario: nombreUsuario,
					posteos: [],
                    biografia: miniBio,
                    image: image
				})

                res.user.updateProfile({
                    displayName: nombreUsuario,
                })

                this.setState({
                    email:'',
                    pass:'',
                    nombreUsuario:'',
                    miniBio:'',
                    image:''
                })
        })
        
			.catch((error) => this.setState(
				{errorMensaje: error.message}
			))
	}

    onImageUpload(image){
        this.setState({image: image}, () => {console.log(this.state.image)}
        ) 
    }

    imagen(){
        ImagePicker.getMediaLibraryPermissionsAsync() 
        .then(()=>this.setState({
            permission: true
        }))
        .catch(err=>console.log(err))
        
        let image = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        .then((res) => {

            if (!image.cancelled) {
                this.setState({image: res.assets[0].uri})
                
            }
        })
    }
/* esto es poyrque recibe por props lo de navigate y eso  */
/* en el onchange, indicamos que lo que el usuario ingresa en el la parte del mail (text) lo ponemos en el estado de mail // value es lo que está en el input a la hora de escribir*/
render() {
	return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>¡Registrate!</Text>
            </View>

            <View style={styles.container}>
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
                        style={styles.field}
                        onPress={()=>{this.imagen()}}
                    >
                        <Text style={styles.perfil}>Elegí tu foto de perfil</Text>
                    </TouchableOpacity>
				<TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')} style={styles.btn}> <Text>Ya tengo cuenta</Text></TouchableOpacity>
				<TouchableOpacity 
                    disabled = {this.state.email == "" || this.state.pass == "" || this.state.nombreUsuario == ""}
                    onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario, this.state.miniBio, this.state.image)}
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
        </>
	);
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
