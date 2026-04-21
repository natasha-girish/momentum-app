import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/theme/themed-text';
import { ScreenWrapper } from '@/components/common/screen-wrapper';
import { Spacing } from '@/constants/sizes';

export default function PrivacyPolicy() {
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      gap: Spacing.lg,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
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
    },
    section: {
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1e293b',
    },
    sectionText: {
      fontSize: 14,
      color: '#666',
      lineHeight: 22,
    },
  });

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={{ padding: Spacing.lg }}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => router.back()}>
              <MaterialCommunityIcons name="chevron-left" size={24} color="#1e293b" />
            </Pressable>
            <ThemedText style={styles.headerLabel}>Settings</ThemedText>
          </View>

          <ThemedText style={styles.headerTitle}>Privacy Policy</ThemedText>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Data Collection</ThemedText>
            <ThemedText style={styles.sectionText}>
              Momentum collects check-in data you voluntarily enter: weight, sleep, energy, soreness, and workout status. All data is stored locally on your device.
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Data Storage</ThemedText>
            <ThemedText style={styles.sectionText}>
              Your data is never sent to external servers unless you explicitly enable cloud sync. All local data remains private and under your control.
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Third-Party Integrations</ThemedText>
            <ThemedText style={styles.sectionText}>
              If you connect third-party apps (Apple Health, Fitbit, etc.), we access only the data you authorize. You can disconnect at any time.
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Changes to Policy</ThemedText>
            <ThemedText style={styles.sectionText}>
              We may update this policy. Continued use of the app constitutes acceptance of changes.
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
