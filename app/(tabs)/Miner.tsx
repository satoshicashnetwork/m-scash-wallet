import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Layout} from "@ui-kitten/components";

import {StyleSheet} from "react-native";
import MinerTopNavi from "../../components/MinerTopNavi";
import CommunityPoolPanel from "../../components/CommunityPoolPanel";
import PersonalPoolPanel from "../../components/PersonalPoolPanel";

const MinerScreen: React.FC = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Layout style={styles.container}>
                {/* 顶部导航 */}
                <MinerTopNavi/>
                {/* 社区池数据看板 */}
                <CommunityPoolPanel/>
                {/* 个人钱包数据看板 */}
                <PersonalPoolPanel/>
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