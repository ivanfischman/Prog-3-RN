import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Component } from 'react';
import { auth } from '../firebase/config'; //desestructuramos porque si no lo gacemos, estariamos importando todo lo que estamos exporando desde config, entonces como solo queremos auth, desestructuramos 

//envuelvo todo en un fragment para que sea una sola etiqueta 
class Profile extends Component{ 
    constructor(props){
        super(props);
        this.state = {}
    }
    logOut(){
        auth.signOut();
        this.props.navigation.navigate("Register")
    }
    render(){
        return(
            <> 
             <Text> Mi Perfil </Text>
                  <TouchableOpacity onPress={() => this.logOut()}>
                        <Text>Cerrar Sesión</Text>
                  </TouchableOpacity>
            </>
           
        )
    }
   
}

export default Profile;