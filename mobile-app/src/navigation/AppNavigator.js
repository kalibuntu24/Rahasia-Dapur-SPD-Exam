import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import RecipeFormScreen from '../screens/RecipeFormScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#EA580C" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: '#EA580C',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerBackTitleVisible: false,
                }}
            >
                {user ? (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Detail"
                            component={DetailScreen}
                            options={({ route }) => ({ title: route.params.title || 'Resep' })}
                        />
                        <Stack.Screen
                            name="AdminDashboard"
                            component={AdminDashboardScreen}
                            options={{ title: 'Admin Dashboard', headerShown: false }}
                        />
                        <Stack.Screen
                            name="RecipeForm"
                            component={RecipeFormScreen}
                            options={{ title: 'Kelola Resep' }}
                        />
                    </>
                ) : (
                    // Auth Stack
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
