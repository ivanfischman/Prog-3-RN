import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import Ionicons from "react-native-vector-icons/Ionicons";

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cantidadDeLikes: this.props.dataPost.data.likes.length,
			myLike: false,
		};
	}

	componentDidMount() {
		if (this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
			this.setState({
				myLike: true,
			});
		}
	}

	like() {
		//Agregar el email del user logueado en el array
		db
			.collection('posts')
			.doc(this.props.dataPost.id)
			.update({
				likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
			})
			.then(() =>
				this.setState({
					cantidadDeLikes: this.state.cantidadDeLikes + 1,
					myLike: true,
				})
			)
			.catch((error) => console.log(error));
	}

    unLike() {
        db
			.collection('posts')
			.doc(this.props.dataPost.id)
			.update({
				likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
			})
			.then(() =>
				this.setState({
					cantidadDeLikes: this.state.cantidadDeLikes - 1,
					myLike: false,
				})
			)
			.catch((error) => console.log(error));
    }

    deletePost(id) {
        db.collection("posts").doc(id).delete()
    }

	render() {
        console.log(this.props.dataPost)
		return (
			<View style={styles.container}>
                <View style={styles.inline}>
                    <Text style={styles.username}>
                        <Text style={styles.paddingLeft}>
                            {this.props.dataPost.data.owner}
                        </Text>
                    </Text>
                    {
                        this.props.dataPost.data.owner == auth.currentUser.email ? (
                        <TouchableOpacity onPress={() => this.deletePost(this.props.dataPost.id)}>
                            <Ionicons name="trash" size="20px" color="red" style={styles.trash} />
                        </TouchableOpacity>
                        ) : (
                            null 
                        )
                    }
                </View>
                <Image
                    style={styles.image}
                    source={{ uri: this.props.dataPost.data.url }}
                />
                <View style={styles.inline}>
                    <View style={styles.inlineNear}>
                        <Text style={styles.posteoText}>{this.props.dataPost.data.owner}</Text>
                            <Text style={styles.text}>
                                {this.props.dataPost.data.description}
                            </Text>
                    </View>
                    {!this.state.myLike ? (
                        <TouchableOpacity onPress={() => this.like()}>
                            <Ionicons
                            style={styles.heartIcon}
                            name="heart-outline"
                            size="20px"
                            color="white"
                            />
                        </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => this.unLike()}>
                            <Ionicons
                            style={styles.heartIcon}
                            name="heart"
                            size="20px"
                            color="red"
                            />
                        </TouchableOpacity>
                        )}
                        <View style={styles.inlineNear}>
                            <Text style={styles.text}>
                                {this.props.dataPost.data.comments.length}
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", {id: this.props.dataPost.id})}> 
                            <Ionicons
                                    style={styles.heartIcon}
                                    name="chatbubble-ellipses"
                                    size="20px"
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                </View>
                <Text style={styles.likes}>Likes: {this.state.cantidadDeLikes}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: 200,
      borderRadius: 12,
    },
    inline: {
      flexWrap: "wrap",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
    },
    inlineNear: {
      flexWrap: "wrap",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    container: {
      flex: 1,
      width: "90%",
      justifyContent: "center",
      padding: 10,
      margin: "auto",
      marginTop: 15,
      borderRadius: 15,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: "#4A4E69",
    },
    text: {
      color: "white",
      textAlign: "center",
      padding: 5,
    },
    heartIcon: {
      marginLeft: 10,
    },
    username: {
      textAlign: "left",
      color: "white",
      fontWeight: "600",
      fontSize: 15,
      padding: 5,
      paddingBottom: "12px"
    },
    modal: {
      border: "none",
      width: "100%",
      marginTop: 10,
    },
    paddingLeft: {
      paddingLeft: "5px",
      color: "white",
      paddingBottom: "12px"
    },
    trash: {
        marginBottom: "12px"
    },
    posteoText: {
        textAlign: "left",
        color: "white",
        fontWeight: "600",
        fontSize: 15,
        padding: 5,
      },
    likes: {
    textAlign: "left",
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    padding: 5,
    paddingLeft: "9px"
    },
  }); //Styles

export default Post;