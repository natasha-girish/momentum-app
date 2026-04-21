import { View, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/theme/themed-text';
import { Button } from '@/components/ui/button';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAuth } from '@/lib/context/auth-context';
import { Spacing } from '@/constants/sizes';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const tint = useThemeColor({}, 'tint');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const icon = useThemeColor({}, 'icon');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
      router.replace('/(app)');
    } catch (err) {
      Alert.alert('Login Failed', err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
      justifyContent: 'center',
      paddingHorizontal: Spacing.md,
    },
    header: {
      marginBottom: Spacing.xl,
      alignItems: 'center',
      gap: Spacing.md,
    },
    title: {
      fontSize: 36,
      fontWeight: '600',
      fontFamily: 'Lora',
      color: text,
      letterSpacing: -0.02,
      lineHeight: 42,
    },
    subtitle: {
      fontSize: 14,
      color: icon,
    },
    form: {
      gap: Spacing.lg,
      marginBottom: Spacing.xl,
    },
    inputContainer: {
      gap: Spacing.xs,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: text,
      textTransform: 'uppercase',
    },
    input: {
      borderWidth: 2,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      fontSize: 16,
      color: text,
      backgroundColor: '#FFFFFF',
    },
    buttons: {
      gap: Spacing.md,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <ThemedText style={styles.title}>Momentum</ThemedText>
        <ThemedText style={styles.subtitle}>Your Daily Fitness Intelligence</ThemedText>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Username</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor={icon}
            value={username}
            onChangeText={setUsername}
            editable={!loading}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Password</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor={icon}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.buttons}>
        <Button label={loading ? 'Signing in...' : 'Sign In'} onPress={handleLogin} fullWidth disabled={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}
