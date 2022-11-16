import React from 'react'
import { FlatList } from 'react-native'
import { Text, TouchableOpacity } from 'react-native'
import { Component, View } from 'react';
import Buscador from './Buscador';
import { ScrollView } from 'react-native-web';

class SearchResults extends Component{ 
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            nombreUsuario: this.props.dataUser.data.nombreUsuario,
            biografia: this.props.dataUser.data.biografia
        }
    }
    
   
    render(){
        return(
       

            <> 
                <Text> nombre de usuario: {this.state.nombreUsuario}</Text>
                <Text>biografía: {this.state.biografia}</Text> 
            </>
          
           
            
           
        )
    }
   
}

export default SearchResults;