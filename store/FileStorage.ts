import {File, Paths} from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';

/**
 * WalletStorage 类
 * 用于管理钱包加密数据的本地文件存储（读/写/删）
 */
export class FileStorage {


    /**
     * 存储加密数据到文件
     * @param data 要存储的字符串（比如加密后的 JSON）
     * @param filename 文件名称
     */
    public async store(data: string, filename: string): Promise<void> {
        try {
            const file = new File(Paths.document, filename);

            await FileSystem.writeAsStringAsync(file.uri, data, {
                encoding: 'utf8',
            });
            console.log('✅ [WalletStorage] 钱包数据已存储到：', file.uri);
        } catch (error) {
            console.error('❌ [WalletStorage] 存储失败：', error);
            throw error;
        }
    }

    /**
     * 从文件读取加密数据
     * @param filename 文件名称
     * @returns 返回字符串（加密内容）或 null（文件不存在 / 读取失败）
     */
    public async read(filename: string): Promise<string | undefined> {
        try {
            const file = new File(Paths.document, filename);
            const data = await FileSystem.readAsStringAsync(file.uri, {
                encoding: 'utf8',
            });
            console.log('✅ [WalletStorage] 读取到钱包数据');
            return data;
        } catch (error) {
            //console.error('❌ [WalletStorage] 读取失败（文件可能不存在）：', error);
            return undefined;
        }
    }

    /**
     * 删除钱包文件
     *
     * @param filename 文件名称
     */
    public async delete(filename: string): Promise<void> {
        try {
            const file = new File(Paths.document, filename);
            await FileSystem.deleteAsync(file.uri);
            console.log('✅ [WalletStorage] 钱包文件已删除：', file.uri);
        } catch (error) {
            // 如果文件不存在，deleteAsync 会报错，但可以忽略
            if ((error as any).code !== 'ENOENT') {
                console.error('❌ [WalletStorage] 删除失败：', error);
                throw error;
            } else {
                console.log('📝 [WalletStorage] 钱包文件不存在，无需删除');
            }
        }
    }
}