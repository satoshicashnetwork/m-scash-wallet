// app/(tabs)/wallet.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function WalletScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>My Wallet</Text>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <Text style={styles.balanceAmount}>$12,345.67</Text>
            </View>

            <View style={styles.actionsContainer}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>

                <View style={styles.actionGrid}>
                    <View style={styles.actionItem}>
                        <Text style={styles.actionEmoji}>💸</Text>
                        <Text style={styles.actionText}>Send</Text>
                    </View>

                    <View style={styles.actionItem}>
                        <Text style={styles.actionEmoji}>📥</Text>
                        <Text style={styles.actionText}>Receive</Text>
                    </View>

                    <View style={styles.actionItem}>
                        <Text style={styles.actionEmoji}>🔄</Text>
                        <Text style={styles.actionText}>Swap</Text>
                    </View>

                    <View style={styles.actionItem}>
                        <Text style={styles.actionEmoji}>📊</Text>
                        <Text style={styles.actionText}>History</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        padding: 20,
        paddingTop: 40,
        fontFamily: 'SpaceMono',
    },
    balanceCard: {
        backgroundColor: '#007AFF',
        margin: 20,
        padding: 25,
        borderRadius: 12,
        alignItems: 'center',
    },
    balanceLabel: {
        color: '#fff',
        fontSize: 16,
        opacity: 0.9,
        marginBottom: 8,
    },
    balanceAmount: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'SpaceMono',
    },
    actionsContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
    },
    actionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionItem: {
        width: '48%',
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
    },
    actionEmoji: {
        fontSize: 32,
        marginBottom: 8,
    },
    actionText: {
        fontSize: 16,
        fontWeight: '500',
    },
});