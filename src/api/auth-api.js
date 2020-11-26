import axios from 'axios';

export const logoutUser = ({ navigation }) => {
  localStorage.clear();
  window.location.href = '/';
  navigation.navigator('HomeScreen');
};
