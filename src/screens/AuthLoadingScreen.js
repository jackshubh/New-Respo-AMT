import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import Background from "../components/Background";
import { theme } from "../core/theme";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { authToken } from '../api/ApiWrapper';

const AuthLoadingScreen = ({ navigation }) => {
  //const authToken = async () => await AsyncStorage.getItem('@authToken');
  if (authToken) {
    // User is logged in
    //navigation.navigate("Dashboard");
    navigation.navigate("HomeScreen");
  } else {
    // User is not logged in
    navigation.navigate("HomeScreen");
  }

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default memo(AuthLoadingScreen);
