import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const url = 'https://b1fc-2409-40d4-19-3b5a-998-137-c3dd-5f.ngrok-free.app'

const UserPost = ({ navigation, route }) => {
    const { currentUser } = useContext(AuthContext)
    const postId = route.params.postid;

    const [post, setPost] = useState()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const { data } = await axios.get(
                    `${url}/api/post/${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setPost(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <View>
            <PostContent navigation={navigation} currentUser={currentUser} postData={post} />
        </View >
    );
};

const PostContent = ({ postData, currentUser, navigation }) => {
    const [post, setPost] = useState(postData)

    useEffect(() => {
        setPost(postData)
    }, [postData])

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        if (!post) return;
        setIsLiked(post.likes?.includes(currentUser?._id));
    }, [post, currentUser])

    const handleLikePost = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const { data } = await axios.patch(
                `${url}/api/post/like`,
                { postId: post._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPost(data);
            setIsLiked(true);
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleUnlikePost = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const { data } = await axios.patch(
                `${url}/api/post/unlike`,
                { postId: post._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPost(data);
            setIsLiked(false);
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleDeletePost = async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            await axios.delete(`${url}/api/post/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigation.goBack();
        } catch (error) {
            console.log(error.response);
        }
    };

    return post && <View
        style={{
            paddingBottom: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.1,
        }}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('../../storage/images/userProfile.png')}
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <View style={{ paddingLeft: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: "black" }}>
                        {currentUser.name}
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={handleDeletePost}>
                <MaterialIcons name="delete" style={{ fontSize: 20, color: "black" }} />
            </TouchableOpacity>
        </View>
        <View
            style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Image
                source={{ uri: post.image }}
                style={{ width: '100%', height: 400 }}
            />
        </View>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 15,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={!isLiked ? handleLikePost : handleUnlikePost}>
                    <AntDesign
                        name={isLiked ? 'heart' : 'hearto'}
                        style={{
                            paddingRight: 10,
                            fontSize: 20,
                            color: isLiked ? 'red' : 'black',
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionic
                        name="chatbubble-outline"
                        style={{ fontSize: 20, paddingRight: 10, color: "black" }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="navigation" style={{ fontSize: 20, color: "black" }} />
                </TouchableOpacity>
            </View>
            <Feather name="bookmark" style={{ fontSize: 20, color: "black" }} />
        </View>
        <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ color: "black" }}>
                Liked by {isLiked ? 'you and' : ''}{' '}
                {post.likes.length} others
            </Text>
            <Text
                style={{
                    fontWeight: '700',
                    fontSize: 14,
                    paddingVertical: 2,
                    color: "black"
                }}>
                {post.body}
            </Text>
            <Text style={{ opacity: 0.4, paddingVertical: 2, color: "black" }}>
                View all comments
            </Text>
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../storage/images/userProfile.png')}
                        style={{
                            width: 25,
                            height: 25,
                            borderRadius: 100,
                            backgroundColor: 'orange',
                            marginRight: 10,
                        }}
                    />
                    <TextInput
                        placeholder="Add a comment "
                        style={{ opacity: 0.5, color: "black" }}
                        placeholderTextColor={"grey"}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo
                        name="emoji-happy"
                        style={{ fontSize: 15, color: 'lightgreen', marginRight: 10 }}
                    />
                    <Entypo
                        name="emoji-neutral"
                        style={{ fontSize: 15, color: 'pink', marginRight: 10 }}
                    />
                    <Entypo
                        name="emoji-sad"
                        style={{ fontSize: 15, color: 'red' }}
                    />
                </View>
            </View>
        </View>
    </View>
}

export default UserPost;
