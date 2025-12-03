// app/+not-found.tsx
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>404</Text>
            <Text style={styles.subtitle}>Page not found</Text>
            <Text style={styles.description}>
                The page you're looking for doesn't exist.
            </Text>

            <Link href="/" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Go to Home</Text>
                </Pressable>
            </Link>

            <Link href="/(tabs)" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Go to Dashboard</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 10,
        fontFamily: 'SpaceMono',
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        marginVertical: 10,
        minWidth: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});