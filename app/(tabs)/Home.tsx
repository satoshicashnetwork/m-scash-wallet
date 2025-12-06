import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

import BalancePanel from "../../components/BalancePanel";
import HomeTopNavi from "../../components/HomeTopNavi";
import RecentTransactions from "../../components/RecentTransactions";


const HomeScreen: React.FC = () => {


    return (
        <SafeAreaView style={styles.container}>
            <Layout style={styles.container}>
                {/* 顶部导航 */}
                <HomeTopNavi/>

                {/* 个人余额数据面板 */}
                <BalancePanel/>

                {/* 账户明细记录 */}
                <RecentTransactions/>
            </Layout>
        </SafeAreaView>
    )
}

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});