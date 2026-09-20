import { View, Text, StyleSheet } from 'react-native';
import Badge from './Badge';
import { colors } from '../theme';

// Reusable card for an assignment. Active/Expired is computed from the
// deadline at render time so it always reflects the current date.
export default function AssignmentCard({ assignment, courseLabel }) {
  const isExpired = new Date(assignment.deadline) < new Date();

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.course}>{courseLabel}</Text>
        {isExpired ? (
          <Badge label="Expired" color="red" />
        ) : (
          <Badge label="Active" color="green" />
        )}
      </View>
      <Text style={styles.title}>{assignment.title}</Text>
      <Text style={styles.deadline}>Deadline: {assignment.deadline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  course: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  deadline: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
