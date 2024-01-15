import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const url = 'https://b1fc-2409-40d4-19-3b5a-998-137-c3dd-5f.ngrok-free.app'

const BottomTabView = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const [posts, setPosts] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) return;
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const { data } = await axios.get(
          `${url}/api/post`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPosts()
  }, [isFocused])

  const Posts = () => {
    return (
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("UserPosts", { postid: item._id })} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  };
  const Video = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };
  const Tags = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = focused ? 'apps-sharp' : 'apps-sharp';
            colour = focused ? 'black' : 'gray';
          }
          // else if (route.name === 'Video') {
          //   iconName = focused ? 'play-circle' : 'play-circle-outline';
          //   colour = focused ? 'black' : 'gray';
          // } else if (route.name === 'Tags') {
          //   iconName = focused ? 'person' : 'person-outline';
          //   colour = focused ? 'black' : 'gray';
          // }

          return <Ionic name={iconName} color={colour} size={22} />;
        },
      })}>
      <Tab.Screen name="Posts" component={Posts} />
      {/* <Tab.Screen name="Video" component={Video} />
      <Tab.Screen name="Tags" component={Tags} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1, // Ensures each item takes equal space
    flexDirection: 'column',
    margin: 1, // Adjust the margin as needed
  },
  image: {
    aspectRatio: 1, // Keeps the aspect ratio of images to 1:1
    flex: 1, // Ensures the image takes the full space of its container
  },
});

export default BottomTabView;
