import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from "react-native"
import { auth, db } from '../firebase/config'
import MyCamera from '../components/MyCamera'
export default class NewPost extends Component {
    constructor(props){
        super(props)
        this.state = { //todo lo que voy a querer en mi posteo
            userActivo:{},
            createdAt: Date.now(),
            owner: auth.currentUser.displayName,
            description: "",
            likes: [],
            comments: [],
            showCamera: true, 
            url: "",
            nombreUsuario: ""
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs=>{
            docs.forEach(doc=>{
                if(auth.currentUser.email === doc.data().email){
                    this.setState({
                        userActivo: {
                            id:doc.id, 
                            data: doc.data(),
                        }
                    })

                }
            })
        })
    }

    guardarPost(){
        console.log("guardar post")
        db.collection("posts").add({
            owner: auth.currentUser.displayName,
            description: this.state.description,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            fotoPerfil: this.state.userActivo.data.image,
            url: this.state.url
        })
       
        .then((res) =>{
            console.log("posteo exitoso")
            this.setState({
                description: "",
                showCamera: true
            }, ()=>this.props.navigation.navigate("Home") //como el set state puede no ser inmediato, indicamos como segundo parametro donde queremos que nos dirija una vez realizado el seteo de estado 
        )})
        .catch(err => console.log(err))
    }
 
    onImageUpload(url){
        this.setState({
            url,//como se llama igual que el parametro, y son lo mismo, no hace falta que aclare el valor de la propiedad
            showCamera: false,
        })
    }
 
 //lo de onimageupload  es lo que yo necesito para mostrar la camara 
    render() {
    return (
      <View style={styles.container}>
        {
            this.state.showCamera ? 
            <MyCamera style={styles.cameraBody}
                onImageUpload = {url => this.onImageUpload(url) } 
            /> :
            <>
                <Image source={{ uri: this.state.url }} style={styles.image} />
                <TextInput
                    style = {styles.field}
                    keyboardType= "default"
                    placeholder='descripcion'
                    onChangeText={(text)=>this.setState({description:text })}
                    multiline
                />
                <TouchableOpacity
                    style={this.state.description == "" ? styles.btnDisabled : styles.btn}
                    onPress = {() => this.guardarPost()}>
                    <Text style={this.state.description == "" ? styles.btnText : null}>Guardar</Text>
                </TouchableOpacity>
            </>
        }
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
    container: {
      overflow: "hidden",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#CFB997",
      color: "#ff9f68",
    },
    field: {
      color: "black",
      flex: 1,
      width: "90%",
      justifyContent: "center",
      padding: 10,
      marginTop: 15,
      borderRadius: 15,
      backgroundColor: "rgba(0, 0, 0, 0.247)",
    },
    btn: {
      backgroundColor: "#ffb703",
      textAlign: 'center',
      padding: 7,
      margin: 10,
      borderRadius: 15,
      width: '90%',
    },
    btnDisabled: {
      backgroundColor: "#e9c46a",
      textAlign: 'center',
      padding: 7,
      margin: 10,
      borderRadius: 15,
      width: '90%',
    },
    btnText: {
      color: 'gray',
    },
    image: {
      marginTop: 15,
      height: 300,
      width: "90%",
      borderRadius: 12,
    },
  });

