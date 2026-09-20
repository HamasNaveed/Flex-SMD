import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Reusable pill button used across the app (mode toggle, screen switcher,
// register action, form submit). Keeping one Button component instead of
// duplicating TouchableOpacity/Text pairs everywhere.
export default function Button({ title, onPress, active, variant = 'default', disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        active && styles.active,
        variant === 'danger' && styles.danger,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, active && styles.textActive, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 9999,
    backgroundColor: colors.neutral,
    marginRight: 8,
    marginBottom: 8,
  },
  active: {
    backgroundColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  text: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  textActive: {
    color: colors.textOnPrimary,
  },
  textDisabled: {
    color: colors.textDisabled,
  },
});
