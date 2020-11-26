import React, { memo, useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator, passwordValidator } from "../core/utils";
import Toast from "../components/Toast";
import axios from 'axios';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenEndPoint, UserInfoEndPoint, UserInfoData } from '../api/ApiWrapper';

const LoginScreen = ({ navigation }) => {
  // useEffect(() => {
  //   const authUser = firebase.auth().onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  //   return authUser;
  // });
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const _onLoginPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    // const response = await loginUser({
    //   email: email.value,
    //   password: password.value
    // });

    try {
      const response = await axios({
        method: 'post',
        url: TokenEndPoint.baseURL,
        data: {
          "username": email.value,
          "password": password.value
        }
      })
        .then(async (response) => {
          console.log(response);
          const authToken = response.data.data;
          console.log(authToken);
          const re = await axios({
            method: 'get',
            url: UserInfoEndPoint.baseURL,
            headers: { 'Authorization': 'Basic ' + authToken },
          })
            .then((re) => {
              console.log('UserInfoFetched');
            })
            .catch((error) => {
              console.log(error);
            })
          // const respnse = await AsyncStorage.setItem('@authToken', authToken)
          //   .then((respnse) => {
          //     console.log(respnse);
          //   });
          console.log('userLogged in');
          navigation.navigate('Dashboard');
        }, (error) => {
          console.log(error);
          setError(error);
        });
    }
    catch (e) {
      console.log(e);
    }
    // if (response && response.error) {
    //   setError(response.error);
    // }
    //'BAC399C194A57F4B793577876974BD8EF47308EE7CF9118951C44B18999A3C9B28EEE7FACCEDD1BB781324B9F39459E16D72B6CD52EDF3EE93CDA9E67686DC34547211AA70C36C406694006E02480B0C5CBDD7581E769A2DCBC0566CF8118F61AF1E7F55232A290882081B5AF7243629'
    setLoading(false);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("HomeScreen")} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        autoCapitalize="none"
      />

      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}

      <Button loading={loading} mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      {/* <StyledFirebaseAuth 
        uiConfig={uiconfig}
        firebaseAuth = {firebase.auth()}
      /> */}

      {/* <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> */}

      <Toast message={error} onDismiss={() => setError("")} />
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  label: {
    color: theme.colors.secondary
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});

export default memo(LoginScreen);
