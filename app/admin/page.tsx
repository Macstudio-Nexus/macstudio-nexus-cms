import { Primary, Secondary } from "@/app/components/Buttons";
import Header from "@/app/components/Header-Nav/Header";
import QuickActions from "./QuickActions";
import QuickStats from "./QuickStats";

export default function AdminPage() {
  return (
    <main className="bg-gradient-to-r from-white to-primary min-h-screen">
      <h1 className="text-3xl md:text-5xl font-source font-bold pt-4 px-2 text-black text-center">
        Dashboard
      </h1>
      <div className="flex flex-col items-center justify-center p-1">
        <QuickActions />
        <QuickStats />
      </div>
    </main>
  );
}
