import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { layouts } from "../themes/_layout";
import { utils } from "../themes/utils";
import { available } from "../themes/_availables";
import ButtonSolidSubmit from "../components/commons_components/ButtonSolidSubmit";
import LoginSVG from "../assets/imgs/Login.img";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AsyncStorage } from "react-native";
import AuthContext from "../../context";

export default function Login({ navigation }) {
  const auth = getAuth();
  const { signIn } = React.useContext(AuthContext);
  const [authentication, setAuthentcation] = useState({
    email: "",
    password: "",
  });

  //login
  const login = () => {
    signInWithEmailAndPassword(
      auth,
      authentication.email,
      authentication.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        signIn()
        saveData({
          providerData: user.providerData,
          stsTokenManager: user.stsTokenManager,
          idUser: user.uid
        });

        // console.log(userCredential)
        // navigation.navigate("BottomNav");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const saveData = async (user) => {
    try {
      await AsyncStorage.setItem("USER", JSON.stringify(user))
    } catch (error) {
      console.log("lõi mẹ r", error);
    }
  };
  return (
    <View style={layouts.container}>
      <Image
        resizeMode="contain"
        style={utils.logo}
        source={require("../assets/imgs/LOGO.png")}
      />
      <View style={{ flex: 1 }}>
        <LoginSVG />
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <View style={{ width: availabels.width - 20 , fontWeight: '700'}}>
          <Text style={[style.lable, style.ip_user]}>Enter user name</Text>
        </View>
        <TextInput
          selectionColor={availabels.color.primary}
          style={[style.text_ip, style.ip_user]}
        /> */}
        <View style={[style.text_input_area, style.ip_user]}>
          <Image
            style={style.icon_ip}
            source={require("../assets/imgs/email.png")}
          />
          <TextInput
            selectionColor={available.color.primary}
            placeholder="Enter user name"
            style={style.text_input}
            onChangeText={(newEmail) => {
              setAuthentcation({ ...authentication, email: newEmail });
            }}
          ></TextInput>
        </View>
        <View style={[style.text_input_area, style.ip_pass]}>
          <Image
            style={style.icon_ip}
            source={require("../assets/imgs/lock.png")}
          />
          <TextInput
            selectionColor={available.color.primary}
            placeholder="Enter password"
            style={style.text_input}
            onChangeText={(newPassword) =>
              setAuthentcation({
                ...authentication,
                password: newPassword,
              })
            }
          ></TextInput>
        </View>
        <TouchableOpacity
          style={{
            width: available.width - 20,
            alignItems: "flex-end",
            marginVertical: 10,
          }}
        >
          <Text style={style.lable}>Forgot password</Text>
        </TouchableOpacity>
        <ButtonSolidSubmit name="Login" callback={login} />
      </View>
      <Text
        style={[layouts.text_center, style.help, style.ip_user]}
        onPress={() => navigation.navigate("SignUp")}
      >
        Dont have account{" "}
        <Text style={{ color: available.color.primary }}>Register</Text>
      </Text>
    </View>
  );
}
const style = StyleSheet.create({
  text_ip: {
    width: available.width - 20,
    padding: 10,
    borderWidth: 2,
    borderColor: available.color.primary,
    borderRadius: available.border_radius.r1,
    color: available.color.primary,
    fontWeight: available.fw_1,
    fontSize: available.fs_0,
  },
  lable: {
    marginStart: 10,
    fontSize: available.fs_0,
    color: available.color.grey,
  },
  ip_user: {
    marginBottom: 20,
  },
  ip_pass: {
    marginTop: 20,
  },
  help: {
    fontWeight: available.fw_2,
    fontSize: available.fs_0,
    color: available.color.grey,
  },
  //
  text_input_area: {
    flexDirection: "row",
  },
  icon_ip: {
    width: 40,
    height: 40,
  },
  text_input: {
    width: available.width - 60,
    borderBottomWidth: 1,
    borderBottomColor: available.color.grey,
    color: available.color.primary,
    padding: 10,
  },
});
