import { View, Text, FlatList, StyleSheet } from 'react-native';
import CourseCard from '../components/CourseCard';

// Read-only view of all courses the student's program offers this
// semester. Data-driven: the list comes straight from the courses array.
export default function StudentCoursesScreen({ courses }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No courses found.</Text>}
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
