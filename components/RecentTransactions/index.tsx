import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {Card, Text, List} from '@ui-kitten/components';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const responsiveWidth = Math.min(SCREEN_WIDTH * 0.95, 400); // 取较小值
const responsiveMinWidth = Math.min(SCREEN_WIDTH * 0.9, 320); // 最小宽度
const responsiveHeight = Math.max(SCREEN_HEIGHT * 0.35, 250);

// @ts-ignore
import ArrowDownwardIcon from '../../assets/icons/others/arrow-downward.svg';

// @ts-ignore
import ArrowUpwardIcon from '../../assets/icons/others/arrow-upward.svg';
// @ts-ignore
import ExternalLinkOutlineIcon from '../../assets/icons/btn/external-link-outline.svg';

import {formatRelativeTime, smartTruncate} from "../../utils/FormatUtils";
import {getAddressTxs} from "../../api/ScashTvApi";
import {AddressTx, Transaction} from "../../types/api-scash-tv";
import {WalletInfo} from "../../types";

interface RecentTransactionsProps {
    walletInfo: WalletInfo | null;
}

// 主组件
const RecentTransactions: React.FC<RecentTransactionsProps> = ({
                                                                   walletInfo
                                                               }) => {
    const addressRef = useRef<string>('');
    const [transactions, setTransactions] = useState<AddressTx>({
        recordsFiltered: 0,
        recordsTotal: 0,
        data: []
    });


    // 交易明细卡片头部
    const renderHeader = () => {
        return (
            <View style={styles.mainCardHeader}>
                {/* 头部内容 */}
                <View>

                    <Text style={{marginLeft: 10}} category='s1'>
                        交易记录
                    </Text>
                </View>
                <View>
                    <Text category="c2" appearance="hint">共 {transactions.recordsTotal} 笔记录</Text>
                </View>
            </View>
        )
    }

    const renderItemHeader = (headerProps: any, transaction: Transaction): React.ReactElement => {
        const isSend = transaction[2] !== 0;

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 5
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',

                }}>
                    <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 18,
                        backgroundColor: isSend ? '#fb2c36' : '#34C759',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {isSend ? (
                            // 可见状态 - 显示眼睛图标
                            <ArrowUpwardIcon
                                width={20}
                                height={20}
                                fill="#ffffff"
                            />
                        ) : (
                            // 隐藏状态 - 显示闭眼图标
                            <ArrowDownwardIcon
                                width={20}
                                height={20}
                                fill="#ffffff"
                            />
                        )}
                    </View>
                    <View>
                        <Text style={{
                            marginLeft: 10,
                        }}> {isSend ? 'Sent' : 'Received'}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{color: isSend ? '#fb2c36' : '#34C759',}}
                          category={'s2'}> {isSend ? '-' : '+'} {isSend ? transaction[2] : transaction[3]}</Text>
                </View>
            </View>
        )
    };

    const renderItem = ({item, index}: { item: Transaction; index: number }): React.ReactElement => {
        let txDisplay = smartTruncate(item[1], {frontLength: 10, backLength: 10, ellipsis: '······'})
        let date = formatRelativeTime(item[0])
        return (
            <Card
                status='basic'
                header={headerProps => renderItemHeader(headerProps, item)}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 5
                }}>
                    <View>
                        <Text style={{
                            fontSize: 12,
                            color: '#8a8686',
                            marginLeft: 10
                        }}>{txDisplay}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: '#8a8686',
                            marginLeft: 10
                        }}>{date}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                console.log("跳转浏览器查看详情")
                            }}
                            activeOpacity={0.8}
                        >
                            <ExternalLinkOutlineIcon
                                width={16}
                                height={16}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </Card>
        )
    };

    // 监听地址变化，请求数据
    useEffect(() => {
        console.log("查询明细：", walletInfo);
        if (walletInfo) {

            addressRef.current = walletInfo.addresses[0].address
        }
    }, [walletInfo]);

    useEffect(() => {
        if (addressRef.current) {
            getAddressTxs(addressRef.current).then(res => {
                setTransactions(res);
            })
        }
    }, [addressRef]);
    return (
        <>
            <Card style={styles.mainCard} header={renderHeader}>
                <List
                    style={styles.container}
                    data={transactions.data}
                    renderItem={renderItem}
                />
            </Card>
        </>
    )
};

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
    mainCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    container: {
        maxHeight: responsiveHeight,
    },
});

export default RecentTransactions;