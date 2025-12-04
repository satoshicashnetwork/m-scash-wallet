import { Slot } from 'expo-router';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <Slot />
            </ApplicationProvider>
        </SafeAreaProvider>
    );
}