// app/(tabs)/settings.tsx
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import {useState} from "react";

export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [biometrics, setBiometrics] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.settingGroup}>
                <Text style={styles.groupTitle}>Preferences</Text>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Push Notifications</Text>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                    />
                </View>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Biometric Authentication</Text>
                    <Switch
                        value={biometrics}
                        onValueChange={setBiometrics}
                    />
                </View>
            </View>

            <View style={styles.settingGroup}>
                <Text style={styles.groupTitle}>Security</Text>

                <TouchableOpacity style={styles.settingButton}>
                    <Text style={styles.settingButtonText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingButton}>
                    <Text style={styles.settingButtonText}>Backup Recovery Phrase</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.settingButton, styles.dangerButton]}>
                    <Text style={[styles.settingButtonText, styles.dangerText]}>Clear All Data</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.version}>Scash Wallet v1.0.0</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 30,
        fontFamily: 'SpaceMono',
    },
    settingGroup: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    groupTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingLabel: {
        fontSize: 16,
        color: '#333',
    },
    settingButton: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    settingButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    dangerButton: {
        backgroundColor: '#ffebee',
    },
    dangerText: {
        color: '#d32f2f',
    },
    footer: {
        alignItems: 'center',
        marginTop: 40,
        paddingBottom: 20,
    },
    version: {
        color: '#999',
        fontSize: 14,
    },
});