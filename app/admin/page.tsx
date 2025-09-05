import { Primary, Secondary } from "@/app/components/Buttons";
import Header from "@/app/components/Header-Nav/Header";
import QuickActions from "./QuickActions";
import QuickStats from "./QuickStats";

export default function AdminPage() {
  return (
    <main className="bg-gradient-to-r from-white to-primary min-h-screen">
      <h1 className="text-2xl font-source pt-4 px-2 text-black text-center">
        Content Management System
      </h1>
      <div className="flex flex-col items-center justify-center p-1">
        <QuickActions />
        <QuickStats />
      </div>
    </main>
  );
}
