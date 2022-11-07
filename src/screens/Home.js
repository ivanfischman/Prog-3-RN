import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Component } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { FlatList } from 'react-native-web';
import Post from "../components/Post"

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            usuarioActivo: {},
            descripcion:"", 
            posteos: []
        };
    }
//primero creo el formulrio, textinput y touchable opacity
//un state con la info que vamos a cargar (quien lo creo, descripcion, cuando se creo, likes del posteo (propiedad con un array de los mails de las personas ) y comentarios del posteo (propiedad con un array de los mails de las personas )
//crear el metodo para crear posteo
//acceder a db y acceder a posteo con su info 

//traemos los posteos porque necesitaos los id y
 //ver en que posteo estoy likeando, necesitamos el id 
    //meter el mail en la propiedad likes del posteo
    componentDidMount(){
        db.collection("users").onSnapshot((docs) => docs.forEach((doc) => {
            let usersFromDb = []
        docs.forEach((doc)=> {
            let user = doc.data();
            if(user.email ==  auth.currentUser.email){
                this.setState({
                    usuarioActivo:{
                        info: user,
                        id: doc.id
                    }
                })
            }
            usersFromDb.push({id: doc.id, data:user })
        });
        this.setState({users: usersFromDb})
    }));

    db.collection("posteos").orderBy("createdAt","==", "tercer posteo")
    .onSnapshot(docs => { 
        let postsFromDb = []
        docs.forEach((doc) => {
            let post = doc.data()
            postsFromDb.push({id: doc.id, data:post})
        })
        this.setState({posteos: postsFromDb})
    })

    }

   
    likear(){
        db.collection("posteos").doc(idDelPosteo).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
        }) .then(res => console.log(res))
        .catch((err) => console.log(err))
    }
    
    crearPosteo(){
        db
        .collection("posteos")
        .add({
            owner: auth.currentUser.email,
            descripcion: this.state.descripcion,
            createdAt: Date.now(),
            likes: [],
            comentarios:[],
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }   
    //crear posteo 
    render(){
        return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>
                    ¡Hola {auth.currentUser.displayName}!
                </Text>
            </View>

            <Text> Agregar posteo</Text>

            <TextInput keyboardType='default' placeholder='descripcion' onChangeText={(text)=> {this.setState({descripcion: text})}}/>
            <TouchableOpacity onPress ={()=>{this.crearPosteo()}}> 
                <Text> Crear posteo </Text>
             </TouchableOpacity>

 
            <FlatList
                data = {this.state.posteos}
                style={styles.flatlist}
                keyExtractor = {item => item.id}   
                renderItem={({ item }) => <Post dataItem={item}></Post>}
            />
        </View>
    ) //return
   } //render
} // componente
 /* las llaves dentrode render item es porque quiero traerme solo item del objeto, 
 */ 

 const styles = StyleSheet.create({
    container: {
      overflow: "hidden",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f2e9e4",
      color: "#ff9f68",
    },
    header: {
      backgroundColor: "#22223b",
      width: '100%',
      padding: 10,
    },
    flatlist: {
      overflow: "hidden",
      width: "100%",
      flex: 9,
      flexDirection: 'column',
    },
    text: {
      color: "white",
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
    },
  });

export default Home;