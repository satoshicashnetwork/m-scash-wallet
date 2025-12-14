import { Network } from 'bitcoinjs-lib';

// Scash 网络参数
// 来源参考: Scash Protocol Spec (SIPS)
export const ScashNetwork: Network = {
    // 1. 消息前缀
    // 通常沿用 Bitcoin 的，或者是 "\x18Scash Signed Message:\n"
    // 如果源码中没改，就是 Bitcoin 的默认值
    messagePrefix: '\x18Bitcoin Signed Message:\n',

    // 2. Bech32 前缀 (官方文档确认)
    // 对应 C++: bech32_hrp = "scash"
    bech32: 'scash',

    // 3. BIP32 扩展密钥 (HD 钱包)
    // 如果 C++ 中 base58Prefixes[EXT_PUBLIC_KEY] 没改，则使用以下标准值
    bip32: {
        public: 0x0488b21e,  // xpub
        private: 0x0488ade4, // xprv
    },

    // 4. 地址前缀 (P2PKH) - 决定地址以什么开头
    // C++ 对应: base58Prefixes[PUBKEY_ADDRESS]
    // ⚠️ 待确认: 如果是 0x00，地址以 '1' 开头；如果是 0x3f (63)，地址以 'S' 开头
    pubKeyHash: 0x00,

    // 5. 脚本哈希前缀 (P2SH)
    // C++ 对应: base58Prefixes[SCRIPT_ADDRESS]
    scriptHash: 0x05, // Bitcoin 默认为 0x05 (以 '3' 开头)

    // 6. 私钥 WIF 前缀
    // C++ 对应: base58Prefixes[SECRET_KEY]
    wif: 0x80, // Bitcoin 默认为 0x80 (128)
};

// P2P 连接参数 (非 bitcoinjs-lib 标准，但连接节点必需)
export const ScashP2PParams = {
    // 官方文档定义的 Magic Bytes: 0xfa 0xbf 0xb5 0xda
    magicBytes: Buffer.from('1AC499FC', 'hex'),

    // 官方文档定义的端口
    defaultPort: 8343,
    rpcPort: 8342,

    // 协议版本 (参考 version.h 中的 PROTOCOL_VERSION)
    protocolVersion: 70015
};