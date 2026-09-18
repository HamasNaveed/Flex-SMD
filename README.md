# Flex — Student Portal (SMD Assignment 1)

A small React Native (Expo) app that reimagines the university student portal for the
"Software for Mobile Devices" open-ended assignment.

## The problem

Students juggle course info, assignment deadlines, attendance, and registration across
disconnected screens/portals, and often can't tell at a glance whether an assignment is
still open or a course still has seats. Flex puts all four in one simple, mobile-first
screen with clear visual states (Active/Expired, Full/seats left).

## Modes

The app has a single toggle at the top switching between two modes (plain state +
conditional rendering — no navigation library, no side/bottom bars):

- **Student** — four sections switched with buttons at the top:
  - **My Courses** — the 5 offered subjects with section and seat info.
  - **Assignments** — every assignment, sorted by deadline, with an Active/Expired badge.
  - **Attendance** — a dashboard (`react-native-chart-kit`) with a bar chart of
    per-subject attendance % and a pie chart of overall present vs. absent sessions.
  - **Registration** — register for a course; seats decrease live, and a course shows
    **Full** once `availableSeats` reaches 0.
- **Teacher** — one form to add a new assignment (course, title, deadline), with
  required-field and date-format validation and inline error messages. New assignments
  immediately show up in the Student → Assignments screen, since both modes read from
  the same shared state in `App.js`.

## Data

All data is hardcoded in `src/data.js` as plain arrays/objects (`courses`,
`initialAssignments`, `attendance`) — no backend, no database, per the assignment
scope. Registrations and newly added assignments are kept in React state in `App.js`
and passed down as props.

## Project structure

```
App.js                     top-level state (mode, courses, assignments, registrations)
src/
  data.js                  hardcoded course/assignment/attendance data
  components/
    Button.js              reusable pill button (mode toggle, screen switch, form submit)
    Badge.js                colored status pill (Active/Expired/Full/seats-left)
    CourseCard.js           course info card, optionally with a Register button
    AssignmentCard.js       assignment info card with computed Active/Expired badge
  screens/
    StudentCoursesScreen.js
    StudentAssignmentsScreen.js
    AttendanceDashboardScreen.js
    CourseRegistrationScreen.js
    TeacherScreen.js
```

## Run it

```
npm install
npx expo start
```

Then open the app in Expo Go (scan the QR code) or a simulator. To import into Expo
Snack, upload/paste `App.js` and the contents of `src/` into a new Snack, and add
`react-native-chart-kit` and `react-native-svg` as dependencies in the Snack's
`package.json` panel.
