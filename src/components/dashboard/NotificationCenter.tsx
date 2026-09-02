import React from 'react';

interface NotificationCenterProps {
  notifications: any[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications }) => {
  return (
    <div className="notification-center">
      {notifications && notifications.length > 0 ? (
        <div className="notification-list">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <span className="notification-message">{notification.message}</span>
              <span className="notification-time">
                {new Date(notification.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-notifications">No notifications to display</p>
      )}
    </div>
  );
};

export default NotificationCenter;
