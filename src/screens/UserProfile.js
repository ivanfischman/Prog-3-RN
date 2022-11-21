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
          .where("owner", "==", this.props.route.params.owner) 
          // .orderBy("createdAt", "desc")
          .onSnapshot(
            (docs) => {
              let userPosts = [];
              docs.forEach((doc) => {
                userPosts.push({
                  id: doc.id,
                  data: doc.data(),
                });
              }); // For each
              this.setState({
                posts: userPosts,
              });
              
            } // docs
          ); //Snapshot

         
              
              
             //Snapshot
      } //Component
    render() {
    return (
        <View>
          <View>
          <Text style={{}}>
                 Hola {this.props.route.params.nombreUsuario}
          </Text>
          </View>
        {this.state.posts.length > 0 ?
            <FlatList
              data={this.state.posts}
              keyExtractor={(post) => post.id.toString()}
              renderItem = {({item}) => <Post dataPost={item} {...this.props} />}
            /> : 
            <Text> No hay posteos!</Text>
           
        }
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
username: {
  textAlign: "left",
  color: "white",
  fontWeight: "600",
  fontSize: 15,
  padding: 5,
}}})