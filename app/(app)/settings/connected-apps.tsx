import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/theme/themed-text';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Spacing } from '@/constants/sizes';

const APPS = [
  {
    name: 'Apple Health',
    description: 'Weight, sleep, workouts',
    icon: 'A',
    color: '#1e293b',
  },
  {
    name: 'Renpho',
    description: 'Smart scale readings',
    icon: 'R',
    color: '#3E5C6E',
  },
  {
    name: 'MyFitnessPal',
    description: 'Nutrition context',
    icon: 'M',
    color: '#8FA68E',
  },
  {
    name: 'WHOOP',
    description: 'Strain & recovery',
    icon: 'W',
    color: '#B47C6E',
  },
  {
    name: 'Fitbit',
    description: 'Steps, heart rate, sleep',
    icon: 'F',
    color: '#C89A5B',
  },
];

export default function ConnectedApps() {
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.md,
    },
    header: {
      gap: Spacing.xs,
      flex: 1,
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
    description: {
      fontSize: 15,
      color: '#666',
      lineHeight: 22,
      marginBottom: Spacing.lg,
    },
    appsList: {
      gap: Spacing.md,
    },
    appCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.lg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    appContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
      flex: 1,
    },
    appIcon: {
      width: 56,
      height: 56,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
    appIconText: {
      fontSize: 20,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    appInfo: {
      gap: Spacing.xs,
      flex: 1,
    },
    appName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1e293b',
    },
    appDescription: {
      fontSize: 13,
      color: '#999',
    },
    connectButton: {
      backgroundColor: '#E8D9C8',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      flexShrink: 0,
    },
    connectButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#3E5C6E',
    },
  });

  return (
    <ScreenWrapper padding="large">
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#1e293b" />
          </Pressable>
          <View style={styles.header}>
            <ThemedText style={styles.headerLabel}>Profile</ThemedText>
            <ThemedText style={styles.headerTitle}>Connected apps</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.description}>
          Pipe in what you already track. Momentum reads; it doesn't replace.
        </ThemedText>

        <View style={styles.appsList}>
          {APPS.map((app) => (
            <Pressable key={app.name}>
              <View style={styles.appCard}>
                <View style={styles.appContent}>
                  <View style={[styles.appIcon, { backgroundColor: app.color }]}>
                    <ThemedText style={styles.appIconText}>{app.icon}</ThemedText>
                  </View>
                  <View style={styles.appInfo}>
                    <ThemedText style={styles.appName}>{app.name}</ThemedText>
                    <ThemedText style={styles.appDescription}>{app.description}</ThemedText>
                  </View>
                </View>
                <Pressable style={styles.connectButton}>
                  <ThemedText style={styles.connectButtonText}>Connect</ThemedText>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}
