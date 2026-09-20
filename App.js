import { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Button from './src/components/Button';
import Logo from './src/components/Logo';
import { colors } from './src/theme';
import StudentCoursesScreen from './src/screens/StudentCoursesScreen';
import StudentAssignmentsScreen from './src/screens/StudentAssignmentsScreen';
import AttendanceDashboardScreen from './src/screens/AttendanceDashboardScreen';
import CourseRegistrationScreen from './src/screens/CourseRegistrationScreen';
import TeacherScreen from './src/screens/TeacherScreen';

import { courses as initialCourses, initialAssignments, attendance } from './src/data';

const STUDENT_SCREENS = [
  { key: 'courses', label: 'My Courses' },
  { key: 'assignments', label: 'Assignments' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'registration', label: 'Registration' },
];

export default function App() {
  const [mode, setMode] = useState('student');
  const [studentScreen, setStudentScreen] = useState('courses');

  const [courses, setCourses] = useState(initialCourses);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [registeredCourseIds, setRegisteredCourseIds] = useState([]);

  const handleRegister = (courseId) => {
    if (registeredCourseIds.includes(courseId)) {
      return;
    }
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId && course.availableSeats > 0
          ? { ...course, availableSeats: course.availableSeats - 1 }
          : course
      )
    );
    setRegisteredCourseIds((prev) => [...prev, courseId]);
  };

  const handleAddAssignment = (assignment) => {
    setAssignments((prev) => [...prev, assignment]);
  };

  const handleAddCourse = (course) => {
    setCourses((prev) => [...prev, course]);
  };

  const handleRemoveCourse = (courseId) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
    setAssignments((prev) => prev.filter((assignment) => assignment.courseId !== courseId));
    setRegisteredCourseIds((prev) => prev.filter((id) => id !== courseId));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Logo size={28} />
          <Text style={styles.title}>Flex</Text>
        </View>
        <View style={styles.row}>
          <Button title="Student" active={mode === 'student'} onPress={() => setMode('student')} />
          <Button title="Teacher" active={mode === 'teacher'} onPress={() => setMode('teacher')} />
        </View>
      </View>

      <View style={styles.content}>
        {mode === 'student' ? (
          <>
            <View style={styles.row}>
              {STUDENT_SCREENS.map((screen) => (
                <Button
                  key={screen.key}
                  title={screen.label}
                  active={studentScreen === screen.key}
                  onPress={() => setStudentScreen(screen.key)}
                />
              ))}
            </View>

            {studentScreen === 'courses' && <StudentCoursesScreen courses={courses} />}
            {studentScreen === 'assignments' && (
              <StudentAssignmentsScreen assignments={assignments} courses={courses} />
            )}
            {studentScreen === 'attendance' && (
              <AttendanceDashboardScreen attendance={attendance} courses={courses} />
            )}
            {studentScreen === 'registration' && (
              <CourseRegistrationScreen
                courses={courses}
                registeredCourseIds={registeredCourseIds}
                onRegister={handleRegister}
              />
            )}
          </>
        ) : (
          <TeacherScreen
            courses={courses}
            assignments={assignments}
            onAddAssignment={handleAddAssignment}
            onAddCourse={handleAddCourse}
            onRemoveCourse={handleRemoveCourse}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
