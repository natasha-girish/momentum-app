import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/theme/themed-text';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Button } from '@/components/ui/button';
import { Spacing } from '@/constants/sizes';
import { useInsights } from '@/lib/hooks/use-insights';

export default function Insights() {
  const router = useRouter();
  const { insights, loading } = useInsights(8);

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    header: {
      marginBottom: Spacing.lg,
    },
  });

  return (
    <ScreenWrapper padding="large">
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText variant="headingM">Insights history</ThemedText>
        </View>

        {loading ? (
          <ThemedText>Loading...</ThemedText>
        ) : insights.length === 0 ? (
          <ThemedText color="#666">No insights yet. Complete a few weeks of check-ins.</ThemedText>
        ) : (
          <View>
            {insights.map((i) => (
              <View key={i.id} style={{ marginBottom: Spacing.lg }}>
                <ThemedText weight="semibold">{i.weekStart}</ThemedText>
                <ThemedText variant="bodySmall">{i.summaryText}</ThemedText>
              </View>
            ))}
          </View>
        )}

        <Button
          label="Back"
          onPress={() => router.back()}
          variant="secondary"
          fullWidth
        />
      </View>
    </ScreenWrapper>
  );
}
