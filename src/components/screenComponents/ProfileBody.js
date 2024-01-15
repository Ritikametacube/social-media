import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Button } from "@rneui/themed"
import { AuthContext } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const ProfileBody = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
  navigation
}) => {
  const { currentUser: user, setCurrentUser } = useContext(AuthContext)
  const [assets, setAssets] = useState(null)

  const handleLogout = async () => {
    await AsyncStorage.setItem("token", "")
    setCurrentUser(null)
    navigation.navigate('Login')
  }

  const openGallery = async () => {
    const response = await launchImageLibrary()
    console.log(response)
    if (response.assets) {
      navigation.push("CreatePost", response.assets[0])
    }
  }

  return (
    <View>
      {accountName ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: "black"
              }}>
              {user.username}
            </Text>
            <Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: 'black',
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={openGallery}>
              <Feather
                name="plus-square"
                style={{
                  fontSize: 25,
                  color: 'black',
                  paddingHorizontal: 15,
                }}
              />
            </TouchableOpacity>
            <Button onPress={handleLogout} style={{ borderRadius: 8 }}> Logout </Button>
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          {user.profilePhoto ?
            <Image
              source={{ uri: user.profilePhoto }}
              style={{
                resizeMode: 'cover',
                width: 80,
                height: 80,
                borderRadius: 100,
              }}
            /> : <Image
              source={require('../../storage/images/user_image.png')}
              style={{
                resizeMode: 'cover',
                width: 80,
                height: 80,
                borderRadius: 100,
              }}
            />}
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: 'bold',
              color: "black"
            }}>
            {user.name}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: "black" }}>{user.posts}</Text>
          <Text style={{ color: "black" }}>Posts</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: "black" }}>{user.followers.length}</Text>
          <Text style={{ color: "black" }}>Followers</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: "black" }}>{user.following.length}</Text>
          <Text style={{ color: "black" }}>Following</Text>
        </View>
      </View>
    </View>
  );
};

export const ProfileButtons = ({ id, name, accountName, profileImage }) => {
  const navigation = useNavigation();
  const [follow, setFollow] = useState(follow);
  return (
    <>
      {id === 0 ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: 5,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('EditProfile', {
                name: name,
                accountName: accountName,
                profileImage: profileImage,
              })
            }
            style={{
              width: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                borderColor: '#DEDEDE',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 1,
                  opacity: 0.8,
                  color: "black"
                }}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setFollow(!follow)}
            style={{ width: '42%' }}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                backgroundColor: follow ? null : '#3493D9',
                borderWidth: follow ? 1 : 0,
                borderColor: '#DEDEDE',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: follow ? 'black' : 'white' }}>
                {follow ? 'Following' : 'Follow'}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '42%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{ color: "black" }}>Message</Text>
          </View>
          <View
            style={{
              width: '10%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Feather
              name="chevron-down"
              style={{ fontSize: 20, color: 'black' }}
            />
          </View>
        </View>
      )}
    </>
  );
};
