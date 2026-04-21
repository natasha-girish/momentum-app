import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { ThemedText } from '@/components/theme/themed-text';
import { Card } from '@/components/ui/card';
import { Spacing } from '@/constants/sizes';
import { useCheckins } from '@/lib/hooks/use-checkins';
import { useUserProfile } from '@/lib/hooks/use-user-profile';
import { useInsights } from '@/lib/hooks/use-insights';
import { WeightTrendChart } from '@/components/charts/weight-trend-chart';
import { ActivityStrip } from '@/components/charts/activity-strip';
import { analyzeWeightTrend } from '@/lib/engines/weight-analyzer';

export default function TrendsScreen() {
  const { profile } = useUserProfile();
  const { checkIns } = useCheckins(30);
  const { insights } = useInsights();

  const withWeight = checkIns.filter((c) => c.weight !== undefined);
  const trend = withWeight.length >= 5 ? analyzeWeightTrend(withWeight) : null;
  const currentWeekInsight = insights.length > 0 ? insights[0] : null;

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    section: {
      gap: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.sm,
    },
    adviceCard: {
      backgroundColor: '#F0E8DC',
      borderRadius: 16,
      padding: Spacing.lg,
      flexDirection: 'row',
      gap: Spacing.md,
      alignItems: 'flex-start',
    },
    adviceIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#1e293b',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2,
    },
    adviceContent: {
      flex: 1,
      gap: Spacing.xs,
    },
    adviceTitle: {
      fontWeight: '600',
      fontSize: 16,
      color: '#1e293b',
    },
    adviceText: {
      fontSize: 14,
      color: '#1e293b',
      lineHeight: 20,
    },
    patternsCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    patternsTitle: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.08,
      color: '#999',
      textTransform: 'uppercase',
      marginBottom: Spacing.xs,
    },
    patternItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: '#E8E4DE',
    },
    patternItemLast: {
      borderBottomWidth: 0,
    },
    patternIcon: {
      width: 40,
      height: 40,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    patternContent: {
      flex: 1,
      gap: 2,
    },
    patternLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: '#1e293b',
    },
    patternValue: {
      fontSize: 13,
      color: '#666',
    },
  });

  return (
    <ScreenWrapper padding="large">
      <View style={styles.container}>
        <ThemedText variant="headingM">Your Trends</ThemedText>

        {withWeight.length >= 5 && (
          <View style={styles.section}>
            {profile && (
              <WeightTrendChart checkIns={checkIns} unit={profile.weightUnit} />
            )}
            {trend?.plateauDetected && (
              <View style={styles.adviceCard}>
                <View style={styles.adviceIcon}>
                  <MaterialCommunityIcons name="chart-line" size={18} color="#FFFFFF" />
                </View>
                <View style={styles.adviceContent}>
                  <ThemedText style={styles.adviceTitle}>Plateau detected</ThemedText>
                  <ThemedText style={styles.adviceText}>
                    Your 7-day average has moved within ±0.5 lbs for the last 14 days. If fat loss is the goal, consider tightening intake or adding volume.
                  </ThemedText>
                </View>
              </View>
            )}
          </View>
        )}

        {checkIns.length > 0 && (
          <Card padding="large" shadow="sm" style={{ backgroundColor: '#FFFFFF' }}>
            <View style={{ gap: Spacing.lg }}>
              <ThemedText variant="headingS">
                Weekly Activity
              </ThemedText>
              <ActivityStrip checkIns={checkIns} />
            </View>
          </Card>
        )}

        {checkIns.length > 0 && (
          <View style={styles.patternsCard}>
            <ThemedText style={styles.patternsTitle}>More Patterns</ThemedText>

            <Pressable style={[styles.patternItem]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={[styles.patternIcon, { backgroundColor: '#4B7BA7' }]}>
                  <MaterialCommunityIcons name="bed" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.patternContent}>
                  <ThemedText style={styles.patternLabel}>Sleep</ThemedText>
                  <ThemedText style={styles.patternValue}>7-day avg · {(checkIns.slice(0, 7).reduce((sum, c) => sum + (c.sleepHours || 0), 0) / Math.min(7, checkIns.length)).toFixed(1)}h</ThemedText>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#999" />
            </Pressable>

            <Pressable style={[styles.patternItem]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={[styles.patternIcon, { backgroundColor: '#B8956A' }]}>
                  <MaterialCommunityIcons name="flash" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.patternContent}>
                  <ThemedText style={styles.patternLabel}>Energy</ThemedText>
                  <ThemedText style={styles.patternValue}>Trending up</ThemedText>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#999" />
            </Pressable>

            <Pressable style={[styles.patternItem]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={[styles.patternIcon, { backgroundColor: '#739B6D' }]}>
                  <MaterialCommunityIcons name="dumbbell" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.patternContent}>
                  <ThemedText style={styles.patternLabel}>Training load</ThemedText>
                  <ThemedText style={styles.patternValue}>{checkIns.slice(0, 7).filter(c => c.workoutStatus === 'completed_workout').length} of 7 days</ThemedText>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#999" />
            </Pressable>

            <Pressable style={[styles.patternItem, styles.patternItemLast]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={[styles.patternIcon, { backgroundColor: '#A17D8D' }]}>
                  <MaterialCommunityIcons name="scale-bathroom" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.patternContent}>
                  <ThemedText style={styles.patternLabel}>Weight</ThemedText>
                  <ThemedText style={styles.patternValue}>{(currentWeekInsight?.weightTrendDelta ?? -0.3) > 0 ? '+' : ''}{(currentWeekInsight?.weightTrendDelta ?? -0.3).toFixed(1)} kg</ThemedText>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#999" />
            </Pressable>
          </View>
        )}

        {checkIns.length === 0 && (
          <Card padding="large" shadow="sm">
            <ThemedText color="#666">
              Start checking in daily to see your trends and progress over time.
            </ThemedText>
          </Card>
        )}
      </View>
    </ScreenWrapper>
  );
}
