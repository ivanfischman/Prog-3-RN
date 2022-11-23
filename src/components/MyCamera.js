import React, { Component } from 'react';
import {Camera} from "expo-camera"
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { storage } from '../firebase/config';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            uri:"",
        }
        this.metodosDeCamara=""
     }
  
     componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(() => this.setState({
            permission: true
        }))
        .catch(err => console.log(err))
     }

     tomarFoto(){
        console.log("tomar foto") //metodos de camara 
        this.metodosDeCamara.takePictureAsync()
        
            .then(photo => {
                this.setState({
                    uri: photo.uri, //esta es la respuesta de takepicturesasyn
                    showCamera: false//cuando saco la foto, ya dejo de mostrar la camara 
                })
            })
            .catch (err => console.log(err))

     }

     //la foto la guardo primero en el storage y despues en la db
     guardarFoto(){
        fetch(this.state.uri) 
            .then(res => res.blob())
            .then(image => {//aca voy a usar los metodos de storage - los importo desde la carpeta config donde los tengo importados 
                const ref = storage.ref(`photo/${Date.now()}.jpg`) //en qué directorio la voy a guardar, creo la referencia - fecha con now que es minutos, segundos y milisegundas 
                ref.put(image) //esto devuelve una promesa tmb - es como un callback hell  
                    .then(() => { 
                        ref.getDownloadURL()
                            .then((uri)=> { 
                                this.props.onImageUpload(uri) //viene del componente padre 

                            })
                    })
            })
            .catch(err => console.log(err))
     }
     
     clearFoto(){
        this.setState({
            uri: "",
            showCamera: true 
        })
     }
/*  
    recibo un parametro metodos de camra y la arrow lo que hace es a los metodos que ya tengo agregarles los nuevos  */
    render() {
    return (
        <View style={styles.container}>
        {this.state.uri ? (
          <>
            <Image style={styles.preview} source={{ uri: this.state.uri }} />
            <View style={styles.uploadImage}>
              <TouchableOpacity onPress={() => this.guardarFoto()}>
                <Ionicons name="checkmark-circle-outline" size="50px" color="white"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.clearFoto()}>
                <Ionicons name="close-circle-outline" size="50px" color="white"/>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref= {(metodosDeCamara) => this.metodosDeCamara = metodosDeCamara} 
            />
            <TouchableOpacity style={styles.uploadImage} onPress={() => this.tomarFoto()}>
              <Ionicons
                name="camera"
                size="50px"
                color="white"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      width: "100%",
    },
    preview: {
      flex: 1,
      width: "100%",
    },
    camera: {
      width: "100%",
      backgroundColor: '#001219',
    },
    uploadImage: {
      flexDirection: 'row',
      padding: 10,
      width: '100%',
      justifyContent: 'space-around',
      backgroundColor: "#273B33"
    },
    field: {
      width: "80%",
      backgroundColor: "#09009B",
      color: "#FFA400",
      padding: 10,
      marginVertical: 10,
    },
    button: {
      width: "30%",
      backgroundColor: "#0F00FF",
    },
    text: {
      color: "#FFA400",
      textAlign: "center",
    },
  });
  

