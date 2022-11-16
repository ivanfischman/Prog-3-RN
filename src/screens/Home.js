import React, {Component} from 'react';
import { db } from '../firebase/config';
import { ScrollView,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
import Post from './Post';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[]
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
                    <Text>Posteos</Text>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
<<<<<<< HEAD
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
=======
                        /* necesitamos el ...this.props porque necesitamos pasarle el objeto de navegacion (navegation y route) */
                        renderItem = {({item}) => <Post dataPost={item} {...this.props} />}
>>>>>>> 2c26d448a52d011670bc66a0295890857a33337f
                    />
                </ScrollView>
        )
    }
}

export default Home;