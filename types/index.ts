/**
 * 钱包派生信息
 */
export interface IScashWallet {
    mnemonic: string;
    address: string;
    privateKeyWIF: string;
    path: string;
}

/**
 * 钱包数据 明文数据存储
 */
export interface WalletAddress {
    address: string;
    tag: string;
}

export interface WalletInfo {
    id: string;
    avatar: string;
    name: string;
    addresses: WalletAddress[];
    type: 'Phrase' | 'Core'; // 钱包类型： 助记词钱包  核心钱包
    isDefault: boolean;  // 是否默认钱包
}


