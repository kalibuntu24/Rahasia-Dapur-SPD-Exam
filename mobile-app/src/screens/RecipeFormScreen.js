import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import api from '../api/axios';

const RecipeFormScreen = ({ route, navigation }) => {
    const { id } = route.params || {};
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEdit);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Masakan Rumah',
        cookingTime: '',
        difficulty: 'Mudah',
        imageUrl: '',
        videoUrl: '',
        priceEstimate: '',
        ingredients: '',
        steps: ''
    });

    useEffect(() => {
        if (isEdit) {
            const fetchRecipe = async () => {
                try {
                    const response = await api.get(`/recipes/${id}`);
                    const data = response.data;
                    setFormData({
                        ...data,
                        ingredients: data.ingredients.join('\n'),
                        steps: data.steps.join('\n')
                    });
                } catch (error) {
                    Alert.alert('Error', 'Failed to fetch recipe data');
                    navigation.goBack();
                } finally {
                    setInitialLoading(false);
                }
            };
            fetchRecipe();
        }
    }, [id]);

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.description) {
            Alert.alert('Error', 'Judul dan Deskripsi wajib diisi');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...formData,
                ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
                steps: formData.steps.split('\n').filter(s => s.trim())
            };

            if (isEdit) {
                await api.put(`/recipes/${id}`, payload);
                Alert.alert('Sukses', 'Resep berhasil diperbarui');
            } else {
                await api.post('/recipes', payload);
                Alert.alert('Sukses', 'Resep berhasil ditambahkan');
            }
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.response?.data?.message || 'Gagal menyimpan resep');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <ActivityIndicator size="large" color="#EA580C" style={styles.loader} />;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.header}>{isEdit ? 'Edit Resep' : 'Tambah Resep'}</Text>

            <Text style={styles.label}>Judul Resep</Text>
            <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={t => handleChange('title', t)}
                placeholder="Contoh: Nasi Goreng Spesial"
            />

            <Text style={styles.label}>Kategori</Text>
            <View style={styles.categoryContainer}>
                {['Masakan Rumah', 'Ide Jualan', 'Kue', 'Minuman'].map(cat => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.catChip, formData.category === cat && styles.catChipActive]}
                        onPress={() => handleChange('category', cat)}
                    >
                        <Text style={[styles.catText, formData.category === cat && styles.catTextActive]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Deskripsi</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={t => handleChange('description', t)}
                multiline
                numberOfLines={3}
            />

            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.label}>Waktu Masak</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.cookingTime}
                        onChangeText={t => handleChange('cookingTime', t)}
                        placeholder="45m"
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.label}>Kesulitan</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.difficulty}
                        onChangeText={t => handleChange('difficulty', t)}
                        placeholder="Mudah/Sedang"
                    />
                </View>
            </View>

            {formData.category === 'Ide Jualan' && (
                <>
                    <Text style={styles.label}>Estimasi Harga (per porsi)</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.priceEstimate}
                        onChangeText={t => handleChange('priceEstimate', t)}
                        placeholder="Rp 15.000"
                    />
                </>
            )}

            <Text style={styles.label}>URL Gambar</Text>
            <TextInput
                style={styles.input}
                value={formData.imageUrl}
                onChangeText={t => handleChange('imageUrl', t)}
                placeholder="https://..."
            />

            <Text style={styles.label}>URL Video (YouTube)</Text>
            <TextInput
                style={styles.input}
                value={formData.videoUrl}
                onChangeText={t => handleChange('videoUrl', t)}
                placeholder="https://youtube.com/..."
            />

            <Text style={styles.label}>Bahan-Bahan (Satu per baris)</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.ingredients}
                onChangeText={t => handleChange('ingredients', t)}
                multiline
                placeholder="Bawang Merah&#10;Bawang Putih"
            />

            <Text style={styles.label}>Cara Membuat (Satu per baris)</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.steps}
                onChangeText={t => handleChange('steps', t)}
                multiline
                placeholder="Potong bawang&#10;Tumis hingga harum"
            />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitButtonText}>{isEdit ? 'Simpan Perubahan' : 'Tambah Resep'}</Text>
                )}
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#EA580C',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    catChip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    catChipActive: {
        backgroundColor: '#EA580C',
        borderColor: '#EA580C',
    },
    catText: {
        fontSize: 12,
        color: '#4B5563',
    },
    catTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#EA580C',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RecipeFormScreen;
