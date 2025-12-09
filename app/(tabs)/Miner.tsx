import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Layout} from "@ui-kitten/components";

import {StyleSheet} from "react-native";
import MinerTopNavi from "../../components/MinerTopNavi";

const MinerScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Layout style={styles.container}>
                {/* 顶部导航 */}
                <MinerTopNavi />
                {/* 全网数据概览 */}

            </Layout>
        </SafeAreaView>
    )
}

export default MinerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});