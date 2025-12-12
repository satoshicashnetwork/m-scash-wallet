import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from "react";

import TarBar from '../components/TabBar'
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import TabsIndexScreen from "./(tabs)";
import {WalletStorage} from "../types/WalletStorage";
import InitAppScreen from "./initApp";

const AppScreen: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(999);
    const [isInitialized, setIsInitialized] = useState<boolean | null>(null);

    // 读取钱包文件
    const walletFile = new WalletStorage()

    useEffect(() => {
        console.log("读取钱包数据");
        walletFile.read().then(res => {
            console.log("钱包数据", res);
            if (res) {
                // 钱包文件存在，初始化过了
                setIsInitialized(true);
            } else {
                // 钱包文件不存在，需要初始化
                setIsInitialized(false);
            }
        }).catch((err) => {
            console.error("读取钱包文件出错：", err);
            // 出错也按未初始化处理
            setIsInitialized(false);
        });
    }, []);

    useEffect(() => {
        console.log("监听isInitialized变化", isInitialized)
    }, [isInitialized]);
    return (
        <>
            <ApplicationProvider {...eva} theme={eva.light}>
                {isInitialized === null ? (
                    // 还在读取中，可以显示 Loading（可选）
                    <View style={styles.container}>
                        <Text>Loading...</Text>
                    </View>
                ) : isInitialized ? (
                    // 钱包已初始化，显示主界面
                    <View style={styles.container}>
                        <TabsIndexScreen activeTab={activeIndex}/>
                        <TarBar changeTabIndex={(index) => {
                            setActiveIndex(index);
                        }}/>
                    </View>
                ) : (
                    // 钱包未初始化，显示初始化界面
                    <View>
                        <InitAppScreen/>
                    </View>
                )}
            </ApplicationProvider>
        </>

    )
}

export default AppScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});