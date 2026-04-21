import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/theme/themed-text';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spacing } from '@/constants/sizes';
import { Copy } from '@/constants/copy';

export default function About() {
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    header: {
      marginBottom: Spacing.lg,
    },
    disclaimerCard: {
      gap: Spacing.md,
    },
  });

  return (
    <ScreenWrapper padding="large">
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText variant="headingM">About</ThemedText>
        </View>

        <Card style={styles.disclaimerCard} padding="large" shadow="sm">
          <ThemedText weight="semibold" variant="headingS">
            {Copy.disclaimerTitle}
          </ThemedText>
          <ThemedText variant="body">{Copy.disclaimerText}</ThemedText>
        </Card>

        <View style={{ marginTop: Spacing.lg }}>
          <ThemedText variant="bodySmall" color="#999">
            Momentum v1.0.0
          </ThemedText>
          <ThemedText variant="bodySmall" color="#999">
            Local fitness intelligence dashboard
          </ThemedText>
        </View>

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
