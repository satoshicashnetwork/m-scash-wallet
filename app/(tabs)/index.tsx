// app/(tabs)/index.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function TabsIndexScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.text}>This is the main tabs screen</Text>

            <Link href="./wallet" style={styles.link}>
                Navigate to Wallet Tab
            </Link>

            <Link href="./settings" style={styles.link}>
                Navigate to Settings Tab
            </Link>

            <Link href="/" style={styles.link}>
                Back to Home
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
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'SpaceMono',
    },
    text: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    link: {
        color: '#007AFF',
        fontSize: 16,
        marginVertical: 5,
        textDecorationLine: 'underline',
    },
});