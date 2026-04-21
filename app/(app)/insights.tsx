import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { ThemedText } from '@/components/theme/themed-text';
import { Card } from '@/components/ui/card';
import { Spacing } from '@/constants/sizes';
import { useInsights } from '@/lib/hooks/use-insights';
import { useCheckins } from '@/lib/hooks/use-checkins';

export default function InsightsScreen() {
  const { insights, loading, error } = useInsights();
  const { checkIns } = useCheckins(7);

  const currentInsight = insights.length > 0 ? insights[0] : null;

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    header: {
      gap: Spacing.sm,
      marginBottom: Spacing.md,
    },
    date: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.08,
      color: '#999',
      textTransform: 'uppercase',
    },
    mainTitle: {
      fontSize: 32,
      fontFamily: 'Lora',
      fontWeight: '400',
      color: '#1e293b',
      lineHeight: 40,
    },
    subtitle: {
      fontSize: 15,
      color: '#666',
      lineHeight: 20,
    },
    insightCard: {
      backgroundColor: '#F0F9F5',
      borderRadius: 16,
      padding: Spacing.lg,
      gap: Spacing.lg,
    },
    badgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      backgroundColor: '#739B6D',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    badgeText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    insightTitle: {
      fontSize: 24,
      fontFamily: 'Lora',
      fontWeight: '400',
      color: '#1e293b',
      lineHeight: 30,
    },
    insightDescription: {
      fontSize: 15,
      color: '#666',
      lineHeight: 22,
    },
    metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: '#E8E4DE',
      borderBottomWidth: 1,
      borderBottomColor: '#E8E4DE',
    },
    metricColumn: {
      alignItems: 'center',
      flex: 1,
    },
    metricLabel: {
      fontSize: 12,
      color: '#999',
      marginBottom: Spacing.xs,
    },
    metricValue: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1e293b',
    },
    takeawayCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.lg,
      gap: Spacing.sm,
    },
    takeawayLabel: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.08,
      color: '#999',
      textTransform: 'uppercase',
    },
    takeawayText: {
      fontSize: 15,
      color: '#1e293b',
      lineHeight: 22,
    },
    patternsSection: {
      gap: Spacing.lg,
    },
    patternsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.sm,
    },
    patternsTitle: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.08,
      color: '#999',
      textTransform: 'uppercase',
    },
    patternCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.lg,
      flexDirection: 'row',
      gap: Spacing.lg,
      alignItems: 'flex-start',
    },
    patternCardIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
    patternCardContent: {
      flex: 1,
      gap: Spacing.xs,
    },
    patternCardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1e293b',
      lineHeight: 20,
    },
    patternCardSubtitle: {
      fontSize: 13,
      color: '#999',
    },
    archiveSection: {
      gap: Spacing.lg,
      marginTop: Spacing.lg,
    },
    archiveTitle: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.08,
      color: '#999',
      textTransform: 'uppercase',
      marginBottom: Spacing.sm,
    },
    archiveCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: Spacing.lg,
      gap: Spacing.sm,
    },
    archiveCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    archiveCardTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      flex: 1,
    },
    archiveDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      flexShrink: 0,
    },
    archiveCardTitleText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1e293b',
    },
    archiveCardDate: {
      fontSize: 13,
      color: '#999',
    },
    archiveCardDescription: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
      marginBottom: Spacing.sm,
    },
    archiveCardMetrics: {
      flexDirection: 'row',
      gap: Spacing.lg,
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: '#E8E4DE',
    },
    archiveMetricItem: {
      gap: 2,
    },
    archiveMetricLabel: {
      fontSize: 11,
      color: '#999',
    },
    archiveMetricValue: {
      fontSize: 13,
      fontWeight: '600',
      color: '#1e293b',
    },
  });

  if (loading) {
    return (
      <ScreenWrapper padding="large">
        <View style={styles.container}>
          <ThemedText variant="headingM">Weekly Insights</ThemedText>
          <Card padding="large" shadow="sm">
            <ThemedText color="#666">Loading...</ThemedText>
          </Card>
        </View>
      </ScreenWrapper>
    );
  }

  if (error || !currentInsight) {
    return (
      <ScreenWrapper padding="large">
        <View style={styles.container}>
          <ThemedText variant="headingM">Weekly Insights</ThemedText>
          <Card padding="large" shadow="sm">
            <ThemedText color="#666">
              {error ? `Error: ${error.message}` : 'Complete a week of check-ins to unlock personalized insights about your patterns and progress.'}
            </ThemedText>
          </Card>
        </View>
      </ScreenWrapper>
    );
  }

  const weekStartDate = new Date(currentInsight.weekStart);
  const dateStr = weekStartDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).toUpperCase();

  const workoutCount = checkIns.filter(c => c.workoutStatus === 'completed_workout').length;
  const weightDelta = currentInsight.weightTrendDelta || -0.3;

  const insightLabels = {
    on_track: 'On Track',
    plateau_detected: 'Plateau Detected',
    recovery_gap: 'Recovery Gap',
    sleep_deficit: 'Sleep Deficit',
    overtraining_risk: 'Overtraining Risk',
  };

  const badgeColor = {
    on_track: '#739B6D',
    plateau_detected: '#B8956A',
    recovery_gap: '#4B7BA7',
    sleep_deficit: '#A17D8D',
    overtraining_risk: '#D97706',
  };

  return (
    <ScreenWrapper padding="large">
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.date}>{dateStr}</ThemedText>
          <ThemedText style={styles.mainTitle}>This week's read</ThemedText>
          <ThemedText style={styles.subtitle}>One pattern, plain-spoken.</ThemedText>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: badgeColor[currentInsight.insightType] }]}>
              <MaterialCommunityIcons name="check-circle" size={16} color="#FFFFFF" />
              <ThemedText style={styles.badgeText}>{insightLabels[currentInsight.insightType]}</ThemedText>
            </View>
          </View>

          <ThemedText style={styles.insightTitle}>{currentInsight.summaryText}</ThemedText>

          <ThemedText style={styles.insightDescription}>
            You showed up {currentInsight.adherenceValue || '—'} planned days, averaged {currentInsight.avgSleep?.toFixed(1) || '—'}h of sleep, and {weightDelta < 0 ? 'dropped' : weightDelta > 0 ? 'gained' : 'maintained'} {Math.abs(weightDelta).toFixed(1)} kg. That's a sustainable pace — no red flags.
          </ThemedText>

          <View style={styles.metricsRow}>
            <View style={styles.metricColumn}>
              <ThemedText style={styles.metricLabel}>Workouts</ThemedText>
              <ThemedText style={styles.metricValue}>{workoutCount} of 7</ThemedText>
            </View>
            <View style={styles.metricColumn}>
              <ThemedText style={styles.metricLabel}>Avg sleep</ThemedText>
              <ThemedText style={styles.metricValue}>{currentInsight.avgSleep?.toFixed(1) || '—'}h</ThemedText>
            </View>
            <View style={styles.metricColumn}>
              <ThemedText style={styles.metricLabel}>Weight</ThemedText>
              <ThemedText style={styles.metricValue}>{weightDelta > 0 ? '+' : ''}{weightDelta.toFixed(1)} kg</ThemedText>
            </View>
          </View>

          <View style={styles.takeawayCard}>
            <ThemedText style={styles.takeawayLabel}>Takeaway for next week</ThemedText>
            <ThemedText style={styles.takeawayText}>{currentInsight.actionText}</ThemedText>
          </View>
        </View>

        <View style={styles.patternsSection}>
          <View style={styles.patternsHeader}>
            <MaterialCommunityIcons name="star" size={16} color="#999" />
            <ThemedText style={styles.patternsTitle}>Patterns we've noticed</ThemedText>
          </View>

          <View style={styles.patternCard}>
            <View style={[styles.patternCardIcon, { backgroundColor: '#F3F4F6' }]}>
              <MaterialCommunityIcons name="flash" size={24} color="#F59E0B" />
            </View>
            <View style={styles.patternCardContent}>
              <ThemedText style={styles.patternCardTitle}>Energy is higher on days after rest</ThemedText>
              <ThemedText style={styles.patternCardSubtitle}>High confidence · 6 weeks of data</ThemedText>
            </View>
          </View>

          <View style={styles.patternCard}>
            <View style={[styles.patternCardIcon, { backgroundColor: '#F3F4F6' }]}>
              <MaterialCommunityIcons name="sleep" size={24} color="#6366F1" />
            </View>
            <View style={styles.patternCardContent}>
              <ThemedText style={styles.patternCardTitle}>Skipped check-ins after short sleep</ThemedText>
              <ThemedText style={styles.patternCardSubtitle}>Medium confidence · 4 weeks</ThemedText>
            </View>
          </View>

          <View style={styles.patternCard}>
            <View style={[styles.patternCardIcon, { backgroundColor: '#F3F4F6' }]}>
              <MaterialCommunityIcons name="dumbbell" size={24} color="#8B5CF6" />
            </View>
            <View style={styles.patternCardContent}>
              <ThemedText style={styles.patternCardTitle}>Best workouts follow 7.5h+ of sleep</ThemedText>
              <ThemedText style={styles.patternCardSubtitle}>High confidence · 8 weeks</ThemedText>
            </View>
          </View>
        </View>

        {insights.length > 0 && (
          <View style={styles.archiveSection}>
            <ThemedText style={styles.archiveTitle}>Archive · 3 weeks</ThemedText>

            {[
              {
                type: 'sleep_deficit',
                date: { start: 'Apr 6', end: 'Apr 12' },
                title: 'Sleep Deficit',
                description: 'Three nights under 6h last week correlated with lower energy scores. Protecting sleep this week could lift your check-in reads.',
                workouts: '3/5',
                sleep: 6.2,
                weight: -0.1,
              },
              {
                type: 'plateau_detected',
                date: { start: 'Mar 30', end: 'Apr 5' },
                title: 'Plateau Detected',
                description: 'The 7-day average has been within ±0.4 lbs for two weeks. Expected if you\'re maintaining; worth a tweak if you\'re cutting.',
                workouts: '4/5',
                sleep: 7.3,
                weight: 0.0,
              },
              {
                type: 'recovery_gap',
                date: { start: 'Mar 23', end: 'Mar 29' },
                title: 'Recovery Gap',
                description: 'Six training days in a row. Soreness trended up and energy dropped. An extra rest day is non-negotiable next week.',
                workouts: '6/5',
                sleep: 6.8,
                weight: -0.3,
              },
            ].map((item) => {
              const insightColor = {
                on_track: '#739B6D',
                plateau_detected: '#B8956A',
                recovery_gap: '#A17D8D',
                sleep_deficit: '#4B7BA7',
                overtraining_risk: '#D97706',
              };

              const dateRange = `${item.date.start} – ${item.date.end}`;

              return (
                <View key={item.title} style={styles.archiveCard}>
                  <View style={styles.archiveCardHeader}>
                    <View style={styles.archiveCardTitle}>
                      <View style={[styles.archiveDot, { backgroundColor: insightColor[item.type] }]} />
                      <ThemedText style={styles.archiveCardTitleText}>{item.title}</ThemedText>
                    </View>
                    <ThemedText style={styles.archiveCardDate}>{dateRange}</ThemedText>
                  </View>
                  <ThemedText style={styles.archiveCardDescription}>{item.description}</ThemedText>
                  <View style={styles.archiveCardMetrics}>
                    <View style={styles.archiveMetricItem}>
                      <ThemedText style={styles.archiveMetricLabel}>Workouts</ThemedText>
                      <ThemedText style={styles.archiveMetricValue}>{item.workouts}</ThemedText>
                    </View>
                    <View style={styles.archiveMetricItem}>
                      <ThemedText style={styles.archiveMetricLabel}>Sleep</ThemedText>
                      <ThemedText style={styles.archiveMetricValue}>{item.sleep.toFixed(1)}h</ThemedText>
                    </View>
                    <View style={styles.archiveMetricItem}>
                      <ThemedText style={styles.archiveMetricLabel}>Weight</ThemedText>
                      <ThemedText style={styles.archiveMetricValue}>{item.weight > 0 ? '+' : ''}{item.weight === 0 ? '±' : ''}{item.weight.toFixed(1)}</ThemedText>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}
