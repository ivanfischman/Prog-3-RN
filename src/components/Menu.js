import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Buscador from '../screens/Buscador';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
//lo creo como componente porque menu no es una vista, es un componente que nos va a permitir navegar entre vistas 
//necesito que menu sea como padre de Home y y de perfil
//indica que los componentes dentro van a tener navegacion tab 
function Menu() {
  return ( 
      <Tab.Navigator>
        <Tab.Screen 
            name="Home" 
            options ={
                { tabBarIcon: () =><Entypo name="home" size={24} color="black" />}
            }
            component={Home} 
        />

        <Tab.Screen
            name="Profile" 
            options ={
                { tabBarIcon: () =><AntDesign name="user" size={24} color="black" />}
            }
            component={Profile} 
        />   

        <Tab.Screen
            name="NewPost"
            options ={
                { tabBarIcon: () =><Entypo name="camera" size={24} color="black" />}
            }
            component={NewPost}
        /> 

        <Tab.Screen 
            name="Buscador"
            options={
                { tabBarIcon: () =><AntDesign name="search1" size={24} color="black" />}
            }
            component= {Buscador}
        />
      </Tab.Navigator>
    
  );
}

export default Menu;
