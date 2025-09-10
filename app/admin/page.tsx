import QuickActions from "./QuickActions";
import QuickStats from "./QuickStats";

export default function AdminPage() {
  return (
    <main className="bg-gradient-to-r from-white to-primary min-h-screen">
      <h1 className="page-header">
        Dashboard
      </h1>
        <div className="flex flex-col lg:flex-row lg:items-start items-center justify-center p-1 lg:hidden">
          <QuickActions />
          <QuickStats />
        </div>
        <div className="flex-col lg:flex-row lg:items-start items-center justify-center p-1 hidden lg:flex">
          <QuickStats />
          <QuickActions />
        </div>
    </main>
  );
}
