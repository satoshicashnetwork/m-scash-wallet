import React from "react";
import {Card, Text, List, ListItem, Avatar} from '@ui-kitten/components';
import {Dimensions, StyleSheet, View, Image, ImageProps, TouchableOpacity} from "react-native";
import Svg, {Circle, Path} from "react-native-svg";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const responsiveWidth = Math.min(SCREEN_WIDTH * 0.95, 400); // 取较小值
const responsiveMinWidth = Math.min(SCREEN_WIDTH * 0.9, 320); // 最小宽度
const responsiveHeight = Math.max(SCREEN_HEIGHT * 0.35, 250);

const localImages: { [key: string]: any } = {
    a1: require('../../assets/wallet-avatar/1.png'),
    a2: require('../../assets/wallet-avatar/2.png'),
    a3: require('../../assets/wallet-avatar/3.png'),
    a4: require('../../assets/wallet-avatar/4.png'),
    a5: require('../../assets/wallet-avatar/5.png'),
    a6: require('../../assets/wallet-avatar/6.png'),
    a7: require('../../assets/wallet-avatar/7.png'),
    a8: require('../../assets/wallet-avatar/8.png'),
    b1: require('../../assets/wallet-avatar/9.png'),
    b2: require('../../assets/wallet-avatar/10.png'),
    b3: require('../../assets/wallet-avatar/11.png'),
    b4: require('../../assets/wallet-avatar/12.png'),
    b5: require('../../assets/wallet-avatar/13.png'),
    b6: require('../../assets/wallet-avatar/14.png'),
    b7: require('../../assets/wallet-avatar/15.png'),
    b8: require('../../assets/wallet-avatar/16.png'),
    b9: require('../../assets/wallet-avatar/17.png'),
    b10: require('../../assets/wallet-avatar/18.png'),
    b11: require('../../assets/wallet-avatar/19.png'),
    b12: require('../../assets/wallet-avatar/20.png'),
    b13: require('../../assets/wallet-avatar/21.png'),
    b14: require('../../assets/wallet-avatar/22.png'),
    b15: require('../../assets/wallet-avatar/23.png'),
    b16: require('../../assets/wallet-avatar/25.png'),
    b17: require('../../assets/wallet-avatar/26.png'),
    b18: require('../../assets/wallet-avatar/27.png')
};


interface WalletAddress {
    address: string;
    tag: string;
}

interface Wallet {
    id: string;
    avatar: string;
    name: string;
    addresses: WalletAddress[];
    type: 'Phrase' | 'Core'; // 钱包类型： 助记词钱包  核心钱包
}

const WalletPanel: React.FC = () => {
    const wallets: Wallet[] = [
        {
            id: '1',
            name: '主钱包',
            avatar: 'b1',
            addresses: [
                {tag: '空投地址', address: 'scash1q6a5ndlqzc62ly9ce8ahuepq63pchuwumw6m963'},
                {tag: '矿工地址', address: 'scash1q9ptq0xhnxyks38h8craumyfdcr2hn9z2nm3ryu'}
            ],
            type: 'Core'
        },
        {
            id: '2',
            name: '主钱包',
            avatar: 'b2',
            addresses: [
                {tag: '空投地址', address: 'scash1q6a5ndlqzc62ly9ce8ahuepq63pchuwumw6m963'},
                {tag: '矿工地址', address: 'scash1q9ptq0xhnxyks38h8craumyfdcr2hn9z2nm3ryu'}
            ],
            type: 'Phrase'
        }
    ]

    const renderItemIcon = (props: any, wallet: Wallet) => {
        let sourceAvatar = localImages[wallet.avatar]
        console.log("XXXXX", props)
        return (
            <Avatar
                source={sourceAvatar}
                style={styles.avatar}
            />
        )
    }

    const renderItem = ({item, index}: { item: Wallet; index: number }): React.ReactElement => (
        <ListItem
            accessoryLeft={(imageProps) => renderItemIcon(imageProps, item)}
        />
    );

    return (
        <Card style={styles.mainCard}>
            <View>
                {/* 左边列表 */}
                {wallets.length > 0 ? (
                    wallets.map((wallet: Wallet, index: number) => {
                        let sourceAvatar = localImages[wallet.avatar]
                        return (
                            <View>
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => console.log(`点击了${index}-钱包`)}
                                    activeOpacity={0.8}
                                >
                                    <Avatar
                                        source={sourceAvatar}
                                        style={styles.avatar}
                                    />
                                </TouchableOpacity>

                            </View>
                        )
                    })
                ):(<Text>123</Text>)}
                {/* 右边收款地址列表 */}
            </View>
        </Card>
    )
}

export default WalletPanel;

const styles = StyleSheet.create({
    mainCard: {
        marginTop: 8,
        maxWidth: 400,
        width: responsiveWidth,
        minWidth: responsiveMinWidth,
        alignSelf: 'center',
        borderRadius: 8,
        fontFamily: 'SpaceMono-Regular',
    },
    walletList: {},
    avatar: {
        width: 38,
        height: 38,
    },
});