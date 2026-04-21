import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/theme/themed-text';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Spacing } from '@/constants/sizes';
import { useCheckins } from '@/lib/hooks/use-checkins';

export default function History() {
  const router = useRouter();
  const { checkIns, loading } = useCheckins(30);

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.md,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    header: {
      gap: Spacing.xs,
      flex: 1,
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
    checkInCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      gap: Spacing.md,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    dayNumber: {
      fontSize: 24,
      fontWeight: '600',
      color: '#CBD5E1',
      minWidth: 35,
    },
    headerContent: {
      flex: 1,
      gap: 2,
      marginLeft: Spacing.md,
    },
    dateTitle: {
      fontSize: 15,
      fontWeight: '400',
      color: '#1e293b',
    },
    dateSubtitle: {
      fontSize: 12,
      color: '#999',
    },
    metricsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.md,
    },
    metricItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    metricLabel: {
      fontSize: 12,
      color: '#666',
    },
    metricValue: {
      fontSize: 12,
      fontWeight: '600',
      color: '#1e293b',
    },
    listContainer: {
      gap: Spacing.sm,
    },
  });

  const getDateString = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getDayNumber = (dateStr: string, index: number) => {
    return checkIns.length - index;
  };

  const getWorkoutDescription = (checkIn: any) => {
    if (checkIn.workoutStatus === 'rest_day') {
      return 'Rest day';
    } else if (checkIn.workoutStatus === 'completed_workout') {
      return 'Trained';
    }
    return 'Rest';
  };

  const getSorenessLabel = (soreness: string) => {
    const labels: any = {
      none: 'None',
      mild: 'Mild',
      moderate: 'Moderate',
      high: 'High',
    };
    return labels[soreness] || soreness;
  };

  return (
    <ScreenWrapper padding="large">
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#1e293b" />
          </Pressable>
          <View style={styles.header}>
            <ThemedText style={styles.headerLabel}>CHECK-IN HISTORY</ThemedText>
            <ThemedText style={styles.headerTitle}>Your Entries</ThemedText>
          </View>
        </View>

        {loading ? (
          <ThemedText>Loading...</ThemedText>
        ) : checkIns.length === 0 ? (
          <ThemedText color="#666">No check-ins yet. Start tracking your fitness journey!</ThemedText>
        ) : (
          <View style={styles.listContainer}>
            {checkIns.map((c, index) => (
              <Pressable key={c.id} onPress={() => router.push('/(app)/check-in')}>
                <View style={styles.checkInCard}>
                  <View style={styles.cardHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
                      <ThemedText style={styles.dayNumber}>{getDayNumber(c.date, index)}</ThemedText>
                      <View style={styles.headerContent}>
                        <ThemedText style={styles.dateTitle}>{getDateString(c.date)}</ThemedText>
                        <ThemedText style={styles.dateSubtitle}>{getWorkoutDescription(c)}</ThemedText>
                      </View>
                    </View>
                    <MaterialCommunityIcons name="pencil" size={18} color="#999" />
                  </View>

                  <View style={styles.metricsRow}>
                    {c.weight && (
                      <View style={styles.metricItem}>
                        <MaterialCommunityIcons name="scale" size={16} color="#666" />
                        <ThemedText style={styles.metricLabel}>{c.weight}</ThemedText>
                        <ThemedText style={styles.metricValue}>lbs</ThemedText>
                      </View>
                    )}
                    <View style={styles.metricItem}>
                      <MaterialCommunityIcons name="moon" size={16} color="#666" />
                      <ThemedText style={styles.metricLabel}>{c.sleepHours}</ThemedText>
                      <ThemedText style={styles.metricValue}>h</ThemedText>
                    </View>
                    <View style={styles.metricItem}>
                      <MaterialCommunityIcons name="lightning-bolt" size={16} color="#666" />
                      <ThemedText style={styles.metricLabel}>{c.energy}</ThemedText>
                      <ThemedText style={styles.metricValue}>/5</ThemedText>
                    </View>
                    <View style={styles.metricItem}>
                      <MaterialCommunityIcons name="heart" size={16} color="#666" />
                      <ThemedText style={styles.metricValue}>{getSorenessLabel(c.soreness)}</ThemedText>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}
