import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Badge from './Badge';
import Button from './Button';
import { colors } from '../theme';

const URL_PATTERN = /^https?:\/\/.+\..+/i;

// Reusable card for an assignment. Active/Expired is computed from the
// deadline at render time so it always reflects the current date.
// onSubmitLink (student mode): lets the student submit a link once.
// onEditDeadline (teacher mode): lets the teacher update the due date.
export default function AssignmentCard({ assignment, courseLabel, onSubmitLink, onEditDeadline }) {
  const isExpired = new Date(assignment.deadline) < new Date();

  const [link, setLink] = useState('');
  const [linkError, setLinkError] = useState('');
  const [editingDeadline, setEditingDeadline] = useState(false);
  const [deadlineInput, setDeadlineInput] = useState(assignment.deadline);
  const [deadlineError, setDeadlineError] = useState('');

  const handleSubmitLink = () => {
    if (!URL_PATTERN.test(link.trim())) {
      setLinkError('Enter a valid link (e.g. https://docs.google.com/...).');
      return;
    }
    setLinkError('');
    onSubmitLink(link.trim());
  };

  const handleSaveDeadline = () => {
    if (Number.isNaN(new Date(deadlineInput).getTime()) || !/^\d{4}-\d{2}-\d{2}$/.test(deadlineInput)) {
      setDeadlineError('Use the format YYYY-MM-DD.');
      return;
    }
    setDeadlineError('');
    onEditDeadline(deadlineInput);
    setEditingDeadline(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.course}>{courseLabel}</Text>
        {isExpired ? (
          <Badge label="Expired" color="red" />
        ) : (
          <Badge label="Active" color="green" />
        )}
      </View>
      <Text style={styles.title}>{assignment.title}</Text>

      {onEditDeadline && editingDeadline ? (
        <View style={styles.editRow}>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={deadlineInput}
            onChangeText={setDeadlineInput}
          />
          {deadlineError !== '' && <Text style={styles.error}>{deadlineError}</Text>}
          <View style={styles.row}>
            <Button title="Save" onPress={handleSaveDeadline} active />
            <Button title="Cancel" onPress={() => { setEditingDeadline(false); setDeadlineInput(assignment.deadline); }} />
          </View>
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.deadline}>Deadline: {assignment.deadline}</Text>
          {onEditDeadline && <Button title="Edit Deadline" onPress={() => setEditingDeadline(true)} />}
        </View>
      )}

      {onEditDeadline && (
        <Text style={styles.submission}>
          {assignment.submissionLink
            ? `Submission: ${assignment.submissionLink}`
            : 'No submission yet.'}
        </Text>
      )}

      {onSubmitLink && (
        assignment.submissionLink ? (
          <Text style={styles.submission}>Submitted: {assignment.submissionLink}</Text>
        ) : (
          <View style={styles.editRow}>
            <TextInput
              style={styles.input}
              placeholder="Paste a link (Google Docs, GitHub, etc.)"
              value={link}
              onChangeText={setLink}
              autoCapitalize="none"
            />
            {linkError !== '' && <Text style={styles.error}>{linkError}</Text>}
            <Button title="Submit" onPress={handleSubmitLink} active />
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  course: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  deadline: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  editRow: {
    marginTop: 6,
  },
  input: {
    backgroundColor: colors.neutral,
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
    marginBottom: 6,
  },
  submission: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
  },
});
