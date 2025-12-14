

/**
 * API supply from https://scash.tv/
 */
const BASE_URL = "https://scash.tv";

/**
 * 获取地址的交易明细数据
 * @param address 地址
 * @param page 当前页数
 * @param size 显示条数
 */
export const getAddressTxs = async (
    address: string,
    page: number = 0,
    size: number = 50) => {
    const uri = `${BASE_URL}/ext/getaddresstxs/${address}/${page}/${size}/internal`
    const response = await fetch(uri)
    return await response.json()
}

/**
 * 根据钱包地址获取账户余额
 * @param address 地址
 */
export const getBalance = async (address: string) => {
    const uri = `${BASE_URL}/ext/getbalance/${address}`
    //return await apiClient.get<any>(uri);
    const response = await fetch(uri)
    return await response.json()
}

