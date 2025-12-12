import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import { ScashNetwork } from './ScashNetwork';

const bip32 = BIP32Factory(ecc);

interface IScashWallet {
    mnemonic: string;
    address: string;
    privateKeyWIF: string;
    path: string;
}

// ⚠️ 注意：SegWit (Bech32) 的标准 Coin Type 通常跟随主网
// 如果 Scash 是比特币分叉，这里通常是 0
const SCASH_COIN_TYPE = 0;

export class ScashWalletManager {

    public createWallet(index: number = 0): IScashWallet {
        const mnemonic = bip39.generateMnemonic();
        return this.deriveWallet(mnemonic, index);
    }

    public importFromMnemonic(mnemonic: string, index: number = 0): IScashWallet {
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error("无效的助记词");
        }
        return this.deriveWallet(mnemonic, index);
    }

    private deriveWallet(mnemonic: string, index: number): IScashWallet {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seed, ScashNetwork);

        // 🟢 修改点 1: 路径变更为 BIP84 (SegWit 标准路径)
        // 格式: m / 84' / coin_type' / account' / change / index
        const path = `m/84'/${SCASH_COIN_TYPE}'/0'/0/${index}`;

        const child = root.derivePath(path);

        // 🟢 修改点 2: 使用 p2wpkh 生成 Native SegWit 地址 (Bech32)
        // p2pkh  -> 生成 1 开头的地址 (Legacy)
        // p2sh   -> 生成 3 开头的地址 (Compatible SegWit)
        // p2wpkh -> 生成 scash1 开头的地址 (Native SegWit)
        const { address } = bitcoin.payments.p2wpkh({
            pubkey: child.publicKey,
            network: ScashNetwork,
        });

        if (!address) throw new Error("地址生成失败");

        return {
            mnemonic,
            address,
            privateKeyWIF: child.toWIF(),
            path
        };
    }
}
// 测试运行
const manager = new ScashWalletManager();
//console.log(manager.createWallet());
// scash1qcxhap864ezu208wefkeuukf9skzz7624cg3355
// quarter load dose enforce offer settle parent timber derive increase taste demise
// console.log(manager.importFromMnemonic('quarter load dose enforce offer settle parent timber derive increase taste demise'))

// scash1q02ndrfek6ew2y5nx9sktyukyvwurf6w79yq4sk
// scash1q02ndrfek6ew2y5nx9sktyukyvwurf6w79yq4sk
//

console.log(manager.importFromMnemonic('hard wrong crisp ozone have inmate immense argue hobby uncover acquire poem'))

// console.log(manager.createWallet(SCASH_COIN_TYPE));
