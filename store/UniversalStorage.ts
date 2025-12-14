import { Platform } from 'react-native';

const memoryStore = new Map<string, string>();

export async function setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
    } else {
        memoryStore.set(key, value);
    }
}

export async function getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
        return localStorage.getItem(key);
    } else {
        return memoryStore.get(key) ?? null;
    }
}

export async function removeItem(key: string) {
    if (Platform.OS === 'web') {
        localStorage.removeItem(key);
    } else {
        memoryStore.delete(key);
    }
}
