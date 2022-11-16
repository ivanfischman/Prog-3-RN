import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Buscador from '../screens/Buscador';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
//lo creo como componente porque menu no es una vista, es un componente que nos va a permitir navegar entre vistas 
//necesito que menu sea como padre de Home y y de perfil
//indica que los componentes dentro van a tener navegacion tab 
function Menu() {
  return ( 
      <Tab.Navigator>
        <Tab.Screen 
            options={{ headerShown : false }}
            name="Home" 
            component={Home} 
        />

        <Tab.Screen
            options={{ headerShown : false }}
            name="Profile" 
            component={Profile} 
        />   

        <Tab.Screen
            options={{ headerShown : false }}
            name="NewPost"
            component={NewPost}
<<<<<<< HEAD
            /> 

            <Tab.Screen 
            name="Buscador"
            component= {Buscador}/>
=======
        /> 
>>>>>>> 2c26d448a52d011670bc66a0295890857a33337f
      </Tab.Navigator>
    
  );
}

export default Menu;
