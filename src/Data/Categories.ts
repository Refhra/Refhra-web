export type Category = {
  id: string;
  title: string;
  description: string;
  sampleTasks: string[];
};

const categories: Category[] = [
  {
    id: "academic",
    title: "Academic / School",
    description:
      "For students who want to stay on top of lectures, assignments, and exams without cramming. Perfect for anyone who prioritizes academic performance. ",
    sampleTasks: [
      "Attend Lecture (Course-specific)",
      "Revise Lecture Notes",
      "Group Study Session",
      "Assignment / Project Submission",
      "Midterm / Exam Revision Plan",
      "Past Questions Practice",
      "Lab / Practical Session",
    ],
  },
  {
    id: "skill",
    title: "Skill Development / Career",
    description:
      "For students looking to build tech or professional skills alongside school. Best for those preparing for internships, challenges, or side projects.",
    sampleTasks: [
      "Online Course Session",
      "Coding / Technical Practice",
      "Build/Update Portfolio (GitHub, Behance, LinkedIn)",
      "Internship / Job Application Task",
      "Side Project Development",
      "Resume / Cover Letter Update",
    ],
  },
  {
    id: "work",
    title: "Work & Productivity",
    description:
      "For working students juggling part-time jobs, internships, or freelance gigs. Balances deliverables with schoolwork so deadlines don’t clash. ",
    sampleTasks: [
      "Client Meeting / Work Call",
      "Deliverable / Work Deadline",
      "Freelance Task (design, writing, dev work)",
      "Internship Task Submission",
      "Weekly Work Review",
    ],
  },
  {
    id: "extracurricular",
    title: "Extracurricular & Campus Life",
    description:
      "For socially active students balancing clubs, associations, and leadership roles. Keeps meetings and events structured while leaving room for academics. ",
    sampleTasks: [
      "Club/Association Meeting",
      "Campus Event / Seminar",
      "Volunteering / Community Service",
      "Group Project / Hackathon Prep",
      "Leadership / Committee Duty",
    ],
  },
  {
    id: "wellness",
    title: "Wellness & Mental Health",
    description:
      "For students who want balance and calm. Prioritizes rest, self-care, and steady progress. Great for avoiding burnout during heavy semesters.",
    sampleTasks: [
      "Morning Devotion / Meditation / Prayer",
      "Workout / Sports Session",
      "Nap / Rest Block",
      "Journaling / Daily Reflection",
      "Therapy / Check-in",
      "Social Hangout / Leisure Time",
    ],
  },
  {
    id: "personal",
    title: "Personal Life & Errands",
    description:
      "For students managing independent living, errands, and family obligations. Helps organize chores without letting them consume study time. ",
    sampleTasks: [
      "Cooking / Meal Prep",
      "Shopping / Market Run",
      "Laundry / Cleaning",
      "Financial Task (budget, allowance tracking)",
      "Family / Friends Check-in",
      "Travel / Transport Block",
    ],
  },
  {
    id: "time",
    title: "Time Management Templates",
    description:
      "For students who want structure in how they work and study. Best for those who like routines, countdowns, or 'deep work' systems. ",
    sampleTasks: [
      "Pomodoro Session (50 min work + 10 min break)",
      "Deep Work Block (90–120 min focus time)",
      "Exam Countdown",
      "Task Dependency Flow",
      "10-Minute Buffer Slot",
    ],
  },
  {
    id: "reflection",
    title: "Planning & Reflection",
    description:
      "For reflective students who want to track growth and check progress weekly. Keeps goals visible and prevents stress through perspective.",
    sampleTasks: [
      "Weekly Planning & Review",
      "Daily Reflection",
      "Goal Check-in",
      "Progress Tracking (study hours, skill modules, streaks)",
    ],
  },
];

export default categories;
