import { View, Text, FlatList, StyleSheet } from 'react-native';
import CourseCard from '../components/CourseCard';

// Lets a student register for a course. Registering decrements the shared
// availableSeats count so the Full/seats-left state updates everywhere the
// course is shown (this screen and My Courses).
export default function CourseRegistrationScreen({ courses, registeredCourseIds, onRegister }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Course Registration</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            isRegistered={registeredCourseIds.includes(item.id)}
            onRegister={() => onRegister(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No courses available.</Text>}
      />
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
    color: '#1c2333',
    marginBottom: 12,
  },
  empty: {
    color: '#6b7180',
    textAlign: 'center',
    marginTop: 20,
  },
});
