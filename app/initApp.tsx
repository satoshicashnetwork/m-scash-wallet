import React from "react";
import {Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Card, Input, InputProps, Layout, Modal, Text} from "@ui-kitten/components";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScashWalletManager} from "../types/ScashWalletManager";


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const localImages = {
    background: require('../assets/images/logo.png')
};


const useInputState = (initialValue = ''): InputProps => {
    const [value, setValue] = React.useState(initialValue);
    return {value, onChangeText: setValue};
};

const InitAppScreen: React.FC = () => {

    const walletManager = new ScashWalletManager();


    const [openImportModal, setOpenImportModal] = React.useState(false);
    const [openCreateModal, setOpenCreateModal] = React.useState(false);

    const multilineInputState = useInputState();

    const createWallet = () => {
        console.log("创建钱包")
    }

    const importWallet = () => {
        console.log("导入钱包")
        setOpenImportModal(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Layout style={[styles.container, styles.layoutContainer]}>
                <View style={styles.logoContainer}>
                    <View>
                        <ImageBackground style={styles.backgroundImage} source={localImages.background}/>
                    </View>
                    <View>
                        <Text style={styles.logoTitle}>Scash Community Wallet</Text>
                    </View>
                </View>

                <View style={styles.buttonSection}>
                    <View style={styles.buttonContainer}>
                        {/* 发送按钮 */}
                        <TouchableOpacity
                            style={[styles.actionButton, styles.sendButton]}
                            onPress={createWallet}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.sendButtonText}>创建钱包</Text>
                        </TouchableOpacity>

                        {/* 接收按钮 */}
                        <TouchableOpacity
                            style={[styles.actionButton, styles.receiveButton]}
                            onPress={importWallet}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.receiveButtonText}>导入钱包</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    visible={openImportModal}
                    backdropStyle={styles.backdrop}
                    animationType={'fade'}
                    onBackdropPress={() => setOpenImportModal(false)}
                >
                    <Card style={{width: SCREEN_WIDTH * .7}}>
                        <Input
                            multiline={true}
                            textStyle={styles.inputTextStyle}
                            placeholder='请输入12位助记词'
                            {...multilineInputState}
                        />
                        <Button style={{marginTop: 8}} onPress={() => setOpenImportModal(false)}>
                            导入
                        </Button>
                    </Card>
                </Modal>
            </Layout>
        </SafeAreaView>
    )
}

export default InitAppScreen;

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    layoutContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    logoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    backgroundImage: {
        width: 150,
        height: 150,
    },
    logoTitle: {
        fontSize: 20, // 根据需要调整
        fontWeight: 'bold',
        color: '#8200db',
        fontFamily: 'SpaceMono-Regular',
        lineHeight: 36,
    },
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
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    inputTextStyle: {
        minHeight: 100,
    }
});