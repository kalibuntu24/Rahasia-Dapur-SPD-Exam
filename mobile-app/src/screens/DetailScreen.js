import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, Alert, Dimensions } from 'react-native';
import api from '../api/axios';

const { width } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await api.get(`/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to load recipe details');
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    const openVideo = () => {
        if (recipe.videoUrl) {
            Linking.openURL(recipe.videoUrl).catch(() => {
                Alert.alert('Error', 'Could not open video URL');
            });
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#EA580C" />
            </View>
        );
    }

    if (!recipe) return null;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Image
                source={{ uri: recipe.imageUrl || 'https://placehold.co/600x400' }}
                style={styles.heroImage}
            />

            <View style={styles.content}>
                <Text style={styles.title}>{recipe.title}</Text>

                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>⏱️</Text>
                        <Text style={styles.metaText}>{recipe.cookingTime || '45m'}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>📊</Text>
                        <Text style={styles.metaText}>{recipe.difficulty || 'Sedang'}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>🍽️</Text>
                        <Text style={styles.metaText}>{recipe.category}</Text>
                    </View>
                </View>

                {recipe.videoUrl ? (
                    <TouchableOpacity style={styles.videoButton} onPress={openVideo}>
                        <Text style={styles.videoButtonText}>▶  Tonton Video Tutorial</Text>
                    </TouchableOpacity>
                ) : null}

                {recipe.category === 'Ide Jualan' && recipe.priceEstimate && (
                    <View style={styles.tipsCard}>
                        <Text style={styles.tipsTitle}>💡 Tips Jualan</Text>
                        <View style={styles.priceContainer}>
                            <View>
                                <Text style={styles.priceLabel}>Estimasi Modal (per porsi)</Text>
                                <Text style={styles.priceValue}>{recipe.priceEstimate}</Text>
                            </View>
                        </View>
                        <Text style={styles.tipsNote}>Gunakan packaging menarik untuk nilai jual lebih tinggi!</Text>
                    </View>
                )}

                <Text style={styles.description}>{recipe.description}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bahan-Bahan</Text>
                    {recipe.ingredients.map((item, index) => (
                        <View key={index} style={styles.ingredientItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.ingredientText}>{item}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cara Membuat</Text>
                    {recipe.steps.map((step, index) => (
                        <View key={index} style={styles.stepItem}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>{index + 1}</Text>
                            </View>
                            <Text style={styles.stepText}>{step}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: 250,
        backgroundColor: '#E5E7EB',
    },
    content: {
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
        paddingVertical: 12,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
    },
    metaItem: {
        alignItems: 'center',
    },
    metaIcon: {
        fontSize: 18,
        marginBottom: 4,
    },
    metaText: {
        fontSize: 12,
        color: '#4B5563',
        fontWeight: '600',
    },
    videoButton: {
        backgroundColor: '#DC2626',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    videoButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tipsCard: {
        backgroundColor: '#FFF7ED',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#FED7AA',
    },
    tipsTitle: {
        color: '#EA580C',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 12,
        color: '#6B7280',
    },
    priceValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    tipsNote: {
        fontSize: 12,
        color: '#9A3412',
        fontStyle: 'italic',
    },
    description: {
        fontSize: 16,
        color: '#4B5563',
        lineHeight: 24,
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#EA580C',
        alignSelf: 'flex-start',
        paddingBottom: 4,
    },
    ingredientItem: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
    },
    bullet: {
        color: '#EA580C',
        fontSize: 20,
        marginRight: 12,
    },
    ingredientText: {
        fontSize: 16,
        color: '#374151',
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    stepNumber: {
        width: 28,
        height: 28,
        backgroundColor: '#EA580C',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepNumberText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    stepText: {
        fontSize: 16,
        color: '#374151',
        flex: 1,
        lineHeight: 24,
    },
});

export default DetailScreen;
