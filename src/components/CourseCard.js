import { View, Text, StyleSheet } from 'react-native';
import Badge from './Badge';
import Button from './Button';

// Reusable card for a course. Used both in the plain "My Courses" list and
// in the Course Registration screen (where the register button is shown).
export default function CourseCard({ course, onRegister, isRegistered }) {
  const isFull = course.availableSeats <= 0;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.code}>{course.code}</Text>
        {isFull ? (
          <Badge label="Full" color="red" />
        ) : (
          <Badge label={`${course.availableSeats} seats left`} color="green" />
        )}
      </View>
      <Text style={styles.name}>{course.name}</Text>
      <Text style={styles.section}>{course.section}</Text>
      <Text style={styles.seats}>
        {course.totalSeats - course.availableSeats}/{course.totalSeats} seats filled
      </Text>

      {onRegister && (
        isRegistered ? (
          <Badge label="Registered" color="gray" />
        ) : (
          <Button
            title={isFull ? 'Full' : 'Register'}
            onPress={onRegister}
            disabled={isFull}
          />
        )
      )}
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
  code: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2b57d9',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c2333',
  },
  section: {
    fontSize: 13,
    color: '#6b7180',
    marginBottom: 4,
  },
  seats: {
    fontSize: 13,
    color: '#33394a',
    marginBottom: 10,
  },
});
