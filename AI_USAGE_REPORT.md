# AI Usage Report

**Assignment:** Software for Mobile Devices — Assignment 1 (Flex)
**AI tool used:** Claude Code (Anthropic)

## How AI was used

- **Ideation:** Discussed how to map the assignment's example problem areas
  (attendance, course registration, assignments) onto a single small app with a
  Student/Teacher mode toggle, based on my own outline of required features.
- **Code generation:** Claude Code scaffolded the Expo project, wrote `src/data.js`
  (hardcoded courses/assignments/attendance), the reusable components
  (`Button`, `Badge`, `CourseCard`, `AssignmentCard`), the five screens, and wired
  them together in `App.js` with shared state passed down as props.
- **Constraint checking:** Claude Code cross-referenced the assignment PDF to keep
  the implementation inside its rules — e.g. no navigation library/side/bottom bars
  (screens are switched with plain buttons + `useState`), and the dashboard uses
  `react-native-chart-kit` with two chart types (bar + pie) as required.
- **Debugging:** The Metro bundler was started locally and the JS bundle was
  fetched directly to confirm the app compiles with no syntax/import errors before
  each commit.

## What I reviewed and adapted

- Read through every generated file and confirmed each requirement (A–J in the
  assignment) is met by a specific, identifiable piece of code (e.g. the Active/Expired
  badge is a date comparison in `AssignmentCard.js`; the Add Assignment form's
  validation is in `TeacherScreen.js`).
- Ran the app in Expo Go/simulator and clicked through both modes, all four student
  screens, course registration until a course showed Full, and the assignment form
  with both invalid and valid input.
- I can explain, in the viva, why state lives in `App.js` and is passed down as props
  (single source of truth so Teacher's new assignment shows up in Student's list
  immediately), why screens are switched with state instead of a navigation library
  (explicitly disallowed by the assignment), and how the attendance percentages and
  chart data are derived from the raw `attendance` array rather than hardcoded.

## What AI did not decide

- The choice of features (courses, assignments with deadlines, attendance dashboard,
  registration, one teacher action) and the decision to keep the app deliberately
  small rather than add extra screens, per the assignment's own grading principle
  that a smaller, well-designed app can score higher than a larger one.
