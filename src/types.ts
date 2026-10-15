export type TabType = 'home' | 'timetable' | 'tasks' | 'analytics';

export interface Subtask {
  id: string;
  text: string;
  done: boolean;
}

export interface Attachment {
  name: string;
  type: 'pdf' | 'csv' | 'terminal' | 'link';
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  priorityLabel: 'High Priority' | 'Medium' | 'In Progress' | 'Not Started';
  priorityType: 'urgent' | 'medium' | 'progress' | 'not_started';
  dueDateText: string;
  dueCategory: 'dueSoon' | 'overdue' | 'completed';
  gradePercent: number;
  subtasks: Subtask[];
  attachments: Attachment[];
  timeBadge: string;
  footerTimeLabel: string;
  isUrgent?: boolean;
  isReminderActive?: boolean;
  completed: boolean;
}

export interface TimetableClass {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  startTime: string;
  endTime: string;
  periodLabel: string; // e.g. "09:00 - 10:30 AM"
  courseTag?: string;
  type: 'lecture' | 'lab' | 'break' | 'focus';
  title: string;
  instructor?: string;
  location: string;
  alertBadge?: {
    text: string;
    type: 'warning' | 'quiz' | 'focus';
  };
  attachment?: {
    name: string;
    actionText: string;
  };
  noteFooter?: {
    text: string;
    linkText: string;
  };
  pomodoro?: {
    targetSessions: number;
    completedSessions: number;
    studyTime: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  type: 'alert' | 'class' | 'deadline' | 'achievement';
  unread: boolean;
}
