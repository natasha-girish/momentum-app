import { ScrollView, StyleSheet, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Layout } from '@/constants/sizes';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: 'normal' | 'large' | 'none';
}

export function ScreenWrapper({
  children,
  scrollable = true,
  padding = 'normal',
  style,
  ...props
}: ScreenWrapperProps) {
  const backgroundColor = useThemeColor({}, 'background');

  const paddingMap = {
    normal: Layout.screenPadding,
    large: Layout.screenPaddingLarge,
    none: 0,
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor,
    },
    scrollView: {
      flexGrow: 1,
    },
    content: {
      padding: paddingMap[padding],
      paddingBottom: 32, // Extra padding at bottom for comfortable scrolling
    },
  });

  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView style={[styles.content, style]} {...props}>
            {children}
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, styles.content, style]} {...props}>
      {children}
    </SafeAreaView>
  );
}
