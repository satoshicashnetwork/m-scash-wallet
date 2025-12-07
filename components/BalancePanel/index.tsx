import React, {useState} from "react";
import {StyleSheet, View, TouchableOpacity, Dimensions} from "react-native";
import {Card, Text} from '@ui-kitten/components';

// @ts-ignore
import QrCodeIcon from '../../assets/icons/btn/qr-code.svg';
// @ts-ignore
import EyeOutlineIcon from '../../assets/icons/btn/eye-outline.svg';
// @ts-ignore
import EyeOffOutlineIcon from '../../assets/icons/btn/eye-off-outline.svg';
// @ts-ignore
import CopyOutlineIcon from '../../assets/icons/btn/copy-outline.svg';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const responsiveWidth = Math.min(SCREEN_WIDTH * 0.9, 400); // 取较小值
const responsiveMinWidth = Math.min(SCREEN_WIDTH * 0.8, 320); // 最小宽度

const BalancePanel: React.FC = () => {
    const [balanceVisible, setBalanceVisible] = useState(true);

    // 切换余额显示/隐藏
    const toggleBalanceVisibility = () => {
        setBalanceVisible(!balanceVisible);
    };

    // 按钮点击处理函数
    const handleSend = () => {
        console.log('发送按钮点击');
        // 这里添加发送逻辑
    };

    const handleReceive = () => {
        console.log('接收按钮点击');
        // 这里添加接收逻辑
    };

    return (
        <>
            <Card style={styles.mainBalanceCard}>
                <View>
                    <View style={styles.balanceSection}>
                        <View style={styles.balanceLabelRow}>
                            <View style={styles.balanceLabelRowHeader}>
                                <Text style={styles.balanceLabel}>总余额</Text>
                                {/* 显示/隐藏按钮 */}
                                <TouchableOpacity
                                    style={styles.visibilityButton}
                                    onPress={toggleBalanceVisibility}
                                    activeOpacity={0.7}
                                >
                                    {balanceVisible ? (
                                        // 可见状态 - 显示眼睛图标
                                        <EyeOutlineIcon
                                            width={16}
                                            height={16}
                                            fill="rgba(255,255,255,0.9)"
                                        />
                                    ) : (
                                        // 隐藏状态 - 显示闭眼图标
                                        <EyeOffOutlineIcon
                                            width={20}
                                            height={20}
                                            fill="rgba(255,255,255,0.9)"
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.qrButton}
                                onPress={() => console.log('打开二维码')}
                                activeOpacity={0.7}
                            >
                                <QrCodeIcon
                                    width={20}
                                    height={20}
                                    color="rgba(255,255,255,0.9)"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.balanceRow}>
                            <Text style={styles.currencySymbol}>$</Text>
                            <Text style={styles.balanceAmount}>
                                {balanceVisible ? '12,580.75' : '••••••'}
                            </Text>
                        </View>
                        <Text style={styles.balanceSubtitle}>美元等值</Text>
                    </View>

                    <View style={styles.cardFooter}>
                        <Text style={styles.cardHolder}>ZHANG SAN</Text>
                        <View style={styles.balanceLabelRowHeader}>
                            <Text style={styles.cardNumber}>**** **** **** 1234</Text>
                            <TouchableOpacity
                                onPress={() => console.log('复制钱包地址')}
                                activeOpacity={0.7}
                            >
                                <CopyOutlineIcon
                                    width={13}
                                    height={13}
                                    fill="rgba(255,255,255,0.9)"
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Card>
            {/* 新增：发送接收按钮区域 */}
            <View style={styles.buttonSection}>
                <View style={styles.buttonContainer}>
                    {/* 发送按钮 */}
                    <TouchableOpacity
                        style={[styles.actionButton, styles.sendButton]}
                        onPress={handleSend}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.sendButtonText}>发送</Text>
                    </TouchableOpacity>

                    {/* 接收按钮 */}
                    <TouchableOpacity
                        style={[styles.actionButton, styles.receiveButton]}
                        onPress={handleReceive}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.receiveButtonText}>接收</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default BalancePanel;

const styles = StyleSheet.create({
    // 主余额卡片样式
    mainBalanceCard: {
        marginTop: 20,
        shadowColor: '#9100cf9c',
        backgroundColor: '#9100cf9c',
        padding: 5,
        borderRadius: 24,
        overflow: 'hidden',
        alignSelf: 'center',
        width: responsiveWidth,
        maxWidth: 400,
        minWidth: responsiveMinWidth,
    },
    qrButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // 修改后的余额标签行
    balanceLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    balanceLabelRowHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    balanceLabel: {
        marginRight: 15,
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
    },

    // 新增：显示/隐藏按钮样式
    visibilityButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    visibilityIcon: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
    },

    balanceSection: {
        marginBottom: 30,
    },
    balanceRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    currencySymbol: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        marginRight: 8,
    },
    balanceAmount: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        lineHeight: 40,
    },
    balanceSubtitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        marginTop: 4,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cardHolder: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        fontWeight: '600',
    },
    cardNumber: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
        letterSpacing: 2
    },
    // 新增：按钮区域样式
    buttonSection: {
        marginTop: 8,
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',  // 水平居中
        alignItems: 'center',      // 垂直居中
        gap: 16,                   // 按钮之间的间距

    },
    actionButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        minWidth: 150,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sendButton: {
        backgroundColor: '#FF6B6B',  // 红色系 - 发送
    },
    receiveButton: {
        backgroundColor: '#4ECDC4', // 绿色系 - 接收
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    receiveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});