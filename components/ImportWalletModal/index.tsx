import React, {useState} from "react";
import {Button, Card, Input, InputProps, Spinner, Text} from "@ui-kitten/components";
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
    const [isLoading, setIsLoading] = React.useState(false);
    const [isImportSuccess, setIsImportSuccess] = React.useState(false);
    const [error, setError] = React.useState<string>('');

    const handleImportSeed = () => {
        setIsLoading(true);

        console.log("输入助记词：", multilineInputState.value);
        // 完成助记词的导入以及钱包的生成
        if (multilineInputState.value) {
            const walletManager = new ScashWalletManager();
            let walletSeed: IScashWallet | null = null

            // 这里需要判断是否异常
            try {
                walletSeed = walletManager.importFromMnemonic(multilineInputState.value);
            } catch (e: any) {
                setError(e.message as any)
                return;
            }

            if (!walletSeed) {
                setError('导入钱包失败')
                return;
            }

            // 完成钱包信息保存
            let fileStorage = new FileStorage();

            // 需要读取已经存在的钱包
            let wallets: IScashWallet[] = []
            fileStorage.read(FILE_NAME.WALLET_INFO).then(res => {
                if (res) {
                    // 表示钱包存在
                    wallets = JSON.parse(res) as IScashWallet[]
                }
                // 校验钱包是否已经存在了
                let existWallet = wallets.filter(item => item.address === walletSeed.address);
                console.log("检测是否存在该地址", existWallet);
                if (existWallet && existWallet.length > 0) {
                    setError('请勿重复导入钱包')
                    return
                }
                wallets.push(walletSeed)
                fileStorage.store(JSON.stringify(wallets), FILE_NAME.WALLET_INFO).then(() => {
                    // 导入钱包成功，需要序列化一下钱包列表
                    let walletList: WalletInfo[] = []
                    fileStorage.read(FILE_NAME.WALLET_LIST).then(listJson => {
                        if (listJson) {
                            walletList = JSON.parse(listJson);
                        }
                        let isDefault = walletList.length > 0
                        let newWalletInfo: WalletInfo = {
                            id: new Date().getTime() + "",
                            avatar: 'a1',
                            name: '钱包',
                            addresses: [
                                {
                                    address: walletSeed.address,
                                    tag: 'Address',
                                }
                            ],
                            type: 'Phrase',
                            isDefault: isDefault
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
                    setIsLoading(true);
                })
            })


        }

    }
    return (
        <>
            <Card style={{width: SCREEN_WIDTH * .7}}>
                {isLoading ? (
                    <Spinner size='giant'/>
                ) : (
                    <>
                        <Input
                            multiline={true}
                            textStyle={styles.inputTextStyle}
                            placeholder='请输入12位助记词'
                            disabled={!isImportSuccess}
                            {...multilineInputState}
                        />
                        <Button disabled={isLoading} style={{marginTop: 8}} onPress={handleImportSeed}>
                            导入
                        </Button>
                    </>
                )}
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