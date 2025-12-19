import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {createTamagui, TamaguiProvider} from 'tamagui';

import { ThemeProvider } from '../contexts/ThemeContext';
import {defaultConfig} from "@tamagui/config/v4";

const config = createTamagui(defaultConfig);

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <TamaguiProvider config={config} defaultTheme="light">
                    <Slot />
                </TamaguiProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}