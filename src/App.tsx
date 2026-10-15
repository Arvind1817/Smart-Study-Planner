/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, Assignment, TimetableClass, NotificationItem } from './types';
import {
  initialAssignments,
  initialCompletedAssignments,
  timetableSchedule,
  initialNotifications,
} from './mockData';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './screens/HomeScreen';
import { TasksScreen } from './screens/TasksScreen';
import { TimetableScreen } from './screens/TimetableScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { NotificationsModal } from './components/NotificationsModal';
import { PomodoroModal } from './components/PomodoroModal';
import { StudyPlanModal } from './components/StudyPlanModal';
import { NewAssignmentModal } from './components/NewAssignmentModal';
import { AddClassModal } from './components/AddClassModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [completedAssignments, setCompletedAssignments] = useState<Assignment[]>(initialCompletedAssignments);
  const [schedule, setSchedule] = useState<Record<string, TimetableClass[]>>(timetableSchedule);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Modals state
  const [isStudyPlanOpen, setIsStudyPlanOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [addClassDay, setAddClassDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'>('Wed');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [exportModalState, setExportModalState] = useState<{ isOpen: boolean; type: 'export' | 'sync' }>({
    isOpen: false,
    type: 'export',
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle assignment completion
  const handleToggleComplete = (id: string) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === id) {
          const nextState = !asg.completed;
          if (nextState) {
            showToast(`Completed "${asg.title}"! 🎉`);
          }
          return {
            ...asg,
            completed: nextState,
            dueCategory: nextState ? 'completed' : asg.isUrgent ? 'overdue' : 'dueSoon',
          };
        }
        return asg;
      })
    );
  };

  // Toggle subtask within assignment
  const handleToggleSubtask = (assignmentId: string, subtaskId: string) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === assignmentId) {
          const updatedSubtasks = asg.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, done: !st.done } : st
          );
          const allDone = updatedSubtasks.every((st) => st.done);
          return {
            ...asg,
            subtasks: updatedSubtasks,
            completed: allDone ? true : asg.completed,
          };
        }
        return asg;
      })
    );
  };

  // Toggle reminder
  const handleToggleReminder = (id: string) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === id) {
          const newState = !asg.isReminderActive;
          showToast(newState ? 'Reminder turned on 🔔' : 'Reminder muted 🔕');
          return { ...asg, isReminderActive: newState };
        }
        return asg;
      })
    );
  };

  // Add new assignment
  const handleAddAssignment = (newAsg: Assignment) => {
    setAssignments((prev) => [newAsg, ...prev]);
    showToast(`Added "${newAsg.title}" to assignments!`);
  };

  // Add new class to schedule
  const handleAddClass = (newClass: TimetableClass) => {
    setSchedule((prev) => {
      const dayList = prev[newClass.day] || [];
      return {
        ...prev,
        [newClass.day]: [...dayList, newClass],
      };
    });
    showToast(`Added "${newClass.title}" to ${newClass.day} schedule!`);
  };

  const handleOpenAddClass = (day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat') => {
    setAddClassDay(day);
    setIsAddClassOpen(true);
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleClearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadNotifsCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-[#eaedfa] flex justify-center selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Mobile Shell Wrapper Frame */}
      <div className="w-full max-w-md bg-surface min-h-screen flex flex-col relative shadow-2xl border-x border-outline-variant/30">
        {/* Active Screen Rendering */}
        {currentTab === 'home' && (
          <HomeScreen
            onNavigateTab={setCurrentTab}
            onOpenStudyPlan={() => setIsStudyPlanOpen(true)}
            onOpenPomodoro={() => setIsPomodoroOpen(true)}
            onOpenAddTask={() => setIsAddTaskOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            unreadNotifsCount={unreadNotifsCount}
          />
        )}

        {currentTab === 'timetable' && (
          <TimetableScreen
            schedule={schedule}
            onOpenAddClass={handleOpenAddClass}
            onOpenSync={() => setExportModalState({ isOpen: true, type: 'sync' })}
            onOpenPomodoro={() => setIsPomodoroOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            unreadNotifsCount={unreadNotifsCount}
          />
        )}

        {currentTab === 'tasks' && (
          <TasksScreen
            assignments={assignments}
            completedAssignments={completedAssignments}
            onToggleComplete={handleToggleComplete}
            onToggleSubtask={handleToggleSubtask}
            onToggleReminder={handleToggleReminder}
            onOpenNewAssignment={() => setIsAddTaskOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            unreadNotifsCount={unreadNotifsCount}
          />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsScreen
            onOpenExport={() => setExportModalState({ isOpen: true, type: 'export' })}
            onOpenStudyPlan={() => setIsStudyPlanOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            unreadNotifsCount={unreadNotifsCount}
          />
        )}

        {/* Floating Bottom Navigation Bar */}
        <BottomNavBar currentTab={currentTab} onSelectTab={setCurrentTab} />

        {/* Interactive Modals */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsAsRead}
          onClearNotification={handleClearNotification}
        />

        <PomodoroModal
          isOpen={isPomodoroOpen}
          onClose={() => setIsPomodoroOpen(false)}
          onSessionComplete={() => {
            showToast('Pomodoro session completed! Great job! 🍅');
          }}
        />

        <StudyPlanModal
          isOpen={isStudyPlanOpen}
          onClose={() => setIsStudyPlanOpen(false)}
        />

        <NewAssignmentModal
          isOpen={isAddTaskOpen}
          onClose={() => setIsAddTaskOpen(false)}
          onAddAssignment={handleAddAssignment}
        />

        <AddClassModal
          isOpen={isAddClassOpen}
          onClose={() => setIsAddClassOpen(false)}
          onAddClass={handleAddClass}
          selectedDay={addClassDay}
        />

        <ExportModal
          isOpen={exportModalState.isOpen}
          onClose={() => setExportModalState({ ...exportModalState, isOpen: false })}
          type={exportModalState.type}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
