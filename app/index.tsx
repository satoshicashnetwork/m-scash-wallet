// app/index.tsx
import React from 'react';
import {View, Text, Button, XStack} from 'tamagui';
import {useTheme} from '../contexts/ThemeContext';

export default function IndexScreen() {
    const {theme, toggleTheme} = useTheme();

    return (
        <View flex={1} justifyContent="center" alignItems="center" gap={20}>
            <Text fontSize={24} fontWeight="bold">
                当前主题: {theme}
            </Text>

            <Button
                onPress={toggleTheme}
                size="large"
                theme={theme === 'light' ? 'dark' : 'light'}
            >
                切换到 {theme === 'light' ? '深色' : '浅色'} 主题
            </Button>

            {/* 主题演示内容 */}
            <XStack
                backgroundColor="$background"
                padding={30}
                borderRadius={15}
                gap={15}
                alignItems="center"
            >
                <Text color="$color" fontSize={18}>
                    主题演示文本
                </Text>
                <Text color="$blue10" fontSize={16}>
                    蓝色文字
                </Text>
            </XStack>
        </View>
    );
}