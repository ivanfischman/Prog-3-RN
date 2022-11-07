import { StyleSheet, Text, View } from 'react-native';

import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Menu from './src/components/Menu';

import { NavigationContainer } from '@react-navigation/native'; //contenedor general 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Objeto con dos componentes Navigator y Screen - guardo la ejecucion de la funcion de al linea 8 

const Stack = createNativeStackNavigator();

{/* aca agrego todas las screen, accedo al objeto que esta en la constante Stack (arriba) */}
{/* la primer stack screen que ponesmos, es la primera que va a ver el usuario  */}
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator> 
				<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} /> 

				<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />

				<Stack.Screen options={{ headerShown: false }} name="Menu" component={Menu} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

