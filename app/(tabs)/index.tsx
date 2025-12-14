// app/(tabs)/index.tsx
import {View, Text, StyleSheet} from 'react-native';
import {Link} from 'expo-router';
import HomeScreen from "./Home";
import React, {useState} from "react";
import WalletScreen from "./Wallet";
import MinerScreen from "./Miner";
import {WalletInfo} from "../../types";

interface TabsIndexScreenProps {
    activeTab: number;  // 当前选中的下标
    walletInfo: WalletInfo | null;
}

const TabsIndexScreen: React.FC<TabsIndexScreenProps> = ({
                                                             activeTab,
                                                             walletInfo
                                                         }) => {
    return (
        <>
            <View style={styles.container}>
                {activeTab === 0 && (<HomeScreen walletInfo={walletInfo}/>)}
                {activeTab === 1 && (<WalletScreen/>)}
                {activeTab === 2 && (<MinerScreen/>)}
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