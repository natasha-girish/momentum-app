import { View, StyleSheet, Pressable } from 'react-native';
import { Card } from '../ui/card';
import { ThemedText } from '../theme/themed-text';
import { FactorRow } from './factor-row';
import { Spacing, BorderRadius } from '@/constants/sizes';
import { DailyRecommendation } from '@/lib/types';
import { useThemeColor } from '@/hooks/use-theme-color';

interface WhyThisReadProps {
  recommendation: DailyRecommendation;
  factors?: {
    icon: string;
    label: string;
    value: string;
    signal?: 'good' | 'ok' | 'warn';
  }[];
}

export function WhyThisRead({ recommendation, factors }: WhyThisReadProps) {
  const tint = useThemeColor({}, 'tint');

  const defaultFactors = [
    {
      iconName: 'nights-stay',
      label: "Last 3 nights' sleep",
      value: '7.1h avg',
      signal: (recommendation.state === 'recover' ? 'warn' : 'good') as any,
    },
    {
      iconName: 'mood',
      label: 'Soreness',
      value: recommendation.state === 'push' ? 'Mild' : recommendation.state === 'recover' ? 'High' : 'Mild',
      signal: (recommendation.state === 'recover' ? 'warn' : 'ok') as any,
    },
    {
      iconName: 'trending-up',
      label: 'Training streak',
      value: recommendation.state === 'recover' ? '4 days' : '3 days',
      signal: (recommendation.state === 'recover' ? 'warn' : 'ok') as any,
    },
    {
      iconName: 'flash-on',
      label: 'Energy today',
      value: recommendation.state === 'push' ? '5/5' : recommendation.state === 'recover' ? '2/5' : '4/5',
      signal: (recommendation.state === 'push' ? 'good' : recommendation.state === 'recover' ? 'warn' : 'ok') as any,
    },
  ];

  const displayFactors = factors || defaultFactors;

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.md,
    },
    caption: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.08,
      textTransform: 'uppercase',
      color: '#6B7985',
      marginBottom: Spacing.sm,
    },
    factorsContainer: {
      gap: 0,
    },
    overrideButton: {
      paddingTop: Spacing.sm,
    },
    overrideText: {
      fontSize: 13,
      fontWeight: '600',
      color: tint,
    },
  });

  return (
    <View style={styles.container}>
      <ThemedText style={styles.caption}>Why this read</ThemedText>
      <View style={styles.factorsContainer}>
        {displayFactors.map((factor, idx) => (
          <FactorRow key={idx} {...factor} showDivider={idx < displayFactors.length - 1} />
        ))}
      </View>
      <Pressable style={styles.overrideButton}>
        <ThemedText style={styles.overrideText}>Override today's read →</ThemedText>
      </Pressable>
    </View>
  );
}
