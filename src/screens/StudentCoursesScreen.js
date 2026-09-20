import { View, Text, FlatList, StyleSheet } from 'react-native';
import CourseCard from '../components/CourseCard';
import Badge from '../components/Badge';
import { colors } from '../theme';
import { studentGpa } from '../data';

// Read-only view of all courses the student's program offers this
// semester, plus the per-course teacher-change vote. Data-driven: the
// list comes straight from the courses array.
export default function StudentCoursesScreen({ courses, teacherVotes, votedTeacherCourseIds, onVoteTeacher }) {
  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>My Courses</Text>
        <Badge label={`GPA ${studentGpa.toFixed(2)}`} color="gray" />
      </View>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            teacherVotes={teacherVotes[item.id] || 0}
            hasVotedTeacher={votedTeacherCourseIds.includes(item.id)}
            onVoteTeacher={() => onVoteTeacher(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No courses found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});
