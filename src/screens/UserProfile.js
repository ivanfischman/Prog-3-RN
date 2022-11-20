import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import { FlatList, View, TouchableOpacity, Text } from 'react-native'
import Post from './Post';

export default class UserProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
      };
      console.log(props)
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
        <View>
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
