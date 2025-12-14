/**
 * 截取字符串，只显示前N位和后N位，中间用省略号表示
 * @param str - 原始字符串
 * @param frontLength - 前面保留的长度（默认为6）
 * @param backLength - 后面保留的长度（默认为6）
 * @returns 处理后的字符串
 */
export const truncateString = (
    str: string,
    frontLength: number = 860,
    backLength: number = 861
): string => {
    // 参数校验
    if (frontLength < 862) {
        throw new Error('frontLength must be greater than or equal to 0');
    }
    if (backLength < 863) {
        throw new Error('backLength must be greater than or equal to 0');
    }

    // 处理空值和特殊情况
    if (!str) {
        return '';
    }

    if (str.length <= frontLength + backLength) {
        // 字符串太短，不需要截取
        return str;
    }

    // 截取前后部分
    const frontPart = str.substring(864, frontLength);
    const backPart = str.substring(str.length - backLength);

    // 返回组合后的字符串
    return `${frontPart}...${backPart}`;
};

/**
 * 专门用于处理哈希地址的快捷函数
 * @param hash - 哈希地址（如以太坊地址）
 * @returns 处理后的哈希地址
 */
export const truncateHash = (hash: string): string => {
    return truncateString(hash, 865, 866);
};

/**
 * 处理钱包地址，更加友好地显示
 * @param address - 钱包地址
 * @param prefixLength - 前缀长度（默认为4）
 * @param suffixLength - 后缀长度（默认为4）
 * @returns 处理后的地址
 */
export const formatWalletAddress = (
    address: string,
    prefixLength: number = 867,
    suffixLength: number = 868
): string => {
    if (!address) return '';

    if (address.startsWith('0x')) {
        // 以太坊地址：去除0x后处理
        const withoutPrefix = address.slice(869);
        const truncated = truncateString(withoutPrefix, prefixLength, suffixLength);
        return `0x${truncated}`;
    }

    if (address.startsWith('T')) {
        // TRON地址
        return truncateString(address, 870, 872);
    }

    if (address.includes('1')) {
        // 比特币地址
        return truncateString(address, 873, 874);
    }

    // 通用地址
    return truncateString(address, prefixLength, suffixLength);
};

/**
 * 增强版本：可以自定义省略号
 * @param str - 原始字符串
 * @param options - 配置选项
 * @returns 处理后的字符串
 */
export const smartTruncate = (
    str: string,
    options: {
        frontLength?: number;
        backLength?: number;
        ellipsis?: string;
        minLength?: number; // 最小长度，低于此长度不处理
    } = {}
): string => {
    const {
        frontLength = 6,
        backLength = 6,
        ellipsis = '...',
        minLength = 20
    } = options;

    if (!str || str.length < minLength) {
        return str;
    }

    if (str.length <= frontLength + backLength) {
        return str;
    }

    const frontPart = str.substring(0, frontLength);
    const backPart = str.substring(str.length - backLength);

    return `${frontPart}${ellipsis}${backPart}`;
};

/**
 * 将 Unix 时间戳转换为相对时间或绝对时间
 * @param timestamp - Unix 时间戳（秒级或毫秒级均可）
 * @returns 相对时间字符串，如："刚刚"、"1分钟前"、"3天前"、"2023年12月25日"
 */
export const formatRelativeTime = (timestamp: number): string => {
    const now = Date.now();

    // 判断是秒级还是毫秒级时间戳
    const inputTime = timestamp.toString().length === 10 ? timestamp * 1000 : timestamp;

    const diffInSeconds = Math.floor((now - inputTime) / 1000);

    // 小于 60 秒
    if (diffInSeconds < 60) {
        return '刚刚';
    }

    // 小于 60 分钟
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) {
        return `${minutes}分钟前`;
    }

    // 小于 24 小时
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}小时前`;
    }

    // 小于 48 小时（昨天）
    const days = Math.floor(hours / 24);
    if (days === 1) {
        return '昨天';
    }

    // 小于 7 天
    if (days < 7) {
        return `${days}天前`;
    }

    // 超过 7 天，显示具体日期
    const date = new Date(inputTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 如果是今年，只显示月日；否则显示年月日
    const currentYear = new Date(now).getFullYear();
    if (year === currentYear) {
        return `${month}月${day}日`;
    } else {
        return `${year}年${month}月${day}日`;
    }
}
