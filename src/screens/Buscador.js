import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet,FlatList, TextInput, Image, Text } from 'react-native';
import { db } from '../firebase/config';
import SearchResults from './SearchResults'; 

export default class Buscador extends Component {
    constructor(props){
        super(props)
        this.state = {
            busqueda: "",
            resultado: [],
            users: ""
            
        }
      
     }
componentDidMount(){
    db.collection("users").onSnapshot(
        users => {
            let usersFromDb=[]
            users.forEach((user) => {
                usersFromDb.push({
                    id: user.id,
                    data: user.data()
                })
            }) 
            this.setState({
                users: usersFromDb
            })
            
        })
    }
buscador(){
    if(this.state.busqueda.length > 0){
        
        let nuevoArray = this.state.users.filter((user) => {
          return  user.data.nombreUsuario.includes(this.state.busqueda)}
        )
            this.setState({
                resultado: nuevoArray
            }, () => console.log(this.state.resultado))

    }
}

render() {
    return (
        <>
        {this.state.resultado.length > 0 ?
        <View>
            <FlatList
            data = {this.state.resultado}
            keyExtractor= {item => item.id}
            renderItem = { ({item}) => <SearchResults dataUser={item} 
            {...this.props} />}>
            </FlatList>
        </View> : ""
        }
          <View>
            
                <TextInput style={{}} placeholder="buscá a tus amigos"
                onChangeText={(text) => this.setState({busqueda: text})}>
                </TextInput>
                <TouchableOpacity onPress = {() => this.buscador()}> 
                    <Text>buscar</Text>
                </TouchableOpacity>
                </View>
      <View>
        
        

        
        
      </View></>
    )
  }
}
