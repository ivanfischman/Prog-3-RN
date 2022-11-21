import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../screens/Post";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      userActivo: {}
    };
  } 

  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.displayName)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (docs) => {
          let postsAux = [];
          docs.forEach((doc) => {
            postsAux.push({
              id: doc.id,
              data: doc.data(),
            });
          }); // For each
          this.setState({
            posts: postsAux,
          });
          console.log(this.state.posts);
          console.log("HOLA");
        } // docs
      ); //Snapshot

      db.collection('users').onSnapshot(docs=>{
        docs.forEach(doc=>{
            if(auth.currentUser.email === doc.data().email){
                this.setState({
                    userActivo: {
                        id:doc.id, 
                        data: doc.data(),
                    }
                })
                console.log("HOLA2")
            console.log(this.state.userActivo)
            }
        })
    })
  } //Component

  addPostRedirect() {
    this.props.navigation.navigate("NewPost");
  }

  logOut(){
    auth.signOut();
    this.props.navigation.navigate("Register")
  }

  render() {
    return (
      <>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.inline}>
                <Text style={styles.username}>
                  {auth.currentUser.displayName}
                </Text>
                <TouchableOpacity onPress={() => this.logOut()}>
                  <Ionicons
                    style={styles.icon}
                    name="log-out-outline"
                    size="20px"
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {this.state.posts.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.flatlist}
                data={this.state.posts}
                keyExtractor={(post) => post.id.toString()}
                renderItem = {({item}) => <Post dataPost={item} {...this.props} />}
              />
            ) : (
              <View style={styles.noFlatlist}>
                <Text style={styles.textBlack}>
                  No tenés niguna publicación.
                </Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.addPostRedirect()}
                >
                  <Text>¡Creá tu primera publicación!</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
    fotoPerfil: {
        height: "25px",
        width: "25px",
        borderRadius: 50
    },
  container: {
    overflow: "hidden",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa",
    color: "#ff9f68",
  },
  header: {
    backgroundColor: "#22223b",
    boxSizing: "border-box",
    width: "100%",
    padding: 10,
    position: "relative",
    zIndex: 0,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  inline: {
    flexWrap: "wrap",
    alignItems: "space-between",
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between",
  },
  icon: {
    margin: 5,
  },
  flatlist: {
    overflow: "hidden",
    width: "100%",
    flex: 9,
    flexDirection: "column",
  },
  noFlatlist: {
    overflow: "hidden",
    width: "100%",
    flex: 9,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#ffb703",
    color: "black",
    textAlign: "center",
    padding: 7,
    marginTop: 5,
    borderRadius: 15,
    width: "80%",
  },
  text: {
    color: "white",
    textAlign: "center",
    margin: 5,
  },
  textBlack: {
    color: "black",
    textAlign: "center",
    margin: 30,
  },
  username: {
    textAlign: "left",
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    padding: 5,
  },
});
