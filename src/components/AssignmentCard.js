import { View, Text, StyleSheet } from 'react-native';
import Badge from './Badge';

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
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
    color: '#2b57d9',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c2333',
    marginBottom: 4,
  },
  deadline: {
    fontSize: 13,
    color: '#6b7180',
  },
});
