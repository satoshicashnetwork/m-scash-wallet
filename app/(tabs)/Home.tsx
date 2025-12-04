import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {
    Button,
    Card,
    Layout,
    Text,
    Input,
    Avatar,
    Toggle,
    Spinner,
    Divider,
    TopNavigation,
    TopNavigationAction,
    Icon,
    IconElement
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';


const localImages = {
    logo: require('../../assets/images/logo.png')
};

// @ts-ignore
import ScanQrCodeIcon from '../../assets/icons/btn/scan-qrcode.svg';
// @ts-ignore
import MessageIcon from '../../assets/icons/btn/message.svg';



const HomeScreen: React.FC = () => {

    // 头部左边
    const renderTopHeader = () => {
        return (
            <View id={'header'} style={styles.headerContainer}>
                <Avatar
                    source={localImages.logo}
                    style={styles.avatar}
                />
                <Text style={styles.topTitle}>
                    Scash wallet
                </Text>
            </View>
        )
    }

    // 头部右边按钮集
    const renderRightActions = () => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                // 关键：添加这个
                flexShrink: 112, // 允许被压缩
                marginLeft: 'auto', // 推到最右边
            }}>
                {/* 扫码按钮 */}
                <TouchableOpacity
                    style={{
                        padding: 10,
                    }}
                    onPress={() => console.log('扫一扫', '打开摄像头扫描二维码')}
                    activeOpacity={0.7}
                >
                    <ScanQrCodeIcon width={18}
                                    height={18}
                                    color={'#666666'}/>
                </TouchableOpacity>

                {/* 可以添加更多按钮 */}
                <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() => console.log('通知', '查看通知')}
                >
                    <MessageIcon width={18}
                                    height={18}
                                    color={'#666666'}/>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={styles.container}>

                {/* 顶部导航 */}
                <TopNavigation
                    title={renderTopHeader}
                    alignment='start'
                    accessoryRight={renderRightActions}
                />

            </Layout>
        </SafeAreaView>
    )
}

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
});