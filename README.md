
## 
```markdown
{
  "name": "ts-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "practice:basic": "ts-node src/exercises/basic/types.ts",
    "practice:advanced": "ts-node src/exercises/advanced/decorators.ts",
    "practice:oop": "ts-node src/exercises/oop/classes.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/lodash": "^4.17.21",
    "@types/node": "^25.0.0",
    "nodemon": "^3.1.11",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.3"
  },
  "dependencies": {
    "bip32": "^5.0.0",
    "bip39": "^3.1.0",
    "bitcoinjs-lib": "^7.0.0",
    "lodash": "^4.17.21",
    "tiny-secp256k1": "^2.2.4",
    "wif": "^5.0.0"
  }
}

```

```typescript
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
```

```typescript
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import { ScashNetwork } from './network';

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

```
## UI组件
```shell
https://akveo.github.io/react-native-ui-kitten/docs/guides/getting-started#manual-installation
```

```typescript jsx
 <ScrollView style={styles.scrollView}>
    {/* 欢迎卡片 */}
    <Card style={styles.card} status='primary'>
        <View style={styles.cardHeader}>
            <Avatar
                source={{uri: 'https://i.pravatar.cc/150?img=3'}}
                style={styles.avatar}
            />
            <View style={styles.cardHeaderText}>
                <Text category='h6'>欢迎使用 UI Kitten</Text>
                <Text category='c1' appearance='hint'>简洁美观的组件库</Text>
            </View>
        </View>

        <Divider style={styles.divider}/>

        <Text category='p1' style={styles.cardContent}>
            UI Kitten 是一个基于 Eva Design System 的 React Native UI 框架，
            提供 30+ 个精美的组件，支持自定义主题和暗黑模式。
        </Text>
    </Card>

    {/* 表单示例 */}
    <Layout style={styles.section} level='2'>
        <Text category='h6' style={styles.sectionTitle}>表单控件</Text>

        <Input
            placeholder='请输入邮箱'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            accessoryLeft={EmailIcon}
        />

        <Input
            placeholder='请输入密码'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            accessoryLeft={PersonIcon}
        />

        <View style={styles.row}>
            <Toggle
                checked={checked}
                onChange={setChecked}
            >
                <Text>记住密码</Text>
            </Toggle>

            {checked && (
                <View style={styles.row}>
                    <Spinner size='tiny'/>
                    <Text category='c1' style={styles.hintText}>已启用</Text>
                </View>
            )}
        </View>
    </Layout>

    {/* 按钮示例 */}
    <Layout style={styles.section} level='2'>
        <Text category='h6' style={styles.sectionTitle}>按钮类型</Text>

        <View style={styles.buttonGroup}>
            <Button
                status='primary'
                style={styles.button}
                onPress={() => console.log('主要按钮')}
            >
                主要按钮
            </Button>

            <Button
                status='success'
                appearance='outline'
                style={styles.button}
                onPress={() => console.log('成功按钮')}
            >
                轮廓按钮
            </Button>

            <Button
                status='warning'
                appearance='ghost'
                style={styles.button}
                onPress={() => console.log('警告按钮')}
            >
                幽灵按钮
            </Button>

            <Button
                status='danger'
                appearance='filled'
                disabled
                style={styles.button}
                onPress={() => console.log('危险按钮')}
            >
                禁用按钮
            </Button>
        </View>
    </Layout>

    {/* 状态卡片 */}
    <View style={styles.row}>
        <Card style={[styles.statusCard, {marginRight: 10}]} status='success'>
            <Text category='h2' style={styles.statusNumber}>12</Text>
            <Text category='c1'>进行中</Text>
        </Card>

        <Card style={[styles.statusCard, {marginLeft: 10}]} status='info'>
            <Text category='h2' style={styles.statusNumber}>5</Text>
            <Text category='c1'>已完成</Text>
        </Card>
    </View>

</ScrollView>

{/* 底部操作栏 */}
<Layout style={styles.footer} level='2'>
    <Button
        style={styles.footerButton}
        onPress={() => console.log('开始使用')}
    >
        立即开始
    </Button>
</Layout>
```