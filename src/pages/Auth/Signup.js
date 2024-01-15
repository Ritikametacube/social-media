import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Context/AuthContext';

const url = 'https://b1fc-2409-40d4-19-3b5a-998-137-c3dd-5f.ngrok-free.app'

const Signup = ({ navigation }) => {
    const [formData, setFormData] = useState({ email: "", password: "", name: "", username: "" })
    const { setCurrentUser } = useContext(AuthContext)

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${url}/api/signup`, { ...formData, passwordConfirm: formData.password })
            await AsyncStorage.setItem("token", response.data.token)
            setCurrentUser(response.data)
            navigation.navigate("Bottom")

        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Account</Text>
            <Text style={styles.subheader}>Connect with your friend today!</Text>
            <TextInput value={formData.name} onChangeText={val => setFormData(prev => ({ ...prev, name: val }))} style={styles.input} placeholderTextColor={"grey"} placeholder="Full Name" keyboardType="email-address" />
            <TextInput value={formData.username} onChangeText={val => setFormData(prev => ({ ...prev, username: val }))} style={styles.input} placeholderTextColor={"grey"} placeholder="Username" keyboardType="email-address" />
            <TextInput value={formData.email} onChangeText={val => setFormData(prev => ({ ...prev, email: val }))} style={styles.input} placeholderTextColor={"grey"} placeholder="Email address" keyboardType="email-address" />
            <TextInput value={formData.password} onChangeText={val => setFormData(prev => ({ ...prev, password: val }))} style={styles.input} placeholderTextColor={"grey"} placeholder="Password" secureTextEntry />
            <TouchableOpacity onPress={handleSignUp} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>OR</Text>
            <View style={{ flexDirection: "row" }}>
                <View>
                    <Text style={{ color: "black" }}>Have an Account?</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginLeft: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "#3493D9", textDecorationLine: "underline" }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    orText: {
        color: "black",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    }, passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        padding: 4,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "black"
    },
    subheader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        color: "black"
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: "black",
        borderRadius: 20
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    label: {
        margin: 8,
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
    orText: {
        marginVertical: 20,
        color: "black"
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    socialButton: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
    },
    socialText: {
        color: '#555555',
    }
});

export default Signup