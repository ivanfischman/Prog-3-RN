import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import { FlatList, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Post from './Post';

export default class UserProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        data: [],
        
        
      };
      console.log(this.state.dataUser)
    } 
  
    componentDidMount() {
        db.collection("posts")
          .orderBy("createdAt", "desc")
          .where("owner", "==", this.props.route.params.owner)
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
            } // docs
          ); //Snapshot
    }
    
    render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
          <Text style={styles.text}>
                {this.props.route.params.owner}
          </Text>
          <Text style={styles.bio}>
               biografía: {this.props.route.params.bio}
          </Text>
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
  backgroundColor: "#22223b",
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
