export default function NotificationsPage() {
  return (
    <>
      <div className="w-fit dashboard-card-container">
        <h2 className="dashboard-container-header">Notifications</h2>

        {/* NOTIFICATIONS GO HERE, SEND FROM ADMIN/PROJECTS PAGE*/}
        <div className="flex flex-col items-start justify-start w-full">
          <ul className="list-disc list-inside pl-4">
            <li className="notification-item">item 1</li>
            <li className="notification-item">item 2</li>
            <li className="notification-item">item 3</li>
            <li className="notification-item">item 4</li>
          </ul>
        </div>
      </div>
    </>
  );
}
