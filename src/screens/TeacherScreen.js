import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Button from '../components/Button';
import AssignmentCard from '../components/AssignmentCard';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function validate({ courseId, title, deadline }) {
  const errors = {};

  if (!courseId) {
    errors.courseId = 'Select a course.';
  }
  if (!title.trim()) {
    errors.title = 'Title is required.';
  }
  if (!deadline.trim()) {
    errors.deadline = 'Deadline is required.';
  } else if (!DATE_PATTERN.test(deadline)) {
    errors.deadline = 'Use the format YYYY-MM-DD.';
  } else if (Number.isNaN(new Date(deadline).getTime())) {
    errors.deadline = 'That date does not exist.';
  }

  return errors;
}

// Teacher's only action for this assignment: add a new assignment. This is
// the app's one real form, with required-field and date-format validation.
export default function TeacherScreen({ courses, assignments, onAddAssignment }) {
  const [courseId, setCourseId] = useState(null);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState('');

  const courseLabel = (id) => {
    const course = courses.find((c) => c.id === id);
    return course ? course.code : 'Unknown';
  };

  const handleSubmit = () => {
    const fieldErrors = validate({ courseId, title, deadline });
    setErrors(fieldErrors);
    setConfirmation('');

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    onAddAssignment({ id: Date.now(), courseId, title: title.trim(), deadline });
    setTitle('');
    setDeadline('');
    setCourseId(null);
    setConfirmation('Assignment added.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Assignment</Text>

      <Text style={styles.label}>Course</Text>
      <View style={styles.row}>
        {courses.map((course) => (
          <Button
            key={course.id}
            title={course.code}
            active={courseId === course.id}
            onPress={() => setCourseId(course.id)}
          />
        ))}
      </View>
      {errors.courseId && <Text style={styles.error}>{errors.courseId}</Text>}

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Chapter 4 Quiz"
        value={title}
        onChangeText={setTitle}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <Text style={styles.label}>Deadline</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={deadline}
        onChangeText={setDeadline}
      />
      {errors.deadline && <Text style={styles.error}>{errors.deadline}</Text>}

      {confirmation !== '' && <Text style={styles.confirmation}>{confirmation}</Text>}

      <Button title="Add Assignment" onPress={handleSubmit} active />

      <Text style={[styles.heading, styles.listHeading]}>Assignments You've Added</Text>
      <FlatList
        data={assignments}
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
  listHeading: {
    marginTop: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7180',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#dfe3ea',
  },
  error: {
    color: '#c62828',
    fontSize: 12,
    marginBottom: 10,
  },
  confirmation: {
    color: '#1c8a45',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  empty: {
    color: '#6b7180',
    textAlign: 'center',
    marginTop: 20,
  },
});
