import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Small colored status pill, reused for Active/Expired assignments and
// Full/Open courses so the color-coding stays consistent everywhere.
const COLORS = {
  green: { bg: colors.successBg, text: colors.success },
  red: { bg: colors.dangerBg, text: colors.danger },
  gray: { bg: colors.neutral, text: colors.textSecondary },
};

export default function Badge({ label, color = 'gray' }) {
  const palette = COLORS[color] || COLORS.gray;
  return (
    <View style={[styles.badge, { backgroundColor: palette.bg }]}>
      <Text style={[styles.text, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
