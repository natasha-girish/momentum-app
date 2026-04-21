import { View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Card } from '../ui/card';
import { ThemedText } from '../theme/themed-text';
import { CheckIn } from '@/lib/types';
import { Spacing, BorderRadius } from '@/constants/sizes';
import { getDaysAgo, formatShortDate, getDayName } from '@/lib/utils/date';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ActivityStripProps {
  checkIns: CheckIn[];
}

export function ActivityStrip({ checkIns }: ActivityStripProps) {
  const tint = useThemeColor({}, 'tint');
  const muted = useThemeColor({}, 'icon');
  const surface2 = useThemeColor({}, 'background');

  // Get last 7 days
  const days = Array.from({ length: 7 }, (_, i) => getDaysAgo(6 - i));

  // Map to check-in data
  const dayData = days.map((date, idx) => {
    const checkIn = checkIns.find((c) => c.date === date);
    return {
      date,
      dayShort: getDayName(date).substring(0, 3),
      isWorkout: checkIn?.workoutStatus !== 'rest_day' && checkIn?.workoutStatus !== undefined,
      isRest: checkIn?.workoutStatus === 'rest_day',
      hasData: !!checkIn,
      isToday: idx === 6,
    };
  });

  const styles = StyleSheet.create({
    strip: {
      flexDirection: 'row',
      gap: Spacing.sm,
      justifyContent: 'space-between',
    },
    dayContainer: {
      flex: 1,
      alignItems: 'center',
      gap: Spacing.md,
    },
    dot: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dotWorkout: {
      backgroundColor: tint,
    },
    dotRest: {
      backgroundColor: '#E8E3D6',
    },
    dotEmpty: {
      borderWidth: 1.5,
      borderColor: '#D4C9B8',
      backgroundColor: 'transparent',
    },
    dotToday: {
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: tint,
      backgroundColor: 'transparent',
    },
    dayLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: muted,
    },
    dayLabelToday: {
      fontWeight: '700',
      color: '#1B2830',
    },
  });

  return (
    <View style={styles.strip}>
      {dayData.map((d) => (
        <View key={d.date} style={styles.dayContainer}>
          <View
            style={[
              styles.dot,
              !d.hasData ? styles.dotEmpty : d.isWorkout ? styles.dotWorkout : styles.dotRest,
              d.isToday && !d.hasData && styles.dotToday,
            ]}
          >
            {d.isWorkout && <MaterialIcons name="fitness-center" size={18} color="#fff" />}
            {d.isRest && <MaterialIcons name="nights-stay" size={16} color={muted} />}
          </View>
          <ThemedText style={[styles.dayLabel, d.isToday && styles.dayLabelToday]}>
            {d.dayShort}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}
