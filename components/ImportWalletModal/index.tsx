import React, {useState} from "react";
import {Button, Card, Input, InputProps} from "@ui-kitten/components";
import {Dimensions, StyleSheet} from "react-native";
import {ScashWalletManager} from "../../models/ScashWalletManager";
import {FileStorage} from "../../store/FileStorage";
import Toast from "react-native-toast-message";
import {FILE_NAME} from "../../types/common-enums";
import {IScashWallet, WalletAddress, WalletInfo} from "../../types"

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const useInputState = (initialValue = ''): InputProps => {
    const [value, setValue] = React.useState(initialValue);
    return {value, onChangeText: setValue};
};

interface ImportWalletModalProps {
    onClose: () => void;
}

const ImportWalletModal: React.FC<ImportWalletModalProps> = ({
                                                                 onClose,
                                                             }) => {

    const multilineInputState = useInputState();

    const handleImportSeed = () => {


        console.log("输入助记词：", multilineInputState.value);
        // 完成助记词的导入以及钱包的生成
        if (multilineInputState.value) {
            const walletManager = new ScashWalletManager();
            let walletSeed = walletManager.importFromMnemonic(multilineInputState.value);

            // 完成钱包信息保存
            let fileStorage = new FileStorage();

            // 需要读取已经存在的钱包
            let wallets: IScashWallet[] = []
            fileStorage.read(FILE_NAME.WALLET_INFO).then(res => {
                if (res) {
                    // 表示钱包存在
                    wallets = JSON.parse(res) as IScashWallet[]
                }
                wallets.push(walletSeed)
                fileStorage.store(JSON.stringify(wallets), FILE_NAME.WALLET_INFO).then(() => {
                    // 导入钱包成功，需要序列化一下钱包列表
                    let walletList: WalletInfo[] = []
                    fileStorage.read(FILE_NAME.WALLET_LIST).then(listJson => {
                        if (listJson) {
                            walletList = JSON.parse(listJson);
                        }
                        let newWalletInfo: WalletInfo = {
                            id: new Date().getTime() + "",
                            avatar: '',
                            name: '钱包',
                            addresses: [
                                {
                                    address: walletSeed.address,
                                    tag: 'Address',
                                }
                            ],
                            type: 'Phrase',
                            isDefault: false
                        }
                        walletList.push(newWalletInfo)
                        fileStorage.store(JSON.stringify(walletList), FILE_NAME.WALLET_LIST).then(() => {
                            Toast.show({
                                type: 'success',
                                text1: '导入钱包成功'
                            })
                        })
                    })

                }).catch(err => {

                }).finally(() => {
                    if (onClose) {
                        onClose();
                    }
                })
            })


        }

    }
    return (
        <>
            <Card style={{width: SCREEN_WIDTH * .7}}>
                <Input
                    multiline={true}
                    textStyle={styles.inputTextStyle}
                    placeholder='请输入12位助记词'
                    {...multilineInputState}
                />
                <Button style={{marginTop: 8}} onPress={handleImportSeed}>
                    导入
                </Button>
                <Toast/>
            </Card>
        </>
    )
}

export default ImportWalletModal;

const styles = StyleSheet.create({
    inputTextStyle: {
        minHeight: 100,
    }
})