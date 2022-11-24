import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet,FlatList, TextInput, Image, Text } from 'react-native';
import { db } from '../firebase/config';
import { Ionicons } from '@expo/vector-icons';
import SearchResults from './SearchResults'; 

export default class Buscador extends Component {
    constructor(props){
        super(props)
        this.state = {
            busqueda: "",
            resultado: [],
            users: "",
            error: "",
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
                    resultado: nuevoArray,
                
                }, () => console.log(this.state.resultado))
        
                if(this.state.resultado.length== 0) {
                this.setState({
                error: "No existen coincidencias para este usuario"
                })
                }   
        } else if(this.state.busqueda.length == 0) {
            this.setState({
                error: "Este campo no puede estar vacío"
            })
        } 
    }

render() {
    return (
        <View style= {styles.general}>
            <View style={styles.container2}>
                <TextInput style={styles.field} placeholder="buscá a tus amigos"
                onChangeText={(text) => this.setState({busqueda: text})}>
                </TextInput>
                <TouchableOpacity onPress = {() => this.buscador()}> 
                    <Ionicons name="search-sharp" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {this.state.resultado.length > 0 ?
            <View style= {styles.general}>
                <FlatList
                    style={styles.flatlist}
                    data = {this.state.resultado}
                    keyExtractor= {item => item.id}
                    renderItem = { ({item}) => <SearchResults dataUser={item} 
                    {...this.props} />}>
                </FlatList>
            </View> : <Text style={styles.textBlack}>{this.state.error}</Text>
            }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    general:{
        backgroundColor: "#CFB997"
    },
    container2: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: "center",
        marginHorizontal:6,
        backgroundColor: "#CFB997"
       
    },
    field: {
      width: "90%",
      backgroundColor: "#9BA17B",
      color: "black",
      textAlign: "center",
      padding: 7,
      marginTop: 5,
      borderRadius: 5,
    },
    flatlist: {
      overflow: "hidden",
      width: "100%",
      flex: 9,
      flexDirection: "column",
      backgroundColor: "#CFB997"
    },
    textBlack: {
      color: "black",
      textAlign: "center",
      margin: 30,
     
    },
    text: {
      color: "white",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "600",
    },
  });
  