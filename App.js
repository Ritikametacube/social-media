import React, { useEffect, useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './src/components/screens/Home';
// import Search from './src/components/screens/Search';
// import Reels from './src/components/screens/Reels';
// import Activity from './src/components/screens/Activity';
// import Profile from './src/components/screens/Profile';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Status from './src/components/screenComponents/Status';
// import FriendProfile from './src/components/screenComponents/FriendProfile';
// import EditProfile from './src/components/screenComponents/EditProfile';
// import Signup from './src/pages/Auth/Signup';
// import Login from './src/pages/Auth/Login'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextProvider } from './src/Context/AuthContext';
import AppNavigator from './Navigator';

const App = () => {

  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider >
  );
};

export default App;