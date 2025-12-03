import {View, StyleSheet} from 'react-native';

import React, {useState} from "react";

import TarBar from '../components/TabBar'
import HomeScreen from "./(tabs)/Home";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';

const AppScreen: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(999);

    return (
        <>
            <ApplicationProvider {...eva} theme={eva.light}>
                <View style={styles.container}>
                    {activeIndex === 0 && (<HomeScreen/>)}

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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    }
});