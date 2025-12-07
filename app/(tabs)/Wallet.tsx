import React from "react";
import {
    Layout,
} from "@ui-kitten/components";
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import WalletTopNavi from "../../components/WalletTopNavi";
import WalletPanel from "../../components/WalletPanel";


const WalletScreen: React.FC = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Layout style={styles.container}>
                {/* 顶部导航 */}
                <WalletTopNavi />
                <WalletPanel />

            </Layout>
        </SafeAreaView>
    )
}


export default WalletScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});