import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card } from '../ui/card';
import { ThemedText } from '../theme/themed-text';
import { CheckIn, WeightTrend } from '@/lib/types';
import { Spacing } from '@/constants/sizes';
import { useThemeColor } from '@/hooks/use-theme-color';
import { prepareChartData, analyzeWeightTrend } from '@/lib/engines/weight-analyzer';
import { formatWeight, formatWeightDelta } from '@/lib/utils/formatting';
import { useState } from 'react';

interface WeightTrendChartProps {
  checkIns: CheckIn[];
  unit?: 'lbs' | 'kg';
}

export function WeightTrendChart({ checkIns, unit = 'lbs' }: WeightTrendChartProps) {
  const tint = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');
  const [period, setPeriod] = useState<7 | 30 | 90 | 365>(30);
  const [showDots, setShowDots] = useState(false);
  const muted = useThemeColor({}, 'icon');

  // Filter weight entries
  const withWeight = checkIns.filter((c) => c.weight !== undefined);

  if (withWeight.length < 5) {
    return (
      <Card padding="large" shadow="sm">
        <ThemedText color="#999">Need at least 5 weight entries to show trend</ThemedText>
      </Card>
    );
  }

  const trend = analyzeWeightTrend(withWeight);
  const chartData = prepareChartData(withWeight);

  if (!trend || chartData.length === 0) {
    return (
      <Card padding="large" shadow="sm">
        <ThemedText color="#999">Not enough data</ThemedText>
      </Card>
    );
  }

  const displayData = chartData.slice(-period);

  // Get labels - show first, last, and every 7 days
  const labels = displayData.map((d, i) => {
    if (i === 0 || i === displayData.length - 1 || i % 7 === 0) {
      return d.date.split('-')[2];
    }
    return '';
  });

  const smoothedValues = displayData.map((d) => d.smoothed || 0);
  const rawValues = displayData.map((d) => d.weight);

  const yAxisMin = 75;
  const yAxisMax = 79;

  const datasets: any[] = [
    {
      data: smoothedValues,
      strokeWidth: 3,
      color: () => tint,
    },
  ];

  if (showDots) {
    datasets.push({
      data: rawValues,
      strokeWidth: 1,
      color: () => tabIconDefault,
    });
  }

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: () => '#333333',
    strokeWidth: 1,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    yAxisMin: 75,
    yAxisMax: 79,
    segments: 5,
  };

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    topSection: {
      gap: Spacing.sm,
    },
    weightValue: {
      fontSize: 42,
      fontFamily: 'Lora',
      fontWeight: '400',
      color: '#000',
      lineHeight: 48,
    },
    weightUnit: {
      fontSize: 18,
      color: '#666',
      marginLeft: Spacing.xs,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: Spacing.xs,
    },
    deltaText: {
      fontSize: 14,
      color: '#999',
    },
    periodButtons: {
      flexDirection: 'row',
      gap: Spacing.md,
      backgroundColor: '#F0E8DC',
      borderRadius: 12,
      padding: Spacing.sm,
      justifyContent: 'space-around',
    },
    periodButton: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: 10,
      backgroundColor: '#F0E8DC',
      flex: 1,
      alignItems: 'center',
    },
    periodButtonActive: {
      backgroundColor: '#FFFFFF',
    },
    periodButtonText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#666',
    },
    periodButtonTextActive: {
      color: '#000',
      fontWeight: '600',
    },
    chart: {
      marginLeft: -40,
      marginRight: -20,
      overflow: 'hidden',
    },
    legendButtons: {
      flexDirection: 'row',
      gap: Spacing.md,
      justifyContent: 'center',
    },
    legendButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      backgroundColor: '#2C3E50',
      borderRadius: 12,
    },
    legendButtonText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#FFFFFF',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#FFFFFF',
    },
  });

  const currentWeight = displayData[displayData.length - 1]?.smoothed || 0;
  const weekAgoData = displayData.length > 7 ? displayData[displayData.length - 8]?.smoothed : currentWeight;
  const weekDelta = currentWeight - weekAgoData;
  const weekDirection = weekDelta > 0 ? '↑' : weekDelta < 0 ? '↓' : '→';

  return (
    <Card padding="large" shadow="sm" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <View style={styles.container}>
        <ThemedText variant="headingS" style={{ marginBottom: 8, color: '#1e293b' }}>Weight Progress</ThemedText>
        <View style={styles.topSection}>
          <View style={styles.topRow}>
            <ThemedText style={styles.weightValue}>{currentWeight.toFixed(1)}</ThemedText>
            <ThemedText style={styles.weightUnit}>{unit}</ThemedText>
          </View>
          <ThemedText style={styles.deltaText}>
            {weekDirection} {Math.abs(weekDelta).toFixed(1)} {unit} vs last week
          </ThemedText>
        </View>

        <View style={styles.periodButtons}>
          {[7, 30, 90, 365].map((p) => (
            <Pressable
              key={p}
              onPress={() => setPeriod(p as any)}
              style={[styles.periodButton, period === p && styles.periodButtonActive]}
            >
              <ThemedText style={[styles.periodButtonText, period === p && styles.periodButtonTextActive]}>
                {p === 365 ? 'All' : `${p}D`}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <View style={styles.chart}>
          <LineChart
            data={{
              labels,
              datasets,
            }}
            width={Dimensions.get('window').width - 56}
            height={200}
            chartConfig={chartConfig}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withDots={true}
            withInnerLines={false}
            dotRadius={4}
          />
        </View>

        <View style={styles.legendButtons}>
          <View style={styles.legendButton}>
            <View style={styles.dot} />
            <ThemedText style={styles.legendButtonText}>7-day avg</ThemedText>
          </View>
          <Pressable onPress={() => setShowDots(!showDots)} style={styles.legendButton}>
            <View style={[styles.dot, { backgroundColor: showDots ? '#CCCCCC' : '#F0F0F0' }]} />
            <ThemedText style={styles.legendButtonText}>{showDots ? 'Hide' : 'Show'} daily dots</ThemedText>
          </Pressable>
        </View>
      </View>
    </Card>
  );
}
