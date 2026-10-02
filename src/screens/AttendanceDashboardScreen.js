import { View, Text, Pressable, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { colors } from '../theme';

const screenWidth = Dimensions.get('window').width - 32;

const chartConfig = {
  backgroundGradientFrom: colors.card,
  backgroundGradientTo: colors.card,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(59, 82, 232, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
  barPercentage: 0.6,
};

// Dashboard required by the assignment: two different chart types built
// from the same attendance data, not two views of hardcoded numbers.
export default function AttendanceDashboardScreen({ attendance, courses, onSelectCourse }) {
  const percentages = attendance.map((a) => Math.round((a.present / a.total) * 100));
  const labels = attendance.map((a) => {
    const course = courses.find((c) => c.id === a.courseId);
    return course ? course.code : a.courseId;
  });

  const totalPresent = attendance.reduce((sum, a) => sum + a.present, 0);
  const totalSessions = attendance.reduce((sum, a) => sum + a.total, 0);
  const totalAbsent = totalSessions - totalPresent;

  const pieData = [
    {
      name: 'Present',
      population: totalPresent,
      color: colors.primary,
      legendFontColor: colors.textPrimary,
      legendFontSize: 13,
    },
    {
      name: 'Absent',
      population: totalAbsent,
      color: colors.danger,
      legendFontColor: colors.textPrimary,
      legendFontSize: 13,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Attendance Dashboard</Text>

      <Text style={styles.chartTitle}>Attendance by Subject (%)</Text>
      <BarChart
        data={{ labels, datasets: [{ data: percentages }] }}
        width={screenWidth}
        height={220}
        fromZero
        yAxisSuffix="%"
        yAxisLabel=""
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Tap a subject for details</Text>
      <View style={styles.chipRow}>
        {attendance.map((a) => {
          const course = courses.find((c) => c.id === a.courseId);
          const percent = Math.round((a.present / a.total) * 100);
          return (
            <Pressable
              key={a.courseId}
              style={[styles.chip, percent < 80 ? styles.chipDanger : styles.chipSuccess]}
              onPress={() => onSelectCourse(a.courseId)}
            >
              <Text style={styles.chipText}>{course ? course.code : a.courseId}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.chartTitle}>Overall Present vs Absent</Text>
      <PieChart
        data={pieData}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="8"
      />
    </ScrollView>
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
  chartTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 8,
  },
  chart: {
    borderRadius: 12,
    marginBottom: 16,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 9999,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSuccess: {
    backgroundColor: colors.successBg,
  },
  chipDanger: {
    backgroundColor: colors.dangerBg,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
