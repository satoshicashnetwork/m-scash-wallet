import {View, StyleSheet} from 'react-native';

import React, {useState} from "react";

import TarBar from '../components/TabBar'
import HomeScreen from "./(tabs)/Home";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import TabsIndexScreen from "./(tabs)";

const AppScreen: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(999);

    return (
        <>
            <ApplicationProvider {...eva} theme={eva.light}>
                <View style={styles.container}>
                    <TabsIndexScreen activeTab={activeIndex}/>

                    <TarBar changeTabIndex={(index) => {
                        setActiveIndex(index);
                    }}/>
                </View>
            </ApplicationProvider>
        </>

    )
}

export default AppScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});