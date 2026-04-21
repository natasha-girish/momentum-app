import { Pressable, StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '../theme/themed-text';
import { Spacing, BorderRadius } from '@/constants/sizes';

interface CheckInButtonProps {
  onPress: () => void;
  hasCheckedIn: boolean;
}

export function CheckInButton({ onPress, hasCheckedIn }: CheckInButtonProps) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#3E5C6E',
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.xl,
      borderRadius: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <MaterialIcons
        name={hasCheckedIn ? 'edit' : 'add-circle-outline'}
        size={20}
        color="#FFFFFF"
      />
      <ThemedText style={styles.text}>
        {hasCheckedIn ? 'Edit today\'s check-in' : 'Start your daily check-in'}
      </ThemedText>
    </Pressable>
  );
}
