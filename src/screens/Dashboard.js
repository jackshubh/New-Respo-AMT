import React, { memo, useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import CustomList from "../components/List";
import { logoutUser } from "../api/auth-api";
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
//import { ListItem } from 'react-native-elements';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import DropDownPicker from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { UserInfoEndPoint, UserInfoData, authToken, ListOfServices } from '../api/ApiWrapper';

const Dashboard = ({ navigation }) => {
  //const authToken = async () => await AsyncStorage.getItem('authToken');
  const [userSelection, setUserSelection] = useState('');
  const [user, setUser] = useState({
    country: '',
    emailId: '',
    fullName: '',
    isIndianUser: false,
    mobileNumber: '',
    userId: 0,
    userSegment: '',
    userType: ''
  });

  useEffect(async () => {
    const response = await axios({
      method: 'get',
      url: UserInfoEndPoint.baseURL,
      headers: { 'Authorization': 'Basic ' + authToken },
    })
      .then((response) => {
        let objTemp = {};
        objTemp = response.data.data;
        setUser({
          country: objTemp.country,
          emailId: objTemp.emailId,
          fullName: objTemp.fullName,
          isIndianUser: objTemp.isIndianUser,
          mobileNumber: objTemp.mobileNumber,
          userId: objTemp.userId,
          userSegment: objTemp.userSegment,
          userType: objTemp.userType
        })
        console.log('UserInfoFetched');
      })
      .catch((error) => {
        console.log(error);
      })

  }, [])

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aid5",
      title: "Production Server",
    },
    {
      id: "3ac68afc-c605-48d3-atf8-fbd91aa97f63",
      title: "Pre-Production Server",
    },
    {
      id: "58694a0f-3da1-471f-bdu6-145571e29d72",
      title: "AWS",
    },
    {
      id: "bd7ajbea-46c2-aed5-3ad53abb28ba",
      title: "EDX",
    },
    {
      id: "3ac6gafc-c605-a4f8-fbd91aa97f63",
      title: "Coursera",
    },
    {
      id: "586d4a0f-3da1-bd96-145571e29d72",
      title: "MicroService",
    },
    {
      id: "bd7acdea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Random",
    }
  ];

  const _onUserSelectionsChange = (item) => {
    setUserSelection(item);
  }

  const AdminButtonHide = () => {
    if (user.userType == 'Admin') return null;
    else {
      return (
        <Button mode="outlined" onPress={() => navigation.navigate("AdminScreen", { itemId: 86, otherparams: 'anything you want here' })}>
          Admin
        </Button>
      )
    }
  }
  const LinkToBeDisplayed = () => {
    // const arr = await ListOfServices().then((resp) =>{

    // });
    return (
      <View>

      </View>
    )
  }

  return (
    <View>
      <Background>
        {/* <View>
        <Button mode="outlined" style={styles.AdminButton}>
          Admin
        </Button>
      </View>
      <View> */}
        <Header>Let’s start</Header>
        <Logo />


        <Paragraph>
          {user.fullName}
        </Paragraph>
        {/* <DropDownPicker
          items={[
            { label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true },
            { label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" /> },
            { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
          ]}
          defaultValue='usa'
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => { _onUserSelectionsChange(item) }}
        /> */}
        <CustomList>
          {DATA}
        </CustomList>
        <Button mode="outlined" onPress={() => logoutUser(navigation)}>
          Logout
        </Button>
        <AdminButtonHide />{/*Customer is only for test purpose */}
        {/* <Button mode="outlined" onPress={() => navigation.navigate("AdminScreen")}>
          Admin
        </Button> */}
      </Background>
      {/* <FlatList

      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  AdminButton: {
    // flex: 1,
    // position: 'absolute',
    // right: 0,
    // top: 5,
  }
});

export default memo(Dashboard);
