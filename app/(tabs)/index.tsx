// app/(tabs)/index.tsx
import {View, Text, StyleSheet} from 'react-native';
import {Link} from 'expo-router';
import HomeScreen from "./Home";
import React, {useState} from "react";
import WalletScreen from "./Wallet";

interface TabsIndexScreenProps {
    activeTab: number;  // 当前选中的下标
}


const TabsIndexScreen: React.FC<TabsIndexScreenProps> = ({
                                                             activeTab
                                                         }) => {
    return (
        <>
            <View style={styles.container}>
                {activeTab === 0 && (<HomeScreen/>)}
                {activeTab === 1 && (<WalletScreen/>)}
            </View>
        </>
    )
}


export default TabsIndexScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});