import { createContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const setToken = async (key, value) => {
        if (Platform.OS === 'web') {
            localStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    };

    const getToken = async (key) => {
        if (Platform.OS === 'web') {
            return localStorage.getItem(key);
        } else {
            return await SecureStore.getItemAsync(key);
        }
    };

    const removeToken = async (key) => {
        if (Platform.OS === 'web') {
            localStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await getToken('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    api.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
                }
            } catch (e) {
                console.error('Failed to load user', e);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data) {
                await setToken('user', JSON.stringify(response.data));
                setUser(response.data);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                return response.data;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            if (response.data) {
                await setToken('user', JSON.stringify(response.data));
                setUser(response.data);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                return response.data;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await removeToken('user');
            setUser(null);
            delete api.defaults.headers.common['Authorization'];
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
