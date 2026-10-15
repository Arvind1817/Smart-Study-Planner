import React from 'react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearNotification: (id: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-xs p-4 pt-16 animate-fadeIn">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-outline-variant/20 flex items-center justify-between bg-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
            <h2 className="font-headline-sm text-sm font-bold text-on-surface">Notifications & Alerts</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2 bg-surface-container-low flex items-center justify-between text-xs">
          <span className="text-on-surface-variant">
            {notifications.filter((n) => n.unread).length} unread alerts
          </span>
          <button
            onClick={onMarkAllAsRead}
            className="text-primary font-semibold hover:underline"
          >
            Mark all as read
          </button>
        </div>

        {/* Notification items */}
        <div className="overflow-y-auto divide-y divide-outline-variant/15 p-2 flex-1">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant text-xs">
              No new notifications. You're all caught up!
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-xl transition-colors flex items-start gap-2.5 ${
                  notif.unread ? 'bg-primary-fixed/20' : 'hover:bg-surface-container-low'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base ${
                    notif.type === 'class'
                      ? 'bg-primary-fixed text-primary'
                      : notif.type === 'deadline'
                      ? 'bg-secondary-fixed text-secondary'
                      : notif.type === 'alert'
                      ? 'bg-error-container text-error'
                      : 'bg-tertiary-fixed text-tertiary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {notif.type === 'class'
                      ? 'event'
                      : notif.type === 'deadline'
                      ? 'alarm'
                      : notif.type === 'alert'
                      ? 'quiz'
                      : 'emoji_events'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-on-surface leading-tight">
                    {notif.title}
                  </p>
                  <span className="text-[10px] text-on-surface-variant mt-0.5 block">
                    {notif.time}
                  </span>
                </div>
                <button
                  onClick={() => onClearNotification(notif.id)}
                  title="Dismiss"
                  className="text-outline hover:text-secondary p-1"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
