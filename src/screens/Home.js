import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { ScrollView,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         View,
         FlatList, 
         Image } from 'react-native';
import Post from './Post';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            users: []
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts
                })
            }
        )
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.text}>
                            ¡Hola {auth.currentUser.displayName}!
                        </Text>
                    </View>
                    <FlatList 
                        data={this.state.posts}
                        style={styles.flatlist}
                        keyExtractor={post => post.id}
                        /* necesitamos el ...this.props porque necesitamos pasarle el objeto de navegacion (navegation y route) */
                        renderItem = {({item}) => <Post dataPost={item} {...this.props} />}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      overflow: "hidden",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f2e9e4",
      color: "#ff9f68",
    },
    header: {
      backgroundColor: "#22223b",
      width: '100%',
      padding: 10,
    },
    flatlist: {
      overflow: "hidden",
      width: "100%",
      flex: 9,
      flexDirection: 'column',
    },
    text: {
      color: "white",
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
    },
  });  

export default Home;