import React, { Component } from 'react'
import { db } from '../firebase/config';
import { FlatList, View, Text, StyleSheet, Image } from 'react-native'
import Post from './Post';

export default class UserProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        data: [],
      };
      
    } 
  
    componentDidMount() {
        db.collection("posts")
          .orderBy("createdAt", "desc")
          .where("owner", "==", this.props.route.params.owner)
          .onSnapshot(
            (docs) => {
              let posts = [];
              docs.forEach((doc) => {
                posts.push({
                  id: doc.id,
                  data: doc.data(),
                });
              }); 
              this.setState({
                posts: posts,
              });
            } 
          ); 
    }
    
    render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.inline}>
                <Image source={{uri: this.props.route.params.image}} style={styles.fotoPerfil}/> 
                <Text style={styles.text}>
                        {this.props.route.params.owner}
                </Text>
                <Text style={styles.bio}>
                    Biografía: {this.props.route.params.bio}
                </Text>
            </View>
          </View>
        {this.state.posts.length > 0 ?
            <FlatList
              data={this.state.posts}
              style={styles.flatlist}
              keyExtractor={(post) => post.id.toString()}
              renderItem = {({item}) => <Post dataPost={item} {...this.props} />}
            /> : 
            <View style={styles.noFlatlist}>
                <Text style={styles.textBlack}>
                  Este usuario no tiene niguna publicación.
                </Text>
            </View>
           
        }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    fotoPerfil: {
        height: "30px",
        width: "30px",
        borderRadius: 50
    },
    text: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    fontSize: 15,
    padding: 5,
    },
    flatlist: {
    overflow: "hidden",
    width: "100%",
    flex: 9,
    flexDirection: 'column',
    },
    header: {
    backgroundColor: "#61764B",
    width: '100%',
    padding: 10,
    alignContent: "center"
    },
    container: {
    overflow: "hidden",
    flex: 1,
    width: "90%",
    justifyContent: "center",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2e9e4",
    color: "#ff9f68",
    },
    bio: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    padding: 5,
    },
    inline: {
        flexWrap: "wrap",
        alignItems: "space-between",
        flexDirection: "row",
        margin: 5,
        justifyContent: "space-between",
      },
    noFlatlist: {
        overflow: "hidden",
        width: "100%",
        flex: 9,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        },
    textBlack: {
        color: "black",
        textAlign: "center",
        margin: 30,
        }
  });
