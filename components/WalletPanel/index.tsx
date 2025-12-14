import React, {useState} from "react";
import {Card, Text, List, ListItem, Avatar} from '@ui-kitten/components';
import {Dimensions, StyleSheet, View, Image, ImageProps, TouchableOpacity} from "react-native";
import {smartTruncate} from "../../utils/FormatUtils";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const responsiveWidth = Math.min(SCREEN_WIDTH * 0.95, 400); // 取较小值
const responsiveMinWidth = Math.min(SCREEN_WIDTH * 0.9, 320); // 最小宽度
const responsiveHeight = Math.max(SCREEN_HEIGHT * 0.8, 250);

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

// @ts-ignore
import TrashIcon from '../../assets/icons/btn/trash.svg';
import {WalletAddress, WalletInfo} from "../../types";

const WalletPanel: React.FC = () => {
    const wallets: WalletInfo[] = []

    const [activeWallet, setActiveWallet] = useState<string>('1');  // 当前被选中的钱包ID， 没有就默认选择第一个


    const renderItemIcon = (props: any, wallet: WalletInfo) => {
        let sourceAvatar = localImages[wallet.avatar]
        return (
            <TouchableOpacity
                onPress={() => {
                    setActiveWallet(wallet.id)
                }}
                activeOpacity={0.8}>
                <Avatar

                    source={sourceAvatar}
                    style={[styles.avatar,
                        {backgroundColor: wallet.id === activeWallet ? '#dfbded' : ''}]}
                />
            </TouchableOpacity>

        )
    }

    const renderItem = ({item, index}: { item: WalletInfo; index: number }): React.ReactElement => (
        <ListItem
            accessoryLeft={(imageProps) => renderItemIcon(imageProps, item)}
        />
    );


    const renderItemAddressBtn = () => {
        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        console.log("删除地址")
                    }}
                    activeOpacity={0.8}
                >
                    <TrashIcon
                        width={18}
                        height={18}
                        fill={'#a13f3f'}
                    />
                </TouchableOpacity>
            </>
        )
    }

    const renderItemAddress = ({item, index}: { item: WalletAddress; index: number }): React.ReactElement => (
        <ListItem
            style={styles.addressItem}
            title={() => {
                return (
                    <Text style={{marginLeft: 5}} category={'s2'}>{item.tag}</Text>
                )
            }}
            onPress={() => console.log(`收款地址${index} 被点击了`)}
            description={() => {
                let txDisplay = smartTruncate(item.address, {frontLength: 10, backLength: 10, ellipsis: '······'})
                return (
                    <Text style={{
                        fontSize: 12,
                        color: '#8a8686',
                        marginLeft: 5
                    }}>{txDisplay}</Text>
                )
            }}
            accessoryRight={renderItemAddressBtn}
        />
    );
    const renderAddressList = () => {
        let currentWallet = wallets.find(wallet => wallet.id === activeWallet);
        if (currentWallet) {
            let addressList = currentWallet.addresses;
            if (addressList) {
                return (
                    <View>
                        <List
                            style={styles.addressContainerList}
                            data={addressList}
                            renderItem={renderItemAddress}
                        />
                    </View>
                )
            } else {

            }

        }
    }

    return (
        <Card style={styles.mainCard} id={'wallet-panel-id'}>
            <View style={styles.container}>
                {/* 左边列表 */}
                <View style={styles.walletList}>
                    <List
                        style={styles.walletListContent}
                        data={wallets}
                        renderItem={renderItem}
                    />
                </View>
                {/* 右边收款地址列表 */}
                <View style={styles.addressContainer}>
                    {renderAddressList()}
                </View>
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
        height: responsiveHeight,
    },
    container: {
        flexDirection: 'row', // 关键：水平排列
        flex: 1,
    },
    walletList: {
        borderRightWidth: 1,
        borderRightColor: '#e7e8ec',
        width: '20%',
        marginLeft: -20,
        marginTop: -10,
        height: responsiveHeight,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e8ecf4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    walletListContent: {
        backgroundColor: '#ffffff',
    },
    addressContainer: {
        flex: 1, // 关键：占据剩余空间
        paddingLeft: 12,

    },
    addressContainerList: {
        backgroundColor: '#ffffff',
        flex: 1,
        minHeight: responsiveHeight * 0.99, // 确保最小高度
    },
    addressItem: {
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e8ecf4',
        marginBottom: 10,
    }
});