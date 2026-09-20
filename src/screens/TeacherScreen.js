import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Button from '../components/Button';
import AssignmentCard from '../components/AssignmentCard';
import { colors } from '../theme';

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

function validateCourse({ code, name, section, totalSeats }, courses) {
  const errors = {};

  if (!code.trim()) {
    errors.code = 'Course code is required.';
  } else if (courses.some((c) => c.code.toLowerCase() === code.trim().toLowerCase())) {
    errors.code = 'A course with this code already exists.';
  }
  if (!name.trim()) {
    errors.name = 'Course name is required.';
  }
  if (!section.trim()) {
    errors.section = 'Section is required.';
  }
  if (!totalSeats.trim()) {
    errors.totalSeats = 'Total seats is required.';
  } else if (!/^\d+$/.test(totalSeats.trim()) || Number(totalSeats) <= 0) {
    errors.totalSeats = 'Total seats must be a positive number.';
  }

  return errors;
}

// Teacher/admin actions for this assignment: add a new assignment, and
// manage the course catalog (add/remove courses). This is the app's one
// real form, with required-field and date-format validation.
export default function TeacherScreen({ courses, assignments, onAddAssignment, onAddCourse, onRemoveCourse }) {
  const [courseId, setCourseId] = useState(null);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState('');

  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseSection, setCourseSection] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [courseErrors, setCourseErrors] = useState({});
  const [courseConfirmation, setCourseConfirmation] = useState('');

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

  const handleAddCourse = () => {
    const fieldErrors = validateCourse(
      { code: courseCode, name: courseName, section: courseSection, totalSeats },
      courses
    );
    setCourseErrors(fieldErrors);
    setCourseConfirmation('');

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    const seats = Number(totalSeats);
    onAddCourse({
      id: courseCode.trim().toLowerCase(),
      code: courseCode.trim().toUpperCase(),
      name: courseName.trim(),
      section: courseSection.trim(),
      totalSeats: seats,
      availableSeats: seats,
    });
    setCourseCode('');
    setCourseName('');
    setCourseSection('');
    setTotalSeats('');
    setCourseConfirmation('Course added.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Courses</Text>

      <Text style={styles.label}>Course Code</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. CS1234"
        value={courseCode}
        onChangeText={setCourseCode}
      />
      {courseErrors.code && <Text style={styles.error}>{courseErrors.code}</Text>}

      <Text style={styles.label}>Course Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Data Structures"
        value={courseName}
        onChangeText={setCourseName}
      />
      {courseErrors.name && <Text style={styles.error}>{courseErrors.name}</Text>}

      <Text style={styles.label}>Section</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. BSE-7A"
        value={courseSection}
        onChangeText={setCourseSection}
      />
      {courseErrors.section && <Text style={styles.error}>{courseErrors.section}</Text>}

      <Text style={styles.label}>Total Seats</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 40"
        value={totalSeats}
        onChangeText={setTotalSeats}
        keyboardType="numeric"
      />
      {courseErrors.totalSeats && <Text style={styles.error}>{courseErrors.totalSeats}</Text>}

      {courseConfirmation !== '' && <Text style={styles.confirmation}>{courseConfirmation}</Text>}

      <Button title="Add Course" onPress={handleAddCourse} active />

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.courseRow}>
            <Text style={styles.courseRowText}>
              {item.code} - {item.name} ({item.section})
            </Text>
            <Button title="Remove" variant="danger" onPress={() => onRemoveCourse(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No courses yet.</Text>}
      />

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
    color: colors.textPrimary,
    marginBottom: 12,
  },
  listHeading: {
    marginTop: 20,
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  courseRowText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginBottom: 10,
  },
  confirmation: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});
