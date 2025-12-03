// app/index.tsx
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Link} from 'expo-router';
import React from "react";

import TarBar from '../components/TabBar'

const AppScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <TarBar/>
        </View>
    )
}

export default AppScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    }
});