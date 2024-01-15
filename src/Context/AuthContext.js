import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

const url = 'https://b1fc-2409-40d4-19-3b5a-998-137-c3dd-5f.ngrok-free.app'

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            const token = await AsyncStorage.getItem("token");
            console.log(token)
            try {
                const { data } = await axios.get(
                    `${url}/api/user/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCurrentUser(data)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
