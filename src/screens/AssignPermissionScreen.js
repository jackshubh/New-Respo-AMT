import React, { memo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
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
import { CheckBox, ListItem, Icon } from 'react-native-elements'
import CustomMultiPicker from "react-native-multiple-select-list";
import axios from "axios";
import { UpdatePermissions } from '../api/ApiWrapper';

const AssignPermissionScreen = ({ navigation }) => {
  const [Servicename, setServiceName] = useState({ value: "", error: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const users = ['Sriram R', 'Alagu Sundaram', 'Aravind S', 'Chethan S', 'Kalaiselvan B', 'Parthasarathy Ganeshan', 'Parthiban', 'Vignesh Kanna K', 'Vignesh Rs', 'Vijayanaranayan', 'Vimal Arockia', 'Shubham Saraswat'];
  const service = ['Production Server', 'Pre-Production Server', 'Staging Server', 'AWS', 'Backened Service'];

  const list = [
    {
      title: 'Appointments',
      icon: 'av-timer'
    },
    {
      title: 'Trips',
      icon: 'flight-takeoff'
    },
  ]

  const _onUserSelectionsChange = (use) => {
    setSelectedUsers([...use])
  }

  const _SaveOnPressed = () => {
    if (loading) return;

    setLoading(true);
    if (selectedUsers.length == 0) {
      Alert.alert("Select Atleast one or cancel it");
      return;
    } else {
    //   UpdatePermissions(Servicename, selectedUsers)
    //     .then(() => {
    //       navigation.navigate('AdminScreen');
    //     }).catch((error) => {
    //       console.log(error);
    //     });
    Alert.alert('Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed')
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ],
    { cancelable: false });
    }
    setLoading(false);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("AdminScreen")} />
      <Header>Assign Permission Page</Header>
      <Logo />
      <TextInput
        label="Service Name"
        returnKeyType="next"
        value={Servicename.value}
        onChangeText={text => setServiceName({ value: text, error: "" })}
        error={!!Servicename.error}
        errorText={Servicename.error}
      />
      

      <CustomMultiPicker
        options={users}
        search={false} // should show search bar?
        multiple={true} //
        placeholder={"Search"}
        placeholderTextColor={'#757575'}
        returnValue={"label"} // label or value
        callback={(res) => { _onUserSelectionsChange(res) }} // callback, array of selected items
        rowBackgroundColor={"#fff"}
        rowHeight={40}
        rowRadius={30}
        iconColor={"#00a2dd"}
        iconSize={15}
        selectedIconName={"ios-checkmark-circle-outline"}
        //unselectedIconName={"ios-radio-button-off-outline"}
        scrollViewHeight={300}
      //selected={[1, 2]} // list of options which are selected by default
      />

      <Button
        loading={loading}
        mode="contained"
        onPress={_SaveOnPressed}
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

export default memo(AssignPermissionScreen);