import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';

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
            component={Home} 
           />

          <Tab.Screen  
            name="Profile" 
            component={Profile} />   

            <Tab.Screen
            name="NewPost"
            component={NewPost}
            /> 
      </Tab.Navigator>
    
  );
}

export default Menu;
