// Hardcoded application data. In a real app this would come from a server,
// but for this assignment it lives in memory as plain arrays/objects.

export const courses = [
  {
    id: 'ai4009',
    code: 'AI4009',
    name: 'Generative AI',
    section: 'BSE-7B',
    totalSeats: 40,
    availableSeats: 12,
  },
  {
    id: 'cs3002',
    code: 'CS3002',
    name: 'Information Security',
    section: 'BSE-7A',
    totalSeats: 45,
    availableSeats: 0,
  },
  {
    id: 'cs3006',
    code: 'CS3006',
    name: 'Parallel and Distributed Computing',
    section: 'BSE-7A',
    totalSeats: 40,
    availableSeats: 5,
  },
  {
    id: 'cs4039',
    code: 'CS4039',
    name: 'Software for Mobile Devices',
    section: 'BSE-7A',
    totalSeats: 50,
    availableSeats: 20,
  },
  {
    id: 'se4091',
    code: 'SE4091',
    name: 'Final Year Project - I',
    section: 'BSE-7A',
    totalSeats: 35,
    availableSeats: 8,
  },
];

export const initialAssignments = [
  {
    id: 1,
    courseId: 'ai4009',
    title: 'Prompt Engineering Report',
    deadline: '2026-09-28',
  },
  {
    id: 2,
    courseId: 'cs3002',
    title: 'Network Security Audit',
    deadline: '2026-09-10',
  },
  {
    id: 3,
    courseId: 'cs3006',
    title: 'MPI Cluster Assignment',
    deadline: '2026-09-30',
  },
  {
    id: 4,
    courseId: 'cs4039',
    title: 'React Native UI Lab',
    deadline: '2026-09-15',
  },
  {
    id: 5,
    courseId: 'se4091',
    title: 'FYP Proposal Draft',
    deadline: '2026-10-05',
  },
];

export const attendance = [
  { courseId: 'ai4009', present: 18, total: 20 },
  { courseId: 'cs3002', present: 12, total: 20 },
  { courseId: 'cs3006', present: 16, total: 18 },
  { courseId: 'cs4039', present: 19, total: 20 },
  { courseId: 'se4091', present: 9, total: 15 },
];
