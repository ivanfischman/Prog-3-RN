import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity, 
    FlatList, View
  } from "react-native";
import firebase from "firebase";
import { auth, db } from "../firebase/config";

export default class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            comentario: "",
            comment: []
        }
    }

    componentDidMount() {
        db.collection("posts")
            .doc(this.props.route.params.id)
            .onSnapshot(doc => {
                
                this.setState({
                    /* en doc.data().comments esta el array de comentarios de firebase */
                    comment: doc.data().comments
                })

                console.log(this.state.comment)
                console.log(doc.data().comments)
            })
    }

    comment() {
        db.collection("posts")
        .doc(this.props.route.params.id)
        .update({
            /* Guardamos el comentario en el array comments */
            comments: firebase.firestore.FieldValue.arrayUnion({
              owner: auth.currentUser.email,
              comentario: this.state.comentario,
            }),
          })
          .then(() => {
            this.setState({
              /* Esto es para borrar del textInput el comentario despues de guardarlo */
              comentario: "",
            });
          });
    }

  render() {
    console.log(this.props.route.params.id)

    return (
      <>
        <Text> COMMENTS </Text>
        {this.state.comment.length != 0 ? (
        <FlatList
            data={this.state.comment}
            keyExtractor={(comment) => comment.id}
            renderItem={({ item }) => (
                <View style={styles.inline}>
                    <View style={styles.inlineNear}>
                    <Text style={styles.commentBold}>{item.owner}</Text>
                    <Text style={styles.comment}>{item.comentario}</Text>
                    </View>
                </View>
            )}
        />
        ) : (
            <Text style={styles.comment}>
              Aún no hay comentarios. Sé el primero en opinar.
            </Text>
          )}
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Escribe un comentario..."
          placeholderTextColor="#d7d5d5"
          multiline={true}
          numberOfLines={3}
          onChangeText={(text) => this.setState({ comentario: text })}
          value={this.state.comentario}
        />
        <TouchableOpacity
          style={this.state.comentario == "" ? styles.btnDisabled : styles.btn}
          onPress={() => this.comment()}
          disabled={this.state.comentario == "" ? true : false}
        >
          <Text>Comentar</Text>
        </TouchableOpacity>
      </>
    )
  }
}

const styles = StyleSheet.create({
    inline: {
      flexWrap: "wrap",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    inlineNear: {
      flexWrap: "wrap",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    field: {
      color: "black",
      flex: 1,
      width: "100%",
      justifyContent: "center",
      padding: 10,
      borderRadius: 15,
      backgroundColor: "rgba(0, 0, 0, 0.247)",
    },
    comment: {
      maxWidth: 170,
      padding: 5,
      color: "black",
    },
    commentBold: {
      padding: 5,
      color: "black",
      fontWeight: "bold",
    },
    btn: {
      backgroundColor: "#ffb703",
      color: "black",
      textAlign: "center",
      padding: 7,
      marginTop: 5,
      borderRadius: 15,
    },
    btnDisabled: {
      backgroundColor: "#e9c46a",
      textAlign: "center",
      padding: 7,
      marginTop: 5,
      borderRadius: 15,
    },
}); //Styles