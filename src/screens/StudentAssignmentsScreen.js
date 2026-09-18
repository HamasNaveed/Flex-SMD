import { View, Text, FlatList, StyleSheet } from 'react-native';
import AssignmentCard from '../components/AssignmentCard';

// Lists every assignment with its Active/Expired status. Assignments are
// sorted so the soonest deadlines show first, and an empty state is shown
// if a teacher hasn't added anything yet.
export default function StudentAssignmentsScreen({ assignments, courses }) {
  const sorted = [...assignments].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  const courseLabel = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.code : 'Unknown';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Assignments</Text>
      <FlatList
        data={sorted}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <AssignmentCard assignment={item} courseLabel={courseLabel(item.courseId)} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No assignments yet.</Text>}
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
