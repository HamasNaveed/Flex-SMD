import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { colors } from '../theme';

const PASS_THRESHOLD = 80;

// Per-course attendance breakdown opened by tapping a course card.
// Bars are red when attendance drops below the 80% threshold, green otherwise.
export default function CourseAttendanceScreen({ course, record, onBack }) {
  if (!course || !record) {
    return (
      <View style={styles.container}>
        <Button title="< Back" onPress={onBack} />
        <Text style={styles.empty}>No attendance data for this course.</Text>
      </View>
    );
  }

  const percent = Math.round((record.present / record.total) * 100);
  const absent = record.total - record.present;
  const barColor = percent < PASS_THRESHOLD ? colors.danger : colors.success;

  return (
    <View style={styles.container}>
      <Button title="< Back" onPress={onBack} />
      <Text style={styles.heading}>{course.code} Attendance</Text>
      <Text style={styles.percent}>{percent}% present</Text>

      <View style={styles.barRow}>
        <Text style={styles.barLabel}>Present ({record.present})</Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${percent}%`, backgroundColor: barColor }]} />
        </View>
      </View>

      <View style={styles.barRow}>
        <Text style={styles.barLabel}>Absent ({absent})</Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${100 - percent}%`, backgroundColor: colors.danger }]} />
        </View>
      </View>

      {percent < PASS_THRESHOLD && (
        <Text style={styles.warning}>Below 80% attendance.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
  },
  percent: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  barRow: {
    marginBottom: 16,
  },
  barLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  barTrack: {
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.neutral,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 10,
  },
  warning: {
    color: colors.danger,
    fontWeight: '700',
    marginTop: 8,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});
