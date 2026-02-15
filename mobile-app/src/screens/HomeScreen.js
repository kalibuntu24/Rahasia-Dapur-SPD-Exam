import { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl, Dimensions, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Masakan Rumah', 'Ide Jualan', 'Kue', 'Minuman'];

    const fetchRecipes = async () => {
        try {
            const response = await api.get('/recipes');
            setRecipes(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchRecipes();
    }, []);

    const filteredRecipes = activeCategory === 'All'
        ? recipes
        : recipes.filter(r => r.category === activeCategory);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.imageUrl || 'https://placehold.co/600x400' }}
                style={styles.cardImage}
            />
            {item.category === 'Ide Jualan' && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Ide Jualan</Text>
                </View>
            )}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardMeta}>
                    <Text style={styles.cardCategory}>{item.category}</Text>
                    <Text style={styles.cardTime}>⏱️ {item.cookingTime || '45m'}</Text>
                </View>
                <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => navigation.navigate('Detail', { id: item._id, title: item.title })}
                >
                    <Text style={styles.cardButtonText}>Lihat Resep</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const { logout, user } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.headerTitle}>Rahasia Dapur</Text>
                        <Text style={styles.headerSubtitle}>Masak apa hari ini?</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {user?.role === 'admin' && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AdminDashboard')}
                                style={{ padding: 8, marginRight: 8, backgroundColor: '#EFF6FF', borderRadius: 8 }}
                            >
                                <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>Admin</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={logout} style={{ padding: 8 }}>
                            <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>Keluar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.categoryChip,
                                activeCategory === item && styles.categoryChipActive
                            ]}
                            onPress={() => setActiveCategory(item)}
                        >
                            <Text style={[
                                styles.categoryText,
                                activeCategory === item && styles.categoryTextActive
                            ]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#EA580C" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredRecipes}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#EA580C']} />
                    }
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>Tidak ada resep ditemukan.</Text>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#EA580C',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    categoryChipActive: {
        backgroundColor: '#EA580C',
        borderColor: '#EA580C',
    },
    categoryText: {
        color: '#4B5563',
        fontWeight: '600',
    },
    categoryTextActive: {
        color: '#fff',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#E5E7EB',
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#16A34A',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    cardMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    cardCategory: {
        color: '#EA580C',
        fontWeight: '600',
        fontSize: 12,
    },
    cardTime: {
        color: '#6B7280',
        fontSize: 12,
    },
    cardButton: {
        backgroundColor: '#EA580C',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cardButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
