import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../Context/AuthContext';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const url = 'https://b1fc-2409-40d4-19-3b5a-998-137-c3dd-5f.ngrok-free.app'

const EditProfile = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [formData, setFormData] = useState({ name: "", username: "", bio: "", profilePhoto: "" })

  useEffect(() => {
    setFormData({ name: currentUser.name, username: currentUser.username, bio: currentUser.bio, profilePhoto: currentUser.profilePhoto })
  }, [currentUser])

  const handleChangePhoto = async () => {
    const response = await launchImageLibrary();
    if (response.assets) {
      setFormData(prev => ({ ...prev, profilePhoto: response.assets[0].uri }))
    }
  }

  const handleUpdateUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.patch(`${url}/api/user/updateMe`, { ...formData }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setCurrentUser(data)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close-outline" style={{ fontSize: 35, color: "black" }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "black" }}>Edit Profile</Text>
        <TouchableOpacity
          onPress={handleUpdateUser}>
          <Ionic name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20, alignItems: 'center' }}>
        {formData.profilePhoto ?
          <Image
            source={{ uri: formData.profilePhoto }}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          /> : <Image
            source={require('../../storage/images/user_image.png')}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />}
        <TouchableOpacity onPress={handleChangePhoto}>
          <Text
            style={{
              color: '#3493D9',
            }}>
            Change profile photo
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <View>
          <Text
            style={{
              opacity: 0.5,
              color: "black"
            }}>
            Name
          </Text>
          <TextInput
            placeholder="name"
            value={formData.name}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
              color: "black"
            }}
            onChangeText={val => setFormData(prev => ({ ...prev, name: val }))}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text
            style={{
              opacity: 0.5,
              color: "black"
            }}>
            Username
          </Text>
          <TextInput
            placeholder="accountname"
            value={formData.username}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
              color: "black"
            }}
            onChangeText={val => setFormData(prev => ({ ...prev, username: val }))}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <TextInput
            placeholder="Bio"
            value={formData.bio}
            placeholderTextColor={"grey"}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
              color: "black"
            }}
            onChangeText={val => setFormData(prev => ({ ...prev, bio: val }))}
          />
        </View>
      </View>
      {/* <View>
        <Text
          style={{
            marginVertical: 10,
            padding: 10,
            color: '#3493D9',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#EFEFEF',
            color: "black"
          }}>
          Switch to Professional account
        </Text>
        <Text
          style={{
            marginVertical: 10,
            padding: 10,
            color: '#3493D9',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#EFEFEF',
            color: "black"
          }}>
          Persnol information setting
        </Text>
      </View> */}
    </View>
  );
};

export default EditProfile;
