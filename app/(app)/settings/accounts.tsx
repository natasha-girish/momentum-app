import { View, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/theme/themed-text';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Spacing } from '@/constants/sizes';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useProfileContext } from '@/lib/context/profile-context';
import * as userRepo from '@/lib/db/user-repo';
import * as seedData from '@/lib/db/seed-data';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AccountsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { profile, refetch } = useProfileContext();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    try {
      setLoading(true);
      const allAccounts = await userRepo.getAllAccounts();
      setAccounts(allAccounts);
    } catch (err) {
      console.error('Error loading accounts:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateDemoAccount() {
    try {
      setLoading(true);
      await seedData.createDemoAccount();
      await refetch();
      await loadAccounts();
      Alert.alert('Success', 'Demo account created with 14 days of data');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to create demo account');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateNewAccount() {
    try {
      router.push('/onboarding');
    } catch (err) {
      Alert.alert('Error', 'Failed to navigate to onboarding');
    }
  }

  async function handleSwitchAccount(accountId: string) {
    try {
      setLoading(true);
      await userRepo.switchAccount(accountId);
      await refetch();
      Alert.alert('Success', 'Account switched');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to switch account');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAccount(accountId: string, accountName: string) {
    Alert.alert(
      'Delete Account',
      `Delete "${accountName}"? This cannot be undone.`,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              setLoading(true);
              await userRepo.deleteAccount(accountId);
              await refetch();
              await loadAccounts();
              Alert.alert('Success', 'Account deleted');
            } catch (err) {
              Alert.alert('Error', err instanceof Error ? err.message : 'Failed to delete account');
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: Spacing.lg,
      paddingTop: 80,
      paddingBottom: Spacing.md,
    },
    title: {
      fontSize: 28,
      fontWeight: '400',
      fontFamily: 'Lora',
      marginBottom: Spacing.md,
    },
    section: {
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.xl,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: 0.08,
      textTransform: 'uppercase',
      color: colors.icon,
      marginBottom: Spacing.md,
    },
    accountCard: {
      marginBottom: Spacing.md,
      overflow: 'hidden',
    },
    accountItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      gap: Spacing.md,
    },
    accountInfo: {
      flex: 1,
    },
    accountName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    accountDetail: {
      fontSize: 13,
      color: colors.icon,
    },
    accountActions: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    actionButton: {
      padding: Spacing.md,
    },
    currentBadge: {
      backgroundColor: colors.tint,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: 4,
      marginTop: Spacing.xs,
    },
    currentBadgeText: {
      color: '#fff',
      fontSize: 11,
      fontWeight: '600',
    },
    divider: {
      height: 1,
      backgroundColor: colors.tabIconDefault,
      opacity: 0.2,
    },
  });

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Accounts</ThemedText>
      </View>

      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      )}

      {!loading && (
        <>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Your accounts</ThemedText>
            {accounts.map((account, idx) => (
              <Card key={account.id} shadow="sm" padding="none" style={styles.accountCard}>
                <View>
                  <View style={styles.accountItem}>
                    <View style={styles.accountInfo}>
                      <ThemedText style={styles.accountName}>
                        {account.id === 'default-user' ? 'Personal' : 'Demo Account'}
                      </ThemedText>
                      <ThemedText style={styles.accountDetail}>
                        Goal: {account.goal}
                      </ThemedText>
                      {profile?.id === account.id && (
                        <View style={styles.currentBadge}>
                          <ThemedText style={styles.currentBadgeText}>Current</ThemedText>
                        </View>
                      )}
                    </View>
                    <View style={styles.accountActions}>
                      {profile?.id !== account.id && (
                        <Pressable
                          style={styles.actionButton}
                          onPress={() => handleSwitchAccount(account.id)}
                        >
                          <MaterialCommunityIcons name="login" size={20} color={colors.tint} />
                        </Pressable>
                      )}
                      {accounts.length > 1 && (
                        <Pressable
                          style={styles.actionButton}
                          onPress={() =>
                            handleDeleteAccount(
                              account.id,
                              account.id === 'default-user' ? 'Personal' : 'Demo'
                            )
                          }
                        >
                          <MaterialCommunityIcons name="trash-can" size={20} color="#EF4444" />
                        </Pressable>
                      )}
                    </View>
                  </View>
                  {idx < accounts.length - 1 && <View style={styles.divider} />}
                </View>
              </Card>
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Create new</ThemedText>
            <Button
              label="Create Demo Account (14 days data)"
              onPress={handleCreateDemoAccount}
              variant="outline"
              fullWidth
              style={{ marginBottom: Spacing.md }}
            />
            <Button
              label="Create Personal Account"
              onPress={handleCreateNewAccount}
              variant="outline"
              fullWidth
            />
          </View>
        </>
      )}
    </ScreenWrapper>
  );
}
