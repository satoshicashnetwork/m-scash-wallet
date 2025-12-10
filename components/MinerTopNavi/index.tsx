import React from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Text, TopNavigation} from "@ui-kitten/components";

const localImages = {
    logo: require('../../assets/images/logo.png')
};



const MinerTopNavi: React.FC = () => {
    // 头部左边
    const renderTopHeader = () => {
        return (
            <View id={'header'} style={styles.headerContainer}>
                <Avatar
                    source={localImages.logo}
                    style={styles.avatar}
                />
                <Text style={styles.topTitle}>
                    Miner panel
                </Text>
            </View>
        )
    }


    return (
        <TopNavigation
            style={{
                paddingTop: 22,
                paddingRight: 20,
                paddingBottom: 0,
                paddingLeft: 10,
            }}
            title={renderTopHeader}
            alignment='start'
        />
    )
}

export default MinerTopNavi;


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row', // 关键：设置为行排列
        alignItems: 'center', // 垂直居中
        justifyContent: 'flex-start', // 左对齐
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    avatar: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent', // 透明背景
    },
    topTitle: {
        fontSize: 18, // 根据需要调整
        fontWeight: 'bold',
        color: '#8200db',
        fontFamily: 'SpaceMono-Regular',
        lineHeight: 36,
    },
    topRight: {
        flexDirection: 'row',
        alignItems: 'center',
        // 关键：添加这个
        flexShrink: 100, // 允许被压缩
        marginLeft: 'auto', // 推到最右边
    }
});