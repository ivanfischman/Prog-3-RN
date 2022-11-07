import React, { Component } from 'react';
import {Camera} from "expo-camera"
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { storage } from '../firebase/config';

export default class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            uri:"",
    
        }
        this.metodosDeCamara = ""
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
        this.metodosDeCamara.takePicturesAsync()
            .then(photo => this.setState({
                uri: photo.uri, //esta es la respuesta de takepicturesasyn
                showCamera: false//cuando saco la foto, ya dejo de mostrar la camara 
            }))
            .catch (err => console.log(err))

     }

     //la foto la guardo primero en el storage y despues en la db
     guardarFoto(){
        fetch(this.state.uri) 
            .then(res => res.blob())
            .then(image => {//aca voy a usar los metodos de storage - los importo desde la carpeta config donde los tengo importados 
                const ref = storage.ref(`photo/${Date.now}.jpg`) //en qué directorio la voy a guardar, creo la referencia - fecha con now que es minutos, segundos y milisegundas 
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
      <View>
        {
            this.state.permission ?
            this.state.showCamera ?
            <View>
                <Camera
                    style={styles.cameraBody}
                    type={Camera.Constants.Type.back}
                    ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}/> 

                <TouchableOpacity
                    Style= {styles.button}
                    onPress = {() => this.tomarFoto()}>
                         <Text>Tomar foto</Text>
                </TouchableOpacity>
            </View>:
            <View>
                 
        <Image
            Style={styles.preview}
            Source={{uri:this.state.uri}}
            resizeMode="cover"/>
        
         <TouchableOpacity
            style={styles.button}
            onPress={()=> this.guardarFoto()}>
        <Text>Guardar foto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
            style={styles.button}
            onPress={()=> this.clearFoto()}>
         <Text>Borrar foto</Text>
        </TouchableOpacity>
            </View>:
            <Text> No hay permisos para la camara  </Text>
        }
      </View>
     
      
    )
    }
  }

  
   const styles = StyleSheet.create({
        cameraBody: {
            height: "88%"
        },
        button:{
            height:"28%",
            borderColor: "#ccc",
            borderWidth: 1,
            padding: 5,
            borderRadius: 4,
            marginTop:20
        },
        preview:{
            height: "88%"
        }

   })

