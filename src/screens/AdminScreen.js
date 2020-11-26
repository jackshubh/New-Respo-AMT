import React, { memo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import {
  nameValidator
} from "../core/utils";
import Toast from "../components/Toast";

const AdminScreen = ({ route, navigation }) => {

  const [name, setName] = useState({ value: "", error: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: "", type: "" });

  // useEffect(() => {
  //   console.log('Test');
  //   const { itemId, otherParam } = route.params;
  // }, [])

  const _AddServiceOnPressed = async () => {
    if (loading) return;

    const nameError = nameValidator(name.value);

    if (nameError) {
      setName({ ...name, error: nameError });
      return;
    }

    setLoading(true);

    setLoading(false);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Dashboard")} />
      <Header>Admin Page</Header>
      <Logo />

      <TextInput
        label="Service Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />

      
      <Button
        loading={loading}
        mode="contained"
        onPress={_AddServiceOnPressed}
        style={styles.button}
      >
        Add Service
        </Button>

      <Text>-OR-</Text>

      <Button
        //loading={loading}
        mode="contained"
        onPress={() => navigation.navigate("AssignPermissionScreen")}
        style={styles.button}
      >
        Assign Permission
        </Button>
      <Toast message={error} onDismiss={() => setError("")} />
    </Background>
  );
};

const styles = StyleSheet.create({
  // label: {
  //   color: theme.colors.secondary
  // },
  // button: {
  //   marginTop: 24
  // },
  // row: {
  //   flexDirection: "row",
  //   marginTop: 4
  // },
  // link: {
  //   fontWeight: "bold",
  //   color: theme.colors.primary
  // }
});

export default memo(AdminScreen);