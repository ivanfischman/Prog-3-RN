import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

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

    deletePost(id) {
        db.collection("posts").doc(id).delete()
    }

	render() {
        console.log(this.props.dataPost)
		return (
			<View style={styles.separator}>
                <Image
                    style={styles.image}
                    source={{ uri: this.props.dataPost.data.url }}
                />
				<Text>Post de: {this.props.dataPost.data.owner}</Text>
				<Text>Texto del Post: {this.props.dataPost.data.description}</Text>
				<Text>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
				{this.state.myLike ? (
					<TouchableOpacity onPress={() => this.unLike()}>
						<Text>Quitar Like</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => this.like()}>
						<Text>Like</Text>
					</TouchableOpacity>
				)}
                {
                    this.props.dataPost.data.owner == auth.currentUser.email ? (
                    <TouchableOpacity onPress={() => this.deletePost(this.props.dataPost.id)}>
						<Text>Borrar</Text>
					</TouchableOpacity>
                    ) : (
                        null 
                    )
                }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	separator: {
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 20,
	},
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
      },
});

export default Post;