// app/index.tsx
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Link} from 'expo-router';
import React from "react";

const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scash Wallet</Text>
            <Text style={styles.subtitle}>Welcome to your crypto wallet</Text>

            <Link href="/(tabs)/wallet" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Go to Wallet</Text>
                </Pressable>
            </Link>

            <Link href="/(tabs)/settings" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Settings</Text>
                </Pressable>
            </Link>
        </View>
    )
}

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'SpaceMono', // 使用 SpaceMono 字体
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
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