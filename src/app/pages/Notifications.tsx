import { useNavigate } from "react-router";
import { storage } from "../utils/storage";
import { Bell, CheckCircle, Users, MessageCircle } from "lucide-react";

export function Notifications() {
  const navigate = useNavigate();
  const notifications = storage.getNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'helper_joined':
        return <Users className="h-5 w-5 text-[#0d9488]" />;
      case 'request_solved':
        return <CheckCircle className="h-5 w-5 text-[#0d9488]" />;
      case 'request_created':
        return <Bell className="h-5 w-5 text-[#0d9488]" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-[#0d9488]" />;
      default:
        return <Bell className="h-5 w-5 text-[#6b7280]" />;
    }
  };

  const handleNotificationClick = (notification: any) => {
    storage.markNotificationRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const markAllRead = () => {
    notifications.forEach(n => storage.markNotificationRead(n.id));
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Notifications</h1>
            <p className="mt-1 text-[#6b7280]">
              Stay updated with your requests and helps
            </p>
          </div>
          {notifications.some(n => !n.read) && (
            <button
              onClick={markAllRead}
              className="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#6b7280] hover:bg-[#f9fafb]"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="rounded-md border border-[#e5e7eb] bg-white p-12 text-center">
            <Bell className="mx-auto mb-4 h-12 w-12 text-[#e5e7eb]" />
            <p className="text-[#6b7280]">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`cursor-pointer rounded-md border border-[#e5e7eb] p-4 transition-all ${
                  notification.read
                    ? 'bg-white hover:bg-[#f9fafb]'
                    : 'bg-[#f0fdfa] hover:bg-[#ccfbf1]'
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${notification.read ? 'text-[#6b7280]' : 'font-medium text-[#111827]'}`}>
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-[#6b7280]">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-[#0d9488]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
