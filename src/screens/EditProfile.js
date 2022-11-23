import React, { Component } from 'react';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
        StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from "firebase";
import { getAuth, updatePassword, updateEmail, updateProfile } from "firebase/auth";

class EditProfile extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            email:'',
            pass:'',
            nombreUsuario:'',
            errorMensaje:''
        }
    }
    componentDidMount() {
        console.log(auth.currentUser.uid)
        console.log(this.props.route.params.userActivo.id)
    }
    
    edit(email, pass, nombreUsuario) {
        /* updateProfile(auth.currentUser, {
            displayName: nombreUsuario
        })
        .then(() => {
            alert("nombre de usuario editado correctamente")
        
        })
        .catch((error) => console.log(error)); */

        db.collection('users')
			.doc(this.props.route.params.userActivo.id)
			.update({
                nombreUsuario: nombreUsuario 
			})
			.then(() => {
                alert("usuario editado")
				this.setState({
					email: "",
                    pass: "",
                    nombreUsuario: ""
				})
            })
			.catch((error) => console.log(error));
    }

    render(){
        return(
            <>
            <View style={styles.header}>
                    <Text style={styles.title}>
                        Editar Perfil
                    </Text>
                </View>
            <View style={styles.container}>
                    <TextInput
                        style={styles.field}
                        placeholder="Nombre de usuario"
                        keyboardType="default"
                        onChangeText={(text) => this.setState({ nombreUsuario: text })}
                        value={this.state.nombreUsuario}
                    />
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
                        onPress={() => this.edit(this.state.email, this.state.pass, this.state.nombreUsuario)}>
                        <Text>Editar</Text>
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
  
export default EditProfile;