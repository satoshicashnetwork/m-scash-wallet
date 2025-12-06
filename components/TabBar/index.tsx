// app/index.tsx - 动态版本
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

// 导入图标（根据你的实际文件调整）
// @ts-ignore
import HomeTabIcon from '../../assets/icons/tab-bar/home-tab.svg';
// @ts-ignore
import WalletTabIcon from '../../assets/icons/tab-bar/wallet-tab.svg';
// @ts-ignore
import TransactionTabIcon from '../../assets/icons/tab-bar/transaction-tab.svg';
// @ts-ignore
import ProfileTabIcon from '../../assets/icons/tab-bar/profile-tab.svg';


// 可配置的图标数组
const allTabIcons = [
    {icon: HomeTabIcon, label: 'Home'},
    {icon: WalletTabIcon, label: 'Wallet'},
    {icon: TransactionTabIcon, label: 'Transaction'},
    {icon: ProfileTabIcon, label: 'Profile'}
];

// 可以选择显示的图标数量（3-5个）
const VISIBLE_TABS_COUNT = 4; // 修改为 3, 4, 或 5
const tabIcons = allTabIcons.slice(0, VISIBLE_TABS_COUNT);

interface TabBarProps {
    changeTabIndex: (index: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({
                                           changeTabIndex,
                                       }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // 根据图标数量计算动态样式
    const getDynamicStyles = () => {
        const screenWidth = Dimensions.get('window').width;
        const minWidth = Math.min(screenWidth * 0.8, 350); // 最小宽度
        const maxWidth = Math.min(screenWidth * 0.95, 400); // 最大宽度

        // 根据图标数量调整内边距
        const horizontalPadding = tabIcons.length <= 3 ? 20 : tabIcons.length === 4 ? 12 : 8;
        const itemMargin = tabIcons.length <= 3 ? 8 : tabIcons.length === 4 ? 6 : 4;

        return {
            minWidth,
            maxWidth,
            horizontalPadding,
            itemMargin,
        };
    };

    const dynamicStyles = getDynamicStyles();

    const handleTabPress = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (changeTabIndex) {
            changeTabIndex(activeIndex)
        }
    }, [activeIndex]);

    return (
        <View style={styles.container}>
            {/* Tab Bar */}
            <View style={styles.tabBarWrapper}>
                <LinearGradient
                    colors={['#f5f5f5', '#e8e8e8']}
                    style={[
                        styles.tabBar,
                        {
                            minWidth: dynamicStyles.minWidth,
                            maxWidth: dynamicStyles.maxWidth,
                            paddingHorizontal: dynamicStyles.horizontalPadding,
                        }
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                >
                    {tabIcons.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.tabItem,
                                {
                                    backgroundColor: 'transparent',
                                    borderRadius: 25,
                                    marginHorizontal: dynamicStyles.itemMargin,
                                    flex: tabIcons.length >= 5 ? 0.95 : 1, // 5个图标时稍微压缩
                                }
                            ]}
                            onPress={() => handleTabPress(index)}
                            activeOpacity={0.8}
                        >
                            <tab.icon
                                width={tabIcons.length >= 5 ? 28 : 32} // 5个图标时稍微缩小
                                height={tabIcons.length >= 5 ? 28 : 32}
                                fill={activeIndex === index ? '#8200db' : '#666666'}
                            />
                            {/*<Text style={[*/}
                            {/*    styles.tabLabel,*/}
                            {/*    {*/}
                            {/*        color: activeIndex === index ? '#8200db' : '#666666',*/}
                            {/*        fontSize: tabIcons.length >= 5 ? 10 : 12, // 5个图标时字体稍小*/}
                            {/*    }*/}
                            {/*]}>*/}
                            {/*    {tab.label}*/}
                            {/*</Text>*/}
                            <View
                                style={[styles.activeIndexLine, {backgroundColor: activeIndex === index ? '#8200db' : 'transparent'}]}/>
                        </TouchableOpacity>
                    ))}
                </LinearGradient>
            </View>


        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    container: {

    },
    tabBarWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        paddingBottom: 20, // 为 iPhone 安全区域预留空间
        paddingHorizontal: 20,
    },
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8, // 减小垂直内边距
        borderRadius: 25, // 圆角
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 10,
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8, // 减小内边距，降低高度
        paddingHorizontal: 4,
        minHeight: 55, // 减小最小高度
        zIndex: 1, // 确保图标在指示器上方
    },
    tabLabel: {
        fontSize: 10, // 减小字体大小
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 2,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
        borderRadius: 12,
        gap: 10,
    },
    activeIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    activeIndexLine: {
        borderRadius: '5',
        height: 2,
        width: '100%'
    }
});