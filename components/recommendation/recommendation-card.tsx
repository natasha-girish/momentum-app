import { View, StyleSheet, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Card } from '../ui/card';
import { ThemedText } from '../theme/themed-text';
import { DailyRecommendation } from '@/lib/types';
import { Spacing, BorderRadius, ComponentSizes } from '@/constants/sizes';
import { useThemeColor } from '@/hooks/use-theme-color';

interface RecommendationCardProps {
  recommendation: DailyRecommendation | null;
  loading?: boolean;
  variant?: 'A' | 'B' | 'C';
  onOverride?: (state: 'push' | 'maintain' | 'recover') => void;
}

const STATE_CONFIG = {
  push: {
    iconName: 'trending-up',
    word: 'Push',
    label: "Today, push forward",
    color: '#8FA68E',
    bgColor: '#EEF2EC',
    softColor: '#DDE5DC',
    blurb: "Your signals are green — sleep is solid, soreness low, energy high. Today's a good day to chase a PR or add a set.",
    short: "Signals are green. Go after it — add intensity or one more set.",
  },
  maintain: {
    iconName: 'pause-circle',
    word: 'Maintain',
    label: "Hold the line today",
    color: '#3E5C6E',
    bgColor: '#EAF0F3',
    softColor: '#D7E0E5',
    blurb: "Mixed signals today. Sleep was solid but you've trained 3 days in a row. Keep today moderate — don't skip, don't chase a PR.",
    short: "Mixed signals. Moderate effort. Don't skip, don't push for a PR.",
  },
  recover: {
    iconName: 'self-improvement',
    word: 'Recover',
    label: "Your body needs rest",
    color: '#B47C6E',
    bgColor: '#F1E4DF',
    softColor: '#E4D1CC',
    blurb: "Four training days in a row, soreness is high, and sleep dipped below 6 hours. Today take a full rest day or active recovery only.",
    short: "Four days on, soreness high. Rest today — or active recovery only.",
  },
};

export function RecommendationCard({
  recommendation,
  loading = false,
  variant = 'A',
  onOverride,
}: RecommendationCardProps) {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');
  const surfaceColor = useThemeColor({}, 'background');

  if (!recommendation) {
    return (
      <Card shadow="md" padding="large">
        <ThemedText color="#999">Build your profile to see recommendations</ThemedText>
      </Card>
    );
  }

  const config = STATE_CONFIG[recommendation.state];

  // Variant A: Hero card with tinted background
  if (variant === 'A') {
    const styles = StyleSheet.create({
      card: {
        backgroundColor: config.bgColor,
        padding: Spacing.xl,
        gap: Spacing.lg,
        borderRadius: BorderRadius.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.lg,
        marginBottom: Spacing.sm,
      },
      iconBadge: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: config.color,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        fontSize: 18,
      },
      caption: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.08,
        color: config.color,
      },
      title: {
        fontSize: 36,
        fontWeight: '400',
        color: config.color,
        fontFamily: 'Lora',
        marginBottom: Spacing.md,
        lineHeight: 44,
      },
      explanation: {
        fontSize: 15,
        lineHeight: 24,
        color: '#333',
      },
    });

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <MaterialIcons name={config.iconName} size={18} color="#fff" />
          </View>
          <ThemedText style={styles.caption}>TODAY'S READ</ThemedText>
        </View>
        <ThemedText style={styles.title}>{config.word}.</ThemedText>
        <ThemedText style={styles.explanation}>{config.blurb}</ThemedText>
      </View>
    );
  }

  // Variant B: Split layout with colored sidebar
  if (variant === 'B') {
    const surfaceBg = useThemeColor({}, 'background');
    const styles = StyleSheet.create({
      card: {
        backgroundColor: surfaceBg,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        flexDirection: 'row',
        minHeight: 140,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      sidebar: {
        width: 120,
        backgroundColor: config.color,
        padding: Spacing.xl,
        justifyContent: 'space-between',
      },
      sidebarIcon: {
        marginBottom: Spacing.md,
      },
      sidebarLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.75)',
        marginBottom: Spacing.xs,
      },
      sidebarWord: {
        fontSize: 28,
        fontWeight: '400',
        fontFamily: 'Lora',
        color: '#fff',
        lineHeight: 34,
      },
      content: {
        flex: 1,
        padding: Spacing.xl,
        justifyContent: 'center',
      },
      label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: Spacing.xs,
        color: '#1B2830',
      },
      blurb: {
        fontSize: 13,
        lineHeight: 20,
        color: '#3E5160',
      },
    });

    return (
      <View style={styles.card}>
        <View style={styles.sidebar}>
          <MaterialIcons name={config.iconName} size={24} color="#fff" />
          <View>
            <ThemedText style={styles.sidebarLabel}>TODAY</ThemedText>
            <ThemedText style={styles.sidebarWord}>{config.word}</ThemedText>
          </View>
        </View>
        <View style={styles.content}>
          <ThemedText style={styles.label}>{config.label}</ThemedText>
          <ThemedText style={styles.blurb}>{config.blurb}</ThemedText>
        </View>
      </View>
    );
  }

  // Variant C: Default compact with explanation
  const styles = StyleSheet.create({
    card: {
      backgroundColor: config.bgColor,
      padding: Spacing.xl,
      gap: Spacing.lg,
      borderRadius: BorderRadius.xl,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    icon: {
      fontSize: 18,
    },
    titleSection: {
      flex: 1,
      gap: Spacing.xs,
    },
    caption: {
      fontSize: 11,
      fontWeight: '600',
      color: config.color,
    },
    title: {
      fontSize: 28,
      fontWeight: '400',
      fontFamily: 'Lora',
      color: config.color,
      marginTop: Spacing.xs,
      lineHeight: 34,
    },
    explanation: {
      fontSize: 15,
      lineHeight: 24,
      color: '#333',
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: config.color, justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name={config.iconName} size={18} color="#fff" />
        </View>
        <View style={styles.titleSection}>
          <ThemedText style={styles.caption}>TODAY'S READ</ThemedText>
          <ThemedText style={styles.title}>{config.word}</ThemedText>
        </View>
      </View>
      <ThemedText style={styles.explanation}>{config.blurb}</ThemedText>
    </View>
  );
}
