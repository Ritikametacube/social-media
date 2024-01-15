import React, { useEffect } from 'react';
import { View, TextInput } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Axios } from 'axios';

const url = 'https://b1fc-2409-40d4-19-3b5a-998-137-c3dd-5f.ngrok-free.app'

const SearchBox = ({ setSearch, search, setSearchUsers }) => {
  useEffect(() => {
    const controller = new AbortController()
    if (!search) {
      setSearchUsers([]);
      return
    }
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${url}/api/user?name=${search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal
        })
        setSearchUsers(response.data)
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log(error)
        }
      }
    }

    fetchUsers();
    return () => {
      controller.abort()
    }
  }, [search])

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'relative',
      }}>
      <Ionic
        name="search"
        style={{
          fontSize: 18,
          opacity: 0.7,
          position: 'absolute',
          zIndex: 1,
          left: 25,
          color: "black"
        }}
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#909090"
        style={{
          width: '94%',
          backgroundColor: '#EBEBEB',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          padding: 4,
          paddingLeft: 40,
          color: "black"
        }}
        value={search}
        onChangeText={val => setSearch(val)}
      />
    </View>
  );
};

export default SearchBox;
