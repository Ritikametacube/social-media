import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { Input } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const url = 'https://3c5a-2401-4900-1c1a-79fa-b5ae-e618-8469-936.ngrok-free.app'

const CreatePost = ({ route, navigation }) => {
    const assets = route.params;
    console.log(assets)
    const [caption, setCaption] = useState("")

    const handleCreatePost = async () => {
        const token = await AsyncStorage.getItem("token");
        // const response = await fetch(assets.uri)
        // const blob = response.blob()

        // console.log(blob)

        // const formData = new FormData()
        // formData.append('body', caption);
        // formData.append('photo', blob);

        // console.log({ name: assets.fileName, type: assets.type, uri: assets.uri })
        try {
            const { data } = await axios.post(
                `${url}/api/post`,
                { filename: assets.uri, caption },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            navigation.goBack()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: assets.uri }} style={{ width: 350, height: 350, marginBottom: 20 }} />
            <Input
                labelStyle={styles.label}
                style={styles.input}
                label="Caption"
                placeholder="Write a caption..."
                placeholderTextColor={"gray"}
                inputContainerStyle={styles.inputContainer}
                maxLength={255}
                value={caption}
                onChangeText={val => setCaption(val)}
            />
            <TouchableOpacity onPress={handleCreatePost} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#fff',
        padding: 20,
    },
    buttonContainer: {
        backgroundColor: '#3493D9',
        paddingVertical: 10,
        width: '100%',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputContainer: {
        borderBottomColor: "grey",
        width: '100%',
    },
    label: {
        marginTop: 5,
        color: 'grey',
    },
    input: {
        padding: 0,
        width: '100%',
    },
});


export default CreatePost