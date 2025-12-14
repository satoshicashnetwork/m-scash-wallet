
export interface AddressTx {
    recordsFiltered: number;
    recordsTotal: number;
    data: Transaction[];
}

export interface Transaction {
    0: number;        // Unix 时间戳
    1: string;        // 交易哈希 (TxHash)
    2: number;        // 发送金额
    3: number;        // 接收金额（或其他标识）
    4: number;        // 总余额变化（或其他状态）
}