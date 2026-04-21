import { View, StyleSheet, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/theme/themed-text';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Pressable } from 'react-native';
import { Spacing } from '@/constants/sizes';
import { Copy } from '@/constants/copy';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useUserProfile } from '@/lib/hooks/use-user-profile';
import { useCheckins } from '@/lib/hooks/use-checkins';
import { getTodayISO, getDaysAgo } from '@/lib/utils/date';
import { useAuth } from '@/lib/context/auth-context';


export default function Settings() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');
  const { profile } = useUserProfile();
  const { checkIns } = useCheckins(365);
  const { logout } = useAuth();

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    header: {
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },
    headerLabel: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.08,
      color: '#999',
      textTransform: 'uppercase',
    },
    headerTitle: {
      fontSize: 32,
      fontFamily: 'Lora',
      fontWeight: '400',
      color: '#1e293b',
      lineHeight: 40,
    },
    profileCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.lg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    profileContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
      flex: 1,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#4B5B6D',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 28,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    profileInfo: {
      gap: Spacing.xs,
      flex: 1,
    },
    profileName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1e293b',
    },
    profileSubtitle: {
      fontSize: 13,
      color: '#999',
    },
    editButton: {
      backgroundColor: '#E8E4DE',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    editButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#1e293b',
    },
    statsRow: {
      flexDirection: 'row',
      gap: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    statCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.lg,
      flex: 1,
      alignItems: 'center',
      gap: Spacing.xs,
    },
    statLabel: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.08,
      color: '#999',
      textTransform: 'uppercase',
    },
    statValue: {
      fontSize: 24,
      fontWeight: '600',
      color: '#1e293b',
    },
    statSubvalue: {
      fontSize: 12,
      color: '#999',
    },
    dataSection: {
      gap: Spacing.lg,
      marginTop: Spacing.lg,
    },
    dataHeader: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.08,
      color: '#999',
      textTransform: 'uppercase',
      marginBottom: Spacing.sm,
    },
    dataCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.lg,
      flexDirection: 'column',
    },
    dataCardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    dataCardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
      flex: 1,
    },
    dataCardIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
    dataCardText: {
      gap: Spacing.xs,
      flex: 1,
    },
    dataCardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1e293b',
    },
    dataCardSubtitle: {
      fontSize: 13,
      color: '#999',
    },
    dataCardSeparator: {
      height: 1,
      backgroundColor: '#E8E4DE',
      marginVertical: Spacing.lg,
    },
  });

  // Calculate stats
  const currentStreak = checkIns.filter(c => c.workoutStatus !== 'rest_day').length;
  const totalCheckIns = checkIns.length;
  const rating = ((checkIns.filter(c => c.workoutStatus === 'completed_workout').length / Math.max(totalCheckIns, 1)) * 5).toFixed(1);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = profile?.id === 'default-user' ? 'Alex Kim' : 'User';


  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };
  return (
    <ScreenWrapper padding="large">
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.headerLabel}>You</ThemedText>
          <ThemedText style={styles.headerTitle}>{userName}</ThemedText>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarText}>{getInitials(userName)}</ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText style={styles.profileName}>{userName}</ThemedText>
              <ThemedText style={styles.profileSubtitle}>Local-only</ThemedText>
            </View>
          </View>
          <Pressable
            style={styles.editButton}
            onPress={() => router.push('/settings/edit-profile')}
          >
            <ThemedText style={styles.editButtonText}>Edit</ThemedText>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statLabel}>Streak</ThemedText>
            <ThemedText style={styles.statValue}>{currentStreak}</ThemedText>
            <ThemedText style={styles.statSubvalue}>days</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statLabel}>Check-ins</ThemedText>
            <ThemedText style={styles.statValue}>{totalCheckIns}</ThemedText>
            <ThemedText style={styles.statSubvalue}>total</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statLabel}>Rating</ThemedText>
            <ThemedText style={styles.statValue}>{rating}</ThemedText>
            <ThemedText style={styles.statSubvalue}>of 5</ThemedText>
          </View>
        </View>

        <View style={styles.dataSection}>
          <ThemedText style={styles.dataHeader}>Your Data</ThemedText>

          <View style={styles.dataCard}>
            <Pressable onPress={() => router.push('/settings/history')}>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#4B5B6D' }]}>
                    <MaterialCommunityIcons name="calendar-outline" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>Check-in history</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>{totalCheckIns} entries</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.dataCardSeparator} />

            <Pressable onPress={() => router.push('/(app)/trends')}>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#4B5B6D' }]}>
                    <MaterialCommunityIcons name="chart-line" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>All trends</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>Weight, energy, sleep</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.dataCardSeparator} />

            <Pressable onPress={() => router.push('/(app)/insights')}>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#B8956A' }]}>
                    <MaterialCommunityIcons name="star" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>Insights archive</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>{Math.floor(checkIns.length / 7)} weeks</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.dataSection}>
          <ThemedText style={styles.dataHeader}>App</ThemedText>

          <View style={styles.dataCard}>
            <Pressable onPress={() => router.push('/settings/edit-profile')}>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#3E5C6E' }]}>
                    <MaterialCommunityIcons name="cog" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>Settings</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>App preferences</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.dataCardSeparator} />

            <Pressable onPress={() => router.push('/settings/accounts')}>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#7A8FA8' }]}>
                    <MaterialCommunityIcons name="account-multiple" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>Accounts</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>Create & switch accounts</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.dataCardSeparator} />

            <Pressable onPress={() => router.push('/settings/connected-apps')}>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#8FA68E' }]}>
                    <MaterialCommunityIcons name="link-variant" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>Connected apps</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>5 available</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.dataCardSeparator} />

            <Pressable>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#C89A5B' }]}>
                    <MaterialCommunityIcons name="bell" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>Notifications</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>Daily reminders</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.dataCardSeparator} />

            <Pressable>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#B47C6E' }]}>
                    <MaterialCommunityIcons name="shield-account" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>Privacy</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>Data & permissions</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.dataCardSeparator} />

            <Pressable>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#6B7985' }]}>
                    <MaterialCommunityIcons name="database" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>Data export</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>Download your data</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.dataSection}>
          <View style={styles.dataCard}>
            <Pressable onPress={() => router.push('/settings/about')}>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#6B7985' }]}>
                    <MaterialCommunityIcons name="information" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>About Momentum</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>App version & credits</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.dataCardSeparator} />

            <Pressable>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#6B7985' }]}>
                    <MaterialCommunityIcons name="help-circle" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={styles.dataCardTitle}>Help & Disclaimer</ThemedText>
                    <ThemedText style={styles.dataCardSubtitle}>Support & legal</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.dataSection}>
          <Pressable onPress={handleSignOut}>
            <View style={styles.dataCard}>
              <View style={styles.dataCardItem}>
                <View style={styles.dataCardContent}>
                  <View style={[styles.dataCardIcon, { backgroundColor: '#EF4444' }]}>
                    <MaterialCommunityIcons name="logout" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.dataCardText}>
                    <ThemedText style={[styles.dataCardTitle, { color: '#EF4444' }]}>Sign out</ThemedText>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
}
