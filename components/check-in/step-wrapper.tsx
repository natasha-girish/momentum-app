import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/theme/themed-text';
import { Spacing } from '@/constants/sizes';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CheckInStepWrapperProps {
  step: number;
  totalSteps: number;
  stepLabel: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  beforeCard?: React.ReactNode;
  onContinue: () => void;
  onSkip?: () => void;
  continueLabel?: string;
  showSkip?: boolean;
}

export function CheckInStepWrapper({
  step,
  totalSteps,
  stepLabel,
  title,
  subtitle,
  children,
  beforeCard,
  onContinue,
  onSkip,
  continueLabel = 'Continue',
  showSkip = false,
}: CheckInStepWrapperProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: Spacing.lg,
      paddingTop: 80,
      paddingBottom: Spacing.lg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.md,
    },
    progressContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: Spacing.md,
      alignItems: 'center',
    },
    progressBars: {
      flex: 1,
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    progressBar: {
      flex: 1,
      height: 4,
      backgroundColor: colors.icon,
      borderRadius: 2,
    },
    progressBarFilled: {
      height: 4,
      backgroundColor: colors.tint,
      borderRadius: 2,
    },
    closeButton: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -Spacing.md,
    },
    stepCounter: {
      minWidth: 32,
      textAlign: 'right',
      fontSize: 12,
      color: colors.icon,
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.lg,
      justifyContent: 'space-between',
    },
    topSection: {
      gap: Spacing.lg,
      flex: 1,
    },
    stepLabel: {
      fontSize: 12,
      color: colors.icon,
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 32,
      fontFamily: 'Lora',
      fontWeight: '400',
      color: colors.text,
      lineHeight: 40,
    },
    subtitle: {
      fontSize: 14,
      color: colors.icon,
      lineHeight: 20,
    },
    inputCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      padding: Spacing.xl,
      marginTop: Spacing.lg,
      marginBottom: Spacing.md,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    skipButton: {
      marginTop: Spacing.xl,
      marginBottom: Spacing.lg,
      alignItems: 'center',
    },
    skipText: {
      fontSize: 16,
      color: colors.tint,
      fontWeight: '500',
    },
    footer: {
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.lg,
      gap: Spacing.md,
    },
    continueButton: {
      backgroundColor: colors.tint,
      paddingVertical: Spacing.lg,
      borderRadius: 99,
      alignItems: 'center',
      justifyContent: 'center',
    },
    continueText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    continueArrow: {
      marginLeft: Spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <Pressable
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <ThemedText style={{ fontSize: 28 }}>‹</ThemedText>
          </Pressable>
          <View style={styles.progressBars}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressBar,
                  i < step && styles.progressBarFilled,
                ]}
              />
            ))}
          </View>
        </View>
        <ThemedText style={styles.stepCounter}>{step}/{totalSteps}</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.topSection}>
          <View>
            <ThemedText style={styles.stepLabel}>{stepLabel}</ThemedText>
            <ThemedText style={styles.title}>{title}</ThemedText>
            {subtitle && <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>}
          </View>

          {beforeCard}

          <View style={styles.inputCard}>
            {children}
          </View>

          {showSkip && onSkip && (
            <Pressable
              style={styles.skipButton}
              onPress={onSkip}
            >
              <ThemedText style={styles.skipText}>Skip</ThemedText>
            </Pressable>
          )}
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.continueButton}
            onPress={onContinue}
          >
            <ThemedText style={styles.continueText}>
              {continueLabel} →
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
