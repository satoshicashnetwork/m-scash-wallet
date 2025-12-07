import React from "react";

const localImages = {
    logo: require('../../assets/images/logo.png')
};

// @ts-ignore
import PlusSquareOutlineIcon from '../../assets/icons/btn/plus-square-outline.svg';


import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Avatar, Text, TopNavigation} from "@ui-kitten/components";


const WalletTopNavi: React.FC = () => {
    // 头部左边
    const renderTopHeader = () => {
        return (
            <View id={'header'} style={styles.headerContainer}>
                <Avatar
                    source={localImages.logo}
                    style={styles.avatar}
                />
                <Text style={styles.topTitle}>
                    钱包中心
                </Text>
            </View>
        )
    }

    // 头部右边按钮集
    const renderRightActions = () => {
        return (
            <View style={styles.topRight}>
                {/* 添加钱包 */}
                <TouchableOpacity
                    style={{
                        padding: 10,
                    }}
                    onPress={() => console.log('添加钱包', '开始添加钱包了')}
                    activeOpacity={0.7}
                >
                    <PlusSquareOutlineIcon width={24}
                                           height={24}
                                           color={'#666666'}/>
                </TouchableOpacity>

            </View>
        );
    };


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
            accessoryRight={renderRightActions}
        />
    )
}

export default WalletTopNavi;


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