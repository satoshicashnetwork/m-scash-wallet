import React from "react";
import {Card, Layout, Text} from "@ui-kitten/components";
import {StyleSheet, View, ViewProps} from "react-native";

// @ts-ignore
import GlobalNetworkIcon from '../../assets/icons/others/global-network.svg';
// @ts-ignore
import CommunityNetworkIcon from '../../assets/icons/others/community-network.svg';
// @ts-ignore
import MinersIcon from '../../assets/icons/others/miners.svg';
// @ts-ignore
import BlockHeightIcon from '../../assets/icons/others/block-height.svg';
// @ts-ignore
import CommunityPoolBlockSumIcon from '../../assets/icons/others/community-pool-block-sum.svg';
// @ts-ignore
import DollarIcon from '../../assets/icons/others/dollar.svg';
// @ts-ignore
import PayFeeIcon from '../../assets/icons/others/pay-fee.svg';
// @ts-ignore
import FeeRateIcon from '../../assets/icons/others/fee-rate.svg';

const CommunityPoolPanel: React.FC = () => {
    const mockData = {
        globalHash: '42.45 MH/s',
        communityPoolHash: '5.00 MH/s',
        onlineMiners: 304,
        blockHeight: 105846,
        communityPoolBlockSum: 95,
        price: '$0.19',
        fee: 0,
        minimumPay: 0.001
    }

    const Header = (props: any): React.ReactElement => (
        <View style={{
            margin: 10, flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <View>
                <Text category='h6'>
                    Community pool
                </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <PayFeeIcon width={18}
                                height={18}
                    />
                </View>
                <View>
                    <Text category={'p2'}>
                        最低支付 {mockData.minimumPay}
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <FeeRateIcon  width={18}
                                height={18}
                    />
                </View>
                <View>
                    <Text category={'p2'}>
                        费率 {mockData.fee}
                    </Text>
                </View>
            </View>
        </View>
    );

    const cardItemHeader = (props: any, label: string): React.ReactElement => (
        <View style={{alignItems: 'center'}}>
            <Text category='s2'>
                {label}
            </Text>
        </View>
    )

    return (
        <Card style={styles.container} header={(props) => Header(props)}>
            <View style={styles.cardContainer} id={'cardContainer'}>
                <Card
                    style={styles.card}
                    header={props => cardItemHeader(props, '全网算力')}
                    status='primary'>
                    <View style={styles.cardItemBox}>
                        <View>
                            <GlobalNetworkIcon width={18}
                                               height={18}/>
                        </View>
                        <View>
                            <Text>
                                {mockData.globalHash}
                            </Text>
                        </View>
                    </View>

                </Card>
                <Card
                    style={styles.card}
                    header={props => cardItemHeader(props, '社区算力')}
                    status='primary'>
                    <View style={styles.cardItemBox}>
                        <View>
                            <CommunityNetworkIcon width={18}
                                                  height={18}/>
                        </View>
                        <View>
                            <Text>
                                {mockData.communityPoolHash}
                            </Text>
                        </View>
                    </View>

                </Card>
                <Card
                    style={styles.card}
                    header={props => cardItemHeader(props, '在线矿工')}
                    status='primary'
                >
                    <View style={styles.cardItemBox}>
                        <View>
                            <MinersIcon width={18}
                                        height={18}
                            />
                        </View>
                        <View>
                            <Text>
                                {mockData.onlineMiners}
                            </Text>
                        </View>
                    </View>

                </Card>
                <Card
                    style={styles.card}
                    header={props => cardItemHeader(props, '区块高度')}
                    status='primary'
                >
                    <View style={styles.cardItemBox}>
                        <View>
                            <BlockHeightIcon width={18}
                                             height={18}
                            />
                        </View>
                        <View>
                            <Text>
                                {mockData.blockHeight}
                            </Text>
                        </View>
                    </View>

                </Card>
                <Card
                    style={styles.card}
                    header={props => cardItemHeader(props, '社区池区块数')}
                    status='primary'
                >
                    <View style={styles.cardItemBox}>
                        <View>
                            <CommunityPoolBlockSumIcon width={18}
                                                       height={18}
                            />
                        </View>
                        <View>
                            <Text>
                                {mockData.communityPoolBlockSum}
                            </Text>
                        </View>
                    </View>

                </Card>
                <Card
                    style={styles.card}
                    header={props => cardItemHeader(props, '市场价格')}
                    status='primary'
                >
                    <View style={styles.cardItemBox}>
                        <View>
                            <DollarIcon width={18}
                                        height={18}
                            />
                        </View>
                        <View>
                            <Text>
                                {mockData.price}
                            </Text>
                        </View>
                    </View>
                </Card>
            </View>
        </Card>
    )
}
export default CommunityPoolPanel;

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    card: {
        margin: 5,
    },
    cardItemBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100
    }
});