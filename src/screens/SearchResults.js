import React from 'react'
import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import { Component } from 'react';

class SearchResults extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            nombreUsuario: this.props.dataUser.data.nombreUsuario,
            biografia: this.props.dataUser.data.biografia,
            image: this.props.dataUser.data.image
        }
    }
                            
    render(){
        return(
            <View style={styles.listadoUsers}> 
                <Image source={{uri: this.state.image}} style={styles.fotoPerfil}/>
                <TouchableOpacity onPress= {()=>this.props.navigation.navigate("UserProfile",{ owner: this.state.nombreUsuario, bio:this.state.biografia, image: this.state.image})}>
                    <Text style={styles.userName}>{this.state.nombreUsuario}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userName: {
        fontSize: 15,
        paddingLeft: 15,
        alignSelf: 'center'
    },
    listadoUsers: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 38,
        marginTop: 5,
        alignItems: "center"
    },
    fotoPerfil: {
        height: 50,
        width: 50,
        borderRadius: 50
    }  
})

export default SearchResults;