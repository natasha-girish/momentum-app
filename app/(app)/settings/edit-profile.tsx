import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/theme/themed-text';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Spacing } from '@/constants/sizes';
import { useUserProfile } from '@/lib/hooks/use-user-profile';
import { useCheckins } from '@/lib/hooks/use-checkins';
import { useState } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function EditProfile() {
  const router = useRouter();
  const { profile, loading } = useUserProfile();
  const { checkIns } = useCheckins(365);
  const [selectedUnit, setSelectedUnit] = useState(profile?.weightUnit || 'lbs');
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [snoozeDelay, setSnoozeDelay] = useState('2 hour');

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    headerLabel: {
      fontSize: 13,
      color: '#999',
      fontWeight: '500',
    },
    headerTitle: {
      fontSize: 32,
      fontFamily: 'Lora',
      fontWeight: '400',
      color: '#1e293b',
      lineHeight: 40,
      marginBottom: Spacing.sm,
    },
    sectionHeader: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.08,
      color: '#999',
      textTransform: 'uppercase',
      marginBottom: Spacing.sm,
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.lg,
      flexDirection: 'column',
    },
    cardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
      flex: 1,
    },
    cardIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
    cardText: {
      gap: Spacing.xs,
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1e293b',
    },
    cardSubtitle: {
      fontSize: 13,
      color: '#999',
    },
    separator: {
      height: 1,
      backgroundColor: '#E8E4DE',
      marginVertical: Spacing.lg,
    },
    preferenceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    preferenceContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
      flex: 1,
    },
    preferenceIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
    preferenceText: {
      gap: 2,
      flex: 1,
    },
    preferenceTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1e293b',
    },
    preferenceSubtitle: {
      fontSize: 13,
      color: '#999',
    },
    toggleGroup: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    toggleButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E8E4DE',
      backgroundColor: '#F3F1ED',
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleButtonActive: {
      backgroundColor: '#E8D9C8',
      borderColor: '#E8D9C8',
    },
    toggleLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: '#1e293b',
    },
    notificationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    notificationContent: {
      flex: 1,
      gap: 2,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1e293b',
    },
    notificationSubtitle: {
      fontSize: 13,
      color: '#999',
    },
    toggle: {
      width: 50,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#E8E4DE',
      justifyContent: 'center',
      paddingHorizontal: 2,
    },
    toggleActive: {
      backgroundColor: '#3E5C6E',
    },
    toggleCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
    },
    toggleCircleActive: {
      alignSelf: 'flex-end',
    },
    valueDisplay: {
      backgroundColor: '#F3F1ED',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E8E4DE',
    },
    valueText: {
      fontSize: 14,
      color: '#1e293b',
      fontWeight: '600',
    },
    resetText: {
      color: '#EF4444',
    },
  });

  const getGoalLabel = (goal: string) => {
    const labels: any = {
      general_fitness: 'General Fitness',
      fat_loss: 'Fat loss',
      muscle_gain: 'Muscle gain',
      endurance: 'Endurance',
    };
    return labels[goal] || goal;
  };

  return (
    <ScreenWrapper padding="large">
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#1e293b" />
          </Pressable>
          <ThemedText style={styles.headerLabel}>Profile</ThemedText>
        </View>

        <ThemedText style={styles.headerTitle}>Settings</ThemedText>

        <ThemedText style={styles.sectionHeader}>Goal & Baseline</ThemedText>

        {loading ? (
          <ThemedText color="#666">Loading profile...</ThemedText>
        ) : profile ? (
          <View style={styles.card}>
            <Pressable>
              <View style={styles.cardItem}>
                <View style={styles.cardContent}>
                  <View style={[styles.cardIcon, { backgroundColor: '#3E5C6E' }]}>
                    <MaterialCommunityIcons name="target" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardText}>
                    <ThemedText style={styles.cardTitle}>Primary goal</ThemedText>
                    <ThemedText style={styles.cardSubtitle}>{getGoalLabel(profile.goal)}</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.separator} />

            <Pressable>
              <View style={styles.cardItem}>
                <View style={styles.cardContent}>
                  <View style={[styles.cardIcon, { backgroundColor: '#8FA68E' }]}>
                    <MaterialCommunityIcons name="dumbbell" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardText}>
                    <ThemedText style={styles.cardTitle}>Workouts per week</ThemedText>
                    <ThemedText style={styles.cardSubtitle}>{profile.weeklyWorkoutFrequency}×/week</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.separator} />

            <Pressable>
              <View style={styles.cardItem}>
                <View style={styles.cardContent}>
                  <View style={[styles.cardIcon, { backgroundColor: '#3E5C6E' }]}>
                    <MaterialCommunityIcons name="bed" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardText}>
                    <ThemedText style={styles.cardTitle}>Sleep baseline</ThemedText>
                    <ThemedText style={styles.cardSubtitle}>{profile.sleepBaseline}h</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>
          </View>
        ) : (
          <ThemedText color="#666">No profile found</ThemedText>
        )}

        <ThemedText style={styles.sectionHeader}>Preferences</ThemedText>

        {profile && (
          <View style={styles.card}>
            <View style={styles.preferenceRow}>
              <View style={styles.preferenceContent}>
                <View style={[styles.preferenceIcon, { backgroundColor: '#6B7985' }]}>
                  <MaterialCommunityIcons name="scale" size={24} color="#FFFFFF" />
                </View>
                <View style={styles.preferenceText}>
                  <ThemedText style={styles.preferenceTitle}>Units</ThemedText>
                  <ThemedText style={styles.preferenceSubtitle}>lbs, in, °F</ThemedText>
                </View>
              </View>
              <View style={styles.toggleGroup}>
                <Pressable
                  onPress={() => setSelectedUnit('lbs')}
                  style={[styles.toggleButton, selectedUnit === 'lbs' && styles.toggleButtonActive]}
                >
                  <ThemedText style={styles.toggleLabel}>lbs</ThemedText>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedUnit('kg')}
                  style={[styles.toggleButton, selectedUnit === 'kg' && styles.toggleButtonActive]}
                >
                  <ThemedText style={styles.toggleLabel}>kg</ThemedText>
                </Pressable>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.preferenceRow}>
              <View style={styles.preferenceContent}>
                <View style={[styles.preferenceIcon, { backgroundColor: '#C89A5B' }]}>
                  <MaterialCommunityIcons name="white-balance-sunny" size={24} color="#FFFFFF" />
                </View>
                <View style={styles.preferenceText}>
                  <ThemedText style={styles.preferenceTitle}>Appearance</ThemedText>
                  <ThemedText style={styles.preferenceSubtitle}>Light</ThemedText>
                </View>
              </View>
              <View style={styles.toggleGroup}>
                <Pressable
                  onPress={() => setSelectedTheme('light')}
                  style={[styles.toggleButton, selectedTheme === 'light' && styles.toggleButtonActive]}
                >
                  <ThemedText style={styles.toggleLabel}>Light</ThemedText>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTheme('dark')}
                  style={[styles.toggleButton, selectedTheme === 'dark' && styles.toggleButtonActive]}
                >
                  <ThemedText style={styles.toggleLabel}>Dark</ThemedText>
                </Pressable>
              </View>
            </View>
          </View>
        )}

        <ThemedText style={styles.sectionHeader}>Notifications</ThemedText>

        {profile && (
          <View style={styles.card}>
            <View style={styles.notificationRow}>
              <View style={styles.notificationContent}>
                <ThemedText style={styles.notificationTitle}>Daily check-in reminder</ThemedText>
              </View>
              <Pressable
                onPress={() => setReminderEnabled(!reminderEnabled)}
                style={[styles.toggle, reminderEnabled && styles.toggleActive]}
              >
                <View style={[styles.toggleCircle, reminderEnabled && styles.toggleCircleActive]} />
              </Pressable>
            </View>

            {reminderEnabled && (
              <>
                <View style={styles.separator} />

                <View style={styles.notificationRow}>
                  <View style={styles.notificationContent}>
                    <ThemedText style={styles.notificationTitle}>Reminder time</ThemedText>
                  </View>
                  <Pressable style={styles.valueDisplay}>
                    <ThemedText style={styles.valueText}>07:30 AM</ThemedText>
                  </Pressable>
                </View>

                <View style={styles.separator} />

                <View style={styles.notificationRow}>
                  <View style={styles.notificationContent}>
                    <ThemedText style={styles.notificationTitle}>Snooze after missed day</ThemedText>
                  </View>
                  <Pressable style={styles.valueDisplay}>
                    <ThemedText style={styles.valueText}>{snoozeDelay} delay</ThemedText>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        )}

        <ThemedText style={styles.sectionHeader}>Account & Sync</ThemedText>

        {profile && (
          <View style={styles.card}>
            <View style={styles.notificationRow}>
              <View style={styles.notificationContent}>
                <ThemedText style={styles.notificationTitle}>Account</ThemedText>
                <ThemedText style={styles.notificationSubtitle}>Not signed in</ThemedText>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
            </View>

            <View style={styles.separator} />

            <View style={styles.notificationRow}>
              <View style={styles.notificationContent}>
                <ThemedText style={styles.notificationTitle}>Cloud sync</ThemedText>
                <ThemedText style={styles.notificationSubtitle}>Backup to cloud</ThemedText>
              </View>
              <Pressable
                onPress={() => {}}
                style={[styles.toggle, false && styles.toggleActive]}
              >
                <View style={[styles.toggleCircle]} />
              </Pressable>
            </View>

            <View style={styles.separator} />

            <Pressable onPress={() => router.push('/settings/connected-apps')}>
              <View style={styles.notificationRow}>
                <View style={styles.notificationContent}>
                  <ThemedText style={styles.notificationTitle}>Connected apps</ThemedText>
                  <ThemedText style={styles.notificationSubtitle}>0 connected</ThemedText>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>
          </View>
        )}

        <ThemedText style={styles.sectionHeader}>Privacy & Data</ThemedText>

        {profile && (
          <View style={styles.card}>
            <Pressable>
              <View style={styles.notificationRow}>
                <View style={styles.notificationContent}>
                  <ThemedText style={styles.notificationTitle}>Export my data</ThemedText>
                  <ThemedText style={styles.notificationSubtitle}>CSV · {checkIns.length} entries</ThemedText>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.separator} />

            <Pressable>
              <View style={styles.notificationRow}>
                <View style={styles.notificationContent}>
                  <ThemedText style={styles.notificationTitle}>Privacy policy</ThemedText>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.separator} />

            <Pressable>
              <View style={styles.notificationRow}>
                <View style={styles.notificationContent}>
                  <ThemedText style={styles.notificationTitle}>Medical disclaimer</ThemedText>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
              </View>
            </Pressable>

            <View style={styles.separator} />

            <Pressable>
              <View style={styles.notificationRow}>
                <View style={styles.notificationContent}>
                  <ThemedText style={[styles.notificationTitle, styles.resetText]}>Reset all data</ThemedText>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#EF4444" />
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}
