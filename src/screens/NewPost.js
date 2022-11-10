import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from "react-native"
import { auth, db } from '../firebase/config'
import MyCamera from '../components/MyCamera'

export default class NewPost extends Component {
    constructor(props){
        super(props)
        this.state = { //todo lo que voy a querer en mi posteo
            createdAt: Date.now(),
            owner: auth.currentUser.email,
            description: "",
            likes: [],
            comments: [],
            showCamera: true, 
            url: ""
        }
    }

    guardarPost(){
        console.log("guardar post")
        db.collection("posts").add({
            owner: auth.currentUser.email,
            description: this.state.description,
            createdAt: Date.now(),
            likes: [],
            comments: [],
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
      <View style= {styles.container}>
        {
            this.state.showCamera ? 
            <MyCamera style={styles.cameraBody}
                onImageUpload = {url => this.onImageUpload(url) } 
            /> :

            <View>
                <Text style={styles.title}>Nuevo post</Text>
                <TextInput
                    style = {styles.field}
                    keyboardType= "default"
                    placeholder='descripcion'
                    onChangeText={(text)=>this.setState({description:text })}
                    multiline
                />
                <TouchableOpacity
                style ={styles.buttonText}
                onPress = {() => this.guardarPost()}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            </View>

        }
      </View>
    )
  }
}
 

const styles = StyleSheet.create({
    cameraBody: {
        height: "88%"
    },
    container: {
        paddingHorizontal: 10,
        marginTop: 10,
        height:"100%"
    },
    title: {
        marginBottom:20
    },
    field: {
        borderColor: "#dcdcdc",
        borderWidth:1,
        borderRadius:2,
        padding:3,
        marginBottom:8
    },
    button:{
        borderRadius:2,
        padding: 3,
        backgroundColor:"green"
    },
    buttonText:{
        color: "#fff"
    }
})

