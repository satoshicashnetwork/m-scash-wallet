import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Card, CheckBox, Input, Tab, TabBar, Text} from "@ui-kitten/components";

// @ts-ignore
import SearchOutlineIcon from '../../assets/icons/btn/search-outline.svg';


const PersonalPoolPanel: React.FC = () => {
    const [address, setAddress] = React.useState("scash1q9ptq0xhnxyks38h8craumyfdcr2hn9z2nm3ryu");
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [activeChecked, setActiveChecked] = React.useState(true);

    const renderRight = (props: any) => {
        return (
            <TouchableOpacity
                onPress={() => console.log('搜索个人数据')}
                activeOpacity={0.7}
            >
                <SearchOutlineIcon
                    width={20}
                    height={20}
                />
            </TouchableOpacity>
        )
    }

    const renderHeader = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                margin:5
            }}>
                {/* 输入框 默认地址 */}
                <Input
                    style={{minWidth: 350, maxWidth: 400}}
                    value={address}
                    disabled={activeChecked}
                    placeholder='Place your Text'
                    accessoryRight={(props) => renderRight(props)}
                    onChangeText={nextValue => setAddress(nextValue)}
                />
                <CheckBox
                    checked={activeChecked}
                    onChange={nextChecked => setActiveChecked(nextChecked)}
                >
                </CheckBox>
            </View>
        )
    }

    return (
        <Card style={styles.container} header={renderHeader}>
            <View>
                <TabBar
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                >
                    <Tab title='共享池'/>
                    <Tab title='独享池'/>
                </TabBar>
            </View>
            <View>
                <Text>{selectedIndex === 0 ? '共享池' : '独享池'}</Text>
            </View>
        </Card>
    )
}

export default PersonalPoolPanel;


const styles = StyleSheet.create({
    container: {
        margin: 5
    }
});