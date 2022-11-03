import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { auth, db } from "../firebase/config";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false,
        error: null,
        loader: true,
    };
  }

  handleRegister(email, password, username) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        db.collection("users").add({
          username: username,
          createdAt: Date.now(),
        });
        alert("¡Usuario registrado!");
        response.user.updateProfile({
          displayName: username,
        });
        this.setState({
          loggedIn: true,
        });
      })
      .catch((error) => {
        console.log(error);
        if (
          error ==
          "Error: The email address is already in use by another account."
        ) {
          alert("Este e-mail ya está registrado. Por favor, utilice otro.");
        }
        this.setState({
          error: "Error en el registro.",
        });
      });
  } //Register

  handleLogin(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        alert("Iniciaste sesión.");
        this.setState({
          loggedIn: true,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error en el inicio de sesión.");
        this.setState({
          error: "Error en el inicio de sesión.",
        });
      });
  } //Login

  render() {
    const Drawer = createBottomTabNavigator();

    return (
      <Drawer.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Publicar") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Buscar") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Mi perfil") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Registrarme") {
              iconName = focused ? "person-add" : "person-add-outline";
            } else if (route.name === "Iniciar sesión") {
              iconName = focused ? "log-in" : "log-in-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        })}
        tabBarOptions={{
          activeBackgroundColor: "#4a4e69",
          inactiveBackgroundColor: "#22223b",
          showLabel: false,
        }}
      >
          <>
            <Drawer.Screen name="Iniciar sesión">
            {(props) => (
                <Login
                  {...props}
                  handleLogin={(email, password) =>
                    this.handleLogin(email, password)
                  }
                  loader={this.state.loader}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Registrarme">
            {(props) => (
                <Register
                  {...props}
                  handleRegister={(email, password, username) =>
                    this.handleRegister(email, password, username)
                  }
                />
              )}
            </Drawer.Screen>
          </>
      </Drawer.Navigator>
    ); 
  } 
} 