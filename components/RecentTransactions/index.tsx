// components/RecentTransactionsList.tsx
import React from 'react';
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

import {smartTruncate} from "../../utils/FormatUtils";

// 交易记录数据类型
interface Transaction {
    id: string;
    type: 'send' | 'receive';
    currency: string;
    amount: number;
    hash: string;
    gasFee: number;
    timestamp: string;
    status: 'confirmed' | 'pending' | 'failed';
}


// 主组件
const RecentTransactions: React.FC = () => {
    console.log("交易记录Card高度", responsiveHeight)
    // 模拟数据
    const transactions: Transaction[] = [
        {
            id: '1',
            type: 'send',
            amount: 0.0256,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 1234.56,
            timestamp: '今天 14:30',
            status: 'confirmed'
        },
        {
            id: '2',
            type: 'receive',
            amount: 2.3500,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 850.20,
            timestamp: '昨天 10:15',
            status: 'confirmed'
        },
        {
            id: '3',
            type: 'send',
            amount: 512.7800,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 513.04,
            timestamp: '前天 16:45',
            status: 'pending'
        },
        {
            id: '4',
            type: 'receive',
            amount: 315.4500,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 316.21,
            timestamp: '11月20日 09:20',
            status: 'confirmed'
        },
        {
            id: '5',
            type: 'send',
            amount: 650.2200,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 651.87,
            timestamp: '11月19日 22:30',
            status: 'confirmed'
        },
        {
            id: '6',
            type: 'receive',
            amount: 880.7500,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 882.54,
            timestamp: '11月18日 14:10',
            status: 'failed'
        },
        {
            id: '7',
            type: 'send',
            amount: 420.3600,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 421.45,
            timestamp: '11月17日 18:25',
            status: 'confirmed'
        },
        {
            id: '8',
            type: 'receive',
            amount: 550.8900,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 552.31,
            timestamp: '11月16日 11:40',
            status: 'confirmed'
        },
        {
            id: '9',
            type: 'send',
            amount: 310.5700,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 311.42,
            timestamp: '11月15日 15:50',
            status: 'pending'
        },
        {
            id: '10',
            type: 'receive',
            amount: 720.3400,
            currency: 'SCASH',
            hash: 'd473a2d24f77199d8dd7ea4d3eec2c0d67ef55ac89d83733482027bc6dd3981e',
            gasFee: 722.07,
            timestamp: '11月14日 20:15',
            status: 'confirmed'
        },
    ];

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
                    <Text category="c2" appearance="hint">共 {transactions.length} 笔记录</Text>
                </View>
            </View>
        )
    }


    const renderItemHeader = (headerProps: any, transaction: Transaction): React.ReactElement => {
        const isSend = transaction.type === 'send';
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
                        width: 36,
                        height: 36,
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
                        }} category={'h6'}> {isSend ? 'Sent' : 'Received'}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{color: isSend ? '#fb2c36' : '#34C759',}}
                          category={'s2'}> {isSend ? '-' : '+'} {transaction.amount}</Text>
                </View>
            </View>
        )
    };

    const renderItem = ({item, index}: { item: Transaction; index: number }): React.ReactElement => {
        let txDisplay = smartTruncate(item.hash, {frontLength: 10, backLength: 10, ellipsis: '······'})
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
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                console.log("跳转浏览器查看详情")
                            }}
                            disabled={item.status === 'pending'}
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
    return (
        <>
            <Card style={styles.mainCard} header={renderHeader}>
                <List
                    style={styles.container}
                    data={transactions}
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