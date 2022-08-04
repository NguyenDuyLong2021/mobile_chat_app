import { NavigationContainer } from "@react-navigation/native";
import { useState, useReducer, useEffect, useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNav from "./src/navigators/BottomNav";
import StackAuth from "./src/navigators/StackAuth";
import { available } from "./src/themes/_availables";
import { AsyncStorage } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import AuthContext from "./context";
const Stack = createNativeStackNavigator();
export default function App({ navigation }) {
  // // console.log("đã đăng nhập",AsyncStorage.getItem("USER").then((q) => JSON.parse(q)) !== Promise)
  // AsyncStorage.getItem("USER").then((q) => console.log("nó nè",JSON.parse(q)));
  // // signOut(getAuth()).then(q=>console.log("work"))

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":{
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        }
        case "SIGN_OUT":{
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }

        }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={{ colors: available.color.white }}>
        {/* {AsyncStorage.getItem("USER").then((q) => JSON.parse(q)) !== Promise ? (
        <BottomNav />
      ) : (
        <StackAuth />
      )} */}
        <Stack.Navigator>
          {state.isSignout===false ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Main"
              component={BottomNav}
            ></Stack.Screen>
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={StackAuth}
            ></Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
    // <Chat/>
  );
}
