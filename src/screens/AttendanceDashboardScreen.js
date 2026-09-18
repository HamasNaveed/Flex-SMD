import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(43, 87, 217, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(51, 57, 74, ${opacity})`,
  barPercentage: 0.6,
};

// Dashboard required by the assignment: two different chart types built
// from the same attendance data, not two views of hardcoded numbers.
export default function AttendanceDashboardScreen({ attendance, courses }) {
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
      color: '#2b57d9',
      legendFontColor: '#33394a',
      legendFontSize: 13,
    },
    {
      name: 'Absent',
      population: totalAbsent,
      color: '#d92b2b',
      legendFontColor: '#33394a',
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
    color: '#1c2333',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#33394a',
    marginBottom: 8,
    marginTop: 8,
  },
  chart: {
    borderRadius: 12,
    marginBottom: 16,
  },
});
