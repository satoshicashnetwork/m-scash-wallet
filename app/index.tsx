import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from "react";

import TarBar from '../components/TabBar'
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import TabsIndexScreen from "./(tabs)";
import {FileStorage} from "../store/FileStorage";
import InitAppScreen from "./initApp";
import {FILE_NAME, KEYS} from "../types/common-enums";
import {WalletInfo} from "../types";

const AppScreen: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(999);
    const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
    const [curWalletInfo, setCurWalletInfo] = useState<WalletInfo | null>(null);


    // 读取钱包文件
    const fileStorage = new FileStorage()

    useEffect(() => {
        console.log("读取钱包数据");
        fileStorage.read(FILE_NAME.WALLET_LIST).then(walletListJson => {
            console.log("钱包数据", walletListJson);
            if (walletListJson) {
                // 钱包文件存在，初始化过了
                setIsInitialized(true);
                // 找到默认主钱包
                let walletList: WalletInfo[] = JSON.parse(walletListJson);
                let walletInfo = walletList.find(item => item.isDefault);
                if (walletInfo) {
                    // 存在默认钱包
                    setCurWalletInfo(walletInfo)
                } else {
                    // 没有默认钱包 就随机取一个
                    setCurWalletInfo(walletList[0])
                }
                console.log("查询的钱包", curWalletInfo);
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
                        <TabsIndexScreen activeTab={activeIndex}
                                         walletInfo={curWalletInfo}/>
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