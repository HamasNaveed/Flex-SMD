import { View, Text, StyleSheet } from 'react-native';

// Small colored status pill, reused for Active/Expired assignments and
// Full/Open courses so the color-coding stays consistent everywhere.
const COLORS = {
  green: { bg: '#e3f7e9', text: '#1c8a45' },
  red: { bg: '#fce8e8', text: '#c62828' },
  gray: { bg: '#eceef2', text: '#5a6072' },
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
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
